import { collection, deleteField, doc, getDocs, increment, runTransaction } from "firebase/firestore";
import { db } from "./firebase";
import type { DBCategoryType } from "../types/wishlistTypes";
import { CategoriesSchema } from "../schemas/wishlistSchema";
import { slugify } from "../utils/slug";

type ClaimActionType = "claim" | "unclaim";

const wishlistRef = collection(db, "wishlist");

/**
 * Fetches the wishlish categories
 * @returns array of categories as DBCategoryType
 */
export const fetchCategories = async (): Promise<DBCategoryType[]> => {
    const snapshot = await getDocs(wishlistRef);

    return snapshot.docs.map(doc => {
        const parsed = CategoriesSchema.safeParse(doc.data());

        if (!parsed.success) {
            console.error("Invalid category data in Firestore", parsed.error);
            return null;
        }
        return parsed.data
    }).filter((item): item is DBCategoryType => item !== null);
}

/**
 * Claims or unclaims a category
 * @param categoryTitle - The category title 
 * @param guestCode - The code of the guest who is claiming the category 
 * @param action - The action the function should take: claim or unclaim
 */
export const updateCategoryClaim = async (categoryTitle: string, guestCode: string, action: ClaimActionType) => {
    const categoryDocRef = doc(wishlistRef, slugify(categoryTitle));

    await runTransaction(db, async (transaction) => {
        const categorySnap = await transaction.get(categoryDocRef);

        if (!categorySnap.exists()) {
            throw new Error("Category does not exist");
        }

        const data = categorySnap.data();

        const hasClaimed = data.claims?.[guestCode] ?? false;

        if (action === "claim") {
            if (hasClaimed) {
                throw new Error("This guest has already claimed this category");
            }

            transaction.update(categoryDocRef, {
                [`claims.${guestCode}`]: true,
                totalClaimed: increment(1)
            });

        } else if (action === "unclaim") {
            if (!hasClaimed) {
                throw new Error("Cannot unclaim; not claimed yet");
            }

            transaction.update(categoryDocRef, {
                [`claims.${guestCode}`]: deleteField(),
                totalClaimed: increment(-1)
            });
        }

    })
}