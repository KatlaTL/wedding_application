import z from "zod";
import type { IconName } from "../types/utilsTypes";
import * as LucideIcons from "lucide-react";

export const IconNameSchema = z.enum(Object.keys(LucideIcons) as IconName[]);

export const CategoryItemsSchema = z.array(z.object({
    title: z.string(),
    description: z.string(),
    link: z.string().optional()
}))

export const CategoriesSchema = z.object({
    icon: IconNameSchema,
    title: z.string(),
    description: z.string(),
    totalClaimed: z.number(),
    items: CategoryItemsSchema
});

export const ClaimedCategoriesSchema = z.array(z.object({
    categoryTitle: z.string(),
    claimId: z.string()
}))

export const WishlistClaimedCategoriesSchema = z.array(z.object({
    guestCode: z.string(),
    claimedCategories: ClaimedCategoriesSchema
}))

export const WishlistStateSchema = z.object({
    wishlistClaimedCategories: WishlistClaimedCategoriesSchema
})