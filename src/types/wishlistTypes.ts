import type { LucideProps } from "lucide-react";
import type z from "zod";
import type { CategoriesSchema, ClaimedCategories, WishlistStateSchema } from "../schemas/wishlistSchema";

export type CategoryTileType = {
    title: string;
    description: string;
    link?: string;
}

export type CategorySectionType = {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
    title: string;
    description: string;
    totalClaimed: number;
}

export type CategoryType = CategorySectionType & {
    items: CategoryTileType[];
}

export type DBCategoryType = z.infer<typeof CategoriesSchema>;

export type ClaimedCategories = z.infer<typeof ClaimedCategories>;

export type WishlistStateType = z.infer<typeof WishlistStateSchema>;

export interface WishlistContextI extends WishlistStateType {
    actionDispatch: {
        setClaimedCategory: (category: string, guestCode: string, claimId: string) => void;
        removeClaimedCategory: (category: string) => void;
        resetClaimedCategories: () => void;
    } | null;
}

export const WishlistActionTypes = {
    SET_CLAIMED_CATEGORY: "SET_CLAIMED_CATEGORY",
    REMOVE_CLAIMED_CATEGORY: "REMOVE_CLAIMED_CATEGORY",
    RESET_CLAIMED_CATEGORIES: "RESET_CLAIMED_CATEGORIES"
} as const;

export type WishlistActionTypes = typeof WishlistActionTypes[keyof typeof WishlistActionTypes];

export type WishlistReducerActionType =
    { type: typeof WishlistActionTypes.SET_CLAIMED_CATEGORY, payload: { category: string, guestCode: string, claimId: string } } |
    { type: typeof WishlistActionTypes.REMOVE_CLAIMED_CATEGORY, payload: { category: string } } |
    { type: typeof WishlistActionTypes.RESET_CLAIMED_CATEGORIES }