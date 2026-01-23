import type { CategoryType, ClaimedCategories, DBCategoryType, WishlistClaimedCategories } from "../types/wishlistTypes";
import { CLAIMED_CATEGORIES } from "../constants/localstorageKeys";
import { useWishlistContext } from "../context/wishlistContext";
import { fetchCategories, updateCategoryClaim } from "../services/wishlistService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useInvitation from "./useInvitation";
import { mapIcons } from "../utils/iconMapper";
import { useEffect, useMemo } from "react";

/**
 * Hook to handle wishlist category and claim data logic
 */
const useWishlist = () => {
    const { code: guestCode } = useInvitation();

    const { actionDispatch, wishlistClaimedCategories } = useWishlistContext();
    const queryClient = useQueryClient();

    const claimedCategories = guestCode
        ? useMemo(() => wishlistClaimedCategories.find(item => item.guestCode === guestCode)?.claimedCategories ?? [], [guestCode, wishlistClaimedCategories])
        : [];

    const { data: dbCategories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,

    })

    //TO-DO fix this 
    useEffect(() => {
        dbCategories.forEach((category) => {
            const categoryClaimed = category.claims?.[guestCode ?? ""];

            if (categoryClaimed) {
                actionDispatch?.setClaimedCategory(category.title, guestCode!);
            }
        })
    }, [dbCategories, guestCode])

    //TO-DO merge mutation functions into one
    /**
     * The mutation function to store the claimed category in the database
     */
    const claimMutation = useMutation({
        mutationFn: ({ categoryTitle }: { categoryTitle: string }) => {
            if (!guestCode) throw new Error("Guest code is required");

            return updateCategoryClaim(categoryTitle, guestCode, "claim")
        },
        onMutate: async ({ categoryTitle }) => {
            if (!guestCode) return;

            await queryClient.cancelQueries({ queryKey: ["categories"] });

            const previousCategories = queryClient.getQueryData<DBCategoryType[]>(["categories"]);

            const previousClaimes: ClaimedCategories = [...claimedCategories];

            queryClient.setQueryData<DBCategoryType[]>(["categories"], (old) => {
                // Update old data to show claim instantly
                return old ? old.map(cat => cat.title === categoryTitle ? { ...cat, totalClaimed: cat.totalClaimed + 1 } : cat) : [];
            });

            actionDispatch?.setClaimedCategory(categoryTitle, guestCode);

            return { previousCategories, previousClaimes };
        },
        onSuccess: (_, { categoryTitle }) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });

            if (!guestCode) return;
            actionDispatch?.setClaimedCategory(categoryTitle, guestCode);
            saveWishlistClaimedCategory(categoryTitle);
        },
        onError: (err, { categoryTitle }, context) => {
            queryClient.setQueryData(["categories"], context?.previousCategories);
            console.error(err);

            if (!guestCode) return;
            actionDispatch?.removeClaimedCategory(categoryTitle, guestCode);
        },
    })

    /**
     * The mutation function to unclaimed a category stored in the database
     */
    const unclaimMutation = useMutation({
        mutationFn: ({ categoryTitle }: { categoryTitle: string }) => {
            if (!guestCode) throw new Error("Guest code is required");
            return updateCategoryClaim(categoryTitle, guestCode, "unclaim")
        },
        onMutate: async ({ categoryTitle }) => {
            if (!guestCode) return;
            await queryClient.cancelQueries({ queryKey: ["categories"] });

            const previousCategories = queryClient.getQueryData<DBCategoryType[]>(["categories"]);

            const previousCategory = claimedCategories.find(cat => cat.categoryTitle === categoryTitle);

            queryClient.setQueryData<DBCategoryType[]>(["categories"], (old) => {
                // Update old data to show claim instantly
                return old ? old.map(cat => cat.title === categoryTitle ? { ...cat, totalClaimed: cat.totalClaimed - 1 } : cat) : [];
            });

            if (previousCategory) {
                actionDispatch?.removeClaimedCategory(previousCategory.categoryTitle, guestCode);
            }

            return { previousCategories };
        },
        onSuccess: (_, { categoryTitle }) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            removeWishlistClaimedCategory(categoryTitle);
        },
        onError: (err, { categoryTitle }, context) => {
            queryClient.setQueryData(["categories"], context?.previousCategories);
            console.error(err);

            if (!guestCode) return;
            actionDispatch?.setClaimedCategory(categoryTitle, guestCode);
        },
    })

    //TO-DO merge localstorage functions into one helper function
    /**
     * Get the claimedCategories list in localstorage
     */
    const getWishlistClaimedCategories = (): WishlistClaimedCategories => {
        try {
            return JSON.parse(localStorage.getItem(CLAIMED_CATEGORIES) ?? "[]"); //Use nullish coalescing as a fallback for better performance instead of relying on the catch block
        } catch {
            return [];
        }
    }

    /**
     * Saves the claimedCategory in localstorage
     */
    const saveWishlistClaimedCategory = (category: string) => {
        const wishlistClaimedCategories: WishlistClaimedCategories = getWishlistClaimedCategories();
        localStorage.setItem(CLAIMED_CATEGORIES, JSON.stringify([...wishlistClaimedCategories, {
            guestCode: guestCode,
            claimedCategories: [{
                categoryTitle: category
            }]
        }] as WishlistClaimedCategories));
    }

    /**
     * Remove a category from the claimedCategories list in localstorag
     */
    const removeWishlistClaimedCategory = (category: string) => {
        const newArray = getWishlistClaimedCategories().map(item => {
            if (item.guestCode === guestCode) {
                return {
                    ...item,
                    claimedCategories: item.claimedCategories.filter(cat => cat.categoryTitle !== category)
                }
            }
            return item;
        })
        localStorage.setItem(CLAIMED_CATEGORIES, JSON.stringify(newArray));
    }

    /**
     * Maps DBCategoryType to CategoryType and save the claimed categories in context
     */
    const categories: CategoryType[] = useMemo(() => dbCategories.map((category: DBCategoryType): CategoryType => {
        return {
            ...category,
            icon: mapIcons(category.icon)
        }
    }), [dbCategories]);

    return {
        claimMutation,
        unclaimMutation,
        claimedCategories,
        categories,
        isLoading,
    };

}

export default useWishlist;