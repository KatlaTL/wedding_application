import type { CategoryType, ClaimedCategories, DBCategoryType } from "../types/wishlistTypes";
import { CLAIMED_CATEGORIES } from "../constants/localstorageKeys";
import { useWishlistContext } from "../context/wishlistContext";
import { mapIcons } from "../utils/iconMapper";
import { claimCategory, fetchCategories, unclaimCategory } from "../services/wishlistService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


/**
 * Hook to handle wishlist data logic
 */
const useWishlist = () => {
    const { actionDispatch, claimedCategories } = useWishlistContext();
    const queryClient = useQueryClient();

    const { data: dbCategories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,

    })

    /**
     * The mutation function to store the claimed category in the database
     */
    const claimMutation = useMutation({
        mutationFn: ({ categoryTitle, guestCode }: { categoryTitle: string, guestCode: string }) => claimCategory(categoryTitle, guestCode),
        onSuccess: (claimId, variables) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            actionDispatch?.setClamiedCategory(variables.categoryTitle, variables.guestCode, claimId);
            saveClaimedCategory(variables.categoryTitle, variables.guestCode, claimId);
        }
    })

    /**
     * The mutation function to unclaimed a category stored in the database
     */
    const unclaimMutation = useMutation({
        mutationFn: ({ categoryTitle, claimId }: { categoryTitle: string, claimId: string }) => unclaimCategory(categoryTitle, claimId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            actionDispatch?.removeClamiedCategory(variables.categoryTitle);
            removeClaimedCategory(variables.categoryTitle);
        }
    })

    const getClaimId = (categoryTitle: string, guestCode?: string) => {
        const category = claimedCategories.find(cat => cat.categoryTitle === categoryTitle);

        if (!category) return;
    
        if (!guestCode) {
            return category.claims[0].claimId;
        }

        return category.claims.find(claim => claim.guestCode === guestCode)?.claimId;
    }


    /**
     * Get the claimedCategories list in localstorage
     */
    const getClaimedCategories = (): ClaimedCategories => {
        try {
            return JSON.parse(localStorage.getItem(CLAIMED_CATEGORIES) ?? "[]"); //Use nullish coalescing as a fallback for better performance instead of relying on the catch block
        } catch {
            return [];
        }
    }

    /**
     * Saves the claimedCategory in localstorage
     */
    const saveClaimedCategory = (category: string, guestCode: string, claimId: string) => {
        const claimedCategories: ClaimedCategories = getClaimedCategories();
        localStorage.setItem(CLAIMED_CATEGORIES, JSON.stringify([...claimedCategories, {
            categoryTitle: category,
            claims: [...claimedCategories.find(cat => cat.categoryTitle === category)?.claims ?? [], {
                guestCode: guestCode,
                claimId: claimId
            }]
        }] as ClaimedCategories));
    }

    /**
     * Remove a category from the claimedCategories list in localstorag
     */
    const removeClaimedCategory = (category: string) => {
        const newArray = getClaimedCategories().filter(item => item.categoryTitle !== category);
        localStorage.setItem(CLAIMED_CATEGORIES, JSON.stringify(newArray));
    }

    /**
     * Maps DBCategoryType to CategoryType
     */
    const categories: CategoryType[] = dbCategories.map((category: DBCategoryType): CategoryType => {
        return {
            ...category,
            icon: mapIcons(category.icon)
        }
    });

    return {
        categories,
        isLoading,
        claimMutation,
        unclaimMutation,
        getClaimedCategories,
        saveClaimedCategory,
        removeClaimedCategory,
        actionDispatch,
        claimedCategories,
        getClaimId
    };

}

export default useWishlist;