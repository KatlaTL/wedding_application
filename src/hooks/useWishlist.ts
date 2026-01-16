import type { CategoryType, DBCategoryType } from "../types/wishlistTypes";
import { CLAIMED_CATEGORIES } from "../constants/localstorageKeys";
import { useWishlistContext } from "../context/wishlistContext";
import { mapIcons } from "../utils/iconMapper";
import { claimCategory, fetchCategories } from "../services/wishlistService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


/**
 * Hook to handle wishlist data logic
 */
const useWishlist = () => {
    const { ...rest } = useWishlistContext();
    const queryClient = useQueryClient();

    const { data: dbCategories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,

    })

    const claimMutation = useMutation({
        mutationFn: ({ title, guestCode }: { title: string, guestCode: string }) => claimCategory(title, guestCode),
        onSuccess: (claimId, variables) => {
            // TO-DO save claimId / guestCode in context to make it possable to unclaim
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })

    /**
     * Get the claimedCategories list in localstorage
     */
    const getClaimedCategories = (): string[] => {
        try {
            return JSON.parse(localStorage.getItem(CLAIMED_CATEGORIES) ?? "[]"); //Use nullish coalescing as a fallback for better performance instead of relying on the catch block
        } catch {
            return [];
        }
    }

    /**
     * Saves the claimedCategory in localstorage
     */
    const saveClaimedCategory = (category: string) => {
        localStorage.setItem(CLAIMED_CATEGORIES, JSON.stringify([...getClaimedCategories(), category]));
    }

    /**
     * Remove a category from the claimedCategories list in localstorag
     */
    const removeClaimedCategory = (category: string) => {
        const newArray = getClaimedCategories().filter(item => item !== category);
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
        getClaimedCategories,
        saveClaimedCategory,
        removeClaimedCategory,
        ...rest
    };

}

export default useWishlist;