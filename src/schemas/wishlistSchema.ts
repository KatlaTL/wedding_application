import z from "zod";
import { IconNameSchema } from "./utilsSchema";

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
    items: CategoryItemsSchema,
    claims: z.record(z.string(), z.boolean()).optional()
});

export const ClaimedCategoriesSchema = z.array(z.object({
    categoryTitle: z.string(),
}))

export const WishlistClaimedCategoriesSchema = z.array(z.object({
    guestCode: z.string(),
    claimedCategories: ClaimedCategoriesSchema
}))

export const WishlistStateSchema = z.object({
    wishlistClaimedCategories: WishlistClaimedCategoriesSchema
})