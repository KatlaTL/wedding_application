import { collection, deleteDoc, doc, getDocs, increment, runTransaction, serverTimestamp } from "firebase/firestore";
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
    const categoryDocRef = doc(wishlistRef, slugify(categoryTitle));

    return await runTransaction(db, async (transaction) => {
        const claimRef = doc(collection(categoryDocRef, "claims"));
        transaction.set(claimRef, {
            guestCode,
            claimedAt: serverTimestamp()
        })
        
        transaction.update(categoryDocRef, { totalClaimed: increment(1) });
        
        return claimRef.id;
    })
}

/**
 * unclaims a category 
 * @param categoryTitle - The category title 
 * @param claimId the Firestore claimRef.id
 */
export const unclaimCategory = async (categoryTitle: string, claimId: string) => {
    const categoryDocRef = doc(wishlistRef, slugify(categoryTitle));

    await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(categoryDocRef);
        
        if (!docSnap.exists()) {
            throw "Category not found";
        }
        
        const totalClaimed = docSnap.data()?.totalClaimed ?? 0;
        
        if (totalClaimed <= 0) {
            throw "totalClaimed doesn't exists or its value is already 0 or less";
        }
        
        transaction.delete(doc(categoryDocRef, "claims", claimId));
        
        transaction.update(categoryDocRef, { totalClaimed: increment(-1) });
    })
}