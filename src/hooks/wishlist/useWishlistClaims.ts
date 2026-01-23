import type { ClaimedCategories, DBCategoryType, WishlistClaimedCategories } from "../../types/wishlistTypes";
import { CLAIMED_CATEGORIES } from "../../constants/localstorageKeys";
import { useWishlistContext } from "../../context/wishlistContext";
import { claimCategory, unclaimCategory } from "../../services/wishlistService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Hook to handle wishlist category claim data logic
 */
const useWishlistClaims = (guestCode: string | null) => {
    // Early return if guestCode is null
    if (!guestCode) {
        return {
            claimedCategories: [],
            claimMutation: {
                mutate: () => { },
                isPending: false,
            },
            unclaimMutation: {
                mutate: () => { },
                isPending: false,
            },
            getClaimId: () => null,
        };
    }

    const { actionDispatch, wishlistClaimedCategories } = useWishlistContext();
    const queryClient = useQueryClient();

    const claimedCategories = wishlistClaimedCategories.find(item => item.guestCode === guestCode)?.claimedCategories ?? [];

    /**
     * The mutation function to store the claimed category in the database
     */
    const claimMutation = useMutation({
        mutationFn: ({ categoryTitle }: { categoryTitle: string, guestCode: string }) => claimCategory(categoryTitle, guestCode),
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: ["categories"] });

            const previousCategories = queryClient.getQueryData<DBCategoryType[]>(["categories"]);

            const previousClaimes: ClaimedCategories = [...claimedCategories];

            queryClient.setQueryData<DBCategoryType[]>(["categories"], (old) => {
                // Update old data to show claim instantly
                return old ? old.map(cat => cat.title === variables.categoryTitle ? { ...cat, totalClaimed: cat.totalClaimed + 1 } : cat) : [];
            });

            actionDispatch?.setClaimedCategory(variables.categoryTitle, variables.guestCode, "optimistic-placeholder-id");

            return { previousCategories, previousClaimes };
        },
        onSuccess: (claimId, variables) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            actionDispatch?.setClaimedCategory(variables.categoryTitle, variables.guestCode, claimId);
            saveWishlistClaimedCategory(variables.categoryTitle, claimId);
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData(["categories"], context?.previousCategories);
            actionDispatch?.removeClaimedCategory(variables.categoryTitle, variables.guestCode);
            console.error(err);
        },
    })

    /**
     * The mutation function to unclaimed a category stored in the database
     */
    const unclaimMutation = useMutation({
        mutationFn: ({ categoryTitle, claimId }: { categoryTitle: string, claimId: string }) => unclaimCategory(categoryTitle, claimId),
        onMutate: async ({ categoryTitle }) => {
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

            return { previousCategories, previousCategory };
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            removeWishlistClaimedCategory(variables.categoryTitle);
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData(["categories"], context?.previousCategories);
            if (context?.previousCategory) {
                actionDispatch?.setClaimedCategory(variables.categoryTitle, guestCode, context.previousCategory.claimId);
            }
            console.error(err);
        },
    })

    /**
     * Get the claimId for a category
     */
    const getClaimId = (categoryTitle: string) => {
        const category = claimedCategories.find(cat => cat.categoryTitle === categoryTitle);

        if (!category) return;

        return category.claimId;
    }


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
    const saveWishlistClaimedCategory = (category: string, claimId: string) => {
        const wishlistClaimedCategories: WishlistClaimedCategories = getWishlistClaimedCategories();
        localStorage.setItem(CLAIMED_CATEGORIES, JSON.stringify([...wishlistClaimedCategories, {
            guestCode: guestCode,
            claimedCategories: [{
                categoryTitle: category,
                claimId: claimId
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

    return {
        claimMutation,
        unclaimMutation,
        claimedCategories,
        getClaimId
    };

}

export default useWishlistClaims;