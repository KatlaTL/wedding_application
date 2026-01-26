import type { ClaimedCategories, DBCategoryType, OptimisticUpdateType, WishlistClaimedCategories } from "../../types/wishlistTypes";

/**
 * Insert or update a category in the claimed category array
 * @param claimedCategories - The list of calimedCategories
 * @param guestCode - The guestCode
 * @param category - The category title
 * @returns a WishlistClaimedCategories array
 */
export const upsertClaimedCategory = (claimedCategories: WishlistClaimedCategories, guestCode: string, category: string): WishlistClaimedCategories => {
    const guestCodeExists = claimedCategories.find(item => item.guestCode === guestCode);

    if (!guestCodeExists) {
        return [...claimedCategories, {
            guestCode,
            claimedCategories: [{
                categoryTitle: category
            }]
        }]
    }

    const categoryExists = guestCodeExists?.claimedCategories.some(cat => cat.categoryTitle === category);

    if (categoryExists) {
        return claimedCategories.map(item => {
            if (item.guestCode != guestCode) return item;

            return {
                ...item,
                claimedCategories: item.claimedCategories.map(cat => {
                    if (cat.categoryTitle != category) return cat;

                    return {
                        ...cat,
                        categoryTitle: category,
                    }
                })
            }
        })
    }

    return claimedCategories.map(item => {
        if (item.guestCode != guestCode) return item;

        return {
            ...item,
            claimedCategories: [
                ...item.claimedCategories,
                {
                    categoryTitle: category
                }
            ] as ClaimedCategories
        }
    })
}

/**
 * Removes a category in the claimed category array
 * @param claimedCategories - The list of calimedCategories
 * @param guestCode - The guestCode
 * @param category - The category title
 * @returns a WishlistClaimedCategories array
 */
export const removeClaimedCategory = (claimedCategories: WishlistClaimedCategories, guestCode: string, category: string): WishlistClaimedCategories => {
    return Array.from(new Map(claimedCategories.map(item => [item.guestCode, item])).values()).map(item => {
        if (item.guestCode === guestCode) {
            return {
                ...item,
                claimedCategories: item.claimedCategories.filter(cat => cat.categoryTitle !== category)
            }
        }
        return item;
    })
}

export const optimisticUpdate = async ({ categoryTitle, action, guestCode, queryClient, actionDispatch }: OptimisticUpdateType) => {
    await queryClient.cancelQueries({ queryKey: ["categories"] });

    const previousCategories = queryClient.getQueryData<DBCategoryType[]>(["categories"]);

    const delta = action === "claim" ? 1 : -1;

    queryClient.setQueryData<DBCategoryType[]>(["categories"], (old) =>
        old
            ? old.map(cat =>
                cat.title === categoryTitle
                    ? { ...cat, totalClaimed: cat.totalClaimed + delta }
                    : cat
            )
            : []
    );

    if (action === "claim") {
        actionDispatch?.setClaimedCategory(categoryTitle, guestCode);
    } else if (action === "unclaim") {
        actionDispatch?.removeClaimedCategory(categoryTitle, guestCode);
    }

    return { previousCategories };
}