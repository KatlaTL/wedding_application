import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { DBCategoryType } from "../types/wishlistTypes";
import { CategoriesSchema } from "../schemas/wishlistSchema";
import { slugify } from "../utils/slug";

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
 * Claims a category
 * @param categoryTitle - The category title 
 * @param guestCode - The code of the guest who is claiming the category 
 * @returns the Firestore claimRef.id
 */
export const claimCategory = async (categoryTitle: string, guestCode: string): Promise<string> => {
   const claimRef = await addDoc(collection(wishlistRef, slugify(categoryTitle), "claims"), {
        guestCode,
        claimedAt: serverTimestamp()
    })

    return claimRef.id;
}

/**
 * unclaims a category 
 * @param categoryTitle - The category title 
 * @param claimId the Firestore claimRef.id
 */
export const unclaimCategory = async (categoryTitle: string, claimId: string) => {
    await deleteDoc(doc(wishlistRef, slugify(categoryTitle), "claims", claimId));
}