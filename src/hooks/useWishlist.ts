import type { CategoryType, ClaimActionType, DBCategoryType } from "../types/wishlistTypes";
import { CLAIMED_CATEGORIES } from "../constants/localstorageKeys";
import { useWishlistContext } from "../context/wishlistContext";
import { fetchCategories, updateCategoryClaim } from "../services/wishlistService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useInvitation from "./useInvitation";
import { mapIcons } from "../utils/iconMapper";
import { useMemo } from "react";
import { optimisticUpdate, removeClaimedCategory, upsertClaimedCategory } from "../utils/wishlist/claimedCategories";
import { safeParser } from "../utils/parser";

/**
 * Hook to handle wishlist category and claim data logic
 */
const useWishlist = () => {
    const { guestCode } = useInvitation();

    const { actionDispatch, wishlistClaimedCategories } = useWishlistContext();
    const queryClient = useQueryClient();

    const claimedCategories = guestCode
        ? useMemo(() => wishlistClaimedCategories.find(item => item.guestCode === guestCode)?.claimedCategories ?? [], [guestCode, wishlistClaimedCategories])
        : [];


    const { data: dbCategories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,

    })

    /**
     * The mutation function to store the claimed category in the database
     */
    const claimMutation = useMutation({
        mutationFn: ({ categoryTitle }: { categoryTitle: string }) => {
            if (!guestCode) throw new Error("Guest code is required");

            return updateCategoryClaim(categoryTitle, guestCode, "claim")
        },
        onMutate: async ({categoryTitle}) => {
            if (!guestCode) return;

            return optimisticUpdate({categoryTitle, action: "claim", guestCode, queryClient, actionDispatch})
        },
        onSuccess: (_, { categoryTitle }) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            updateWishlistClaimedCategory(categoryTitle, "claim");
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
        onMutate: async ({categoryTitle}) => {
            if (!guestCode) return;
            
            return optimisticUpdate({categoryTitle, action: "unclaim", guestCode, queryClient, actionDispatch})
        },
        onSuccess: (_, { categoryTitle }) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            updateWishlistClaimedCategory(categoryTitle, "unclaim");
        },
        onError: (err, { categoryTitle }, context) => {
            queryClient.setQueryData(["categories"], context?.previousCategories);
            console.error(err);

            if (!guestCode) return;
            actionDispatch?.setClaimedCategory(categoryTitle, guestCode);
        },
    })

    /**
     * Adds or remove a category from the claimedCategories list based on the action provided
     * @param category - Category title
     * @param action - "claim" or "unclaim"
     */
    const updateWishlistClaimedCategory = (category: string, action: ClaimActionType) => {
        if (!guestCode) return;

        const claimedCategories = safeParser(localStorage.getItem(CLAIMED_CATEGORIES), []);

        if (action === "claim") {
            localStorage.setItem(CLAIMED_CATEGORIES, JSON.stringify(upsertClaimedCategory(claimedCategories, guestCode, category)));
        } else if (action === "unclaim") {
            localStorage.setItem(CLAIMED_CATEGORIES, JSON.stringify(removeClaimedCategory(claimedCategories, guestCode, category)));
        }
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