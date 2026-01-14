import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import type { DBCategoryType } from "../types/wishlistTypes";
import { CategoriesSchema } from "../schemas/wishlistSchema";

const wishlistCollection = collection(db, "wishlist");

export const fetchCategories = async (): Promise<DBCategoryType[]> => {
    const snapshot = await getDocs(wishlistCollection);

    return snapshot.docs.map(doc => {
        const parsed = CategoriesSchema.safeParse(doc.data());
       
        if (!parsed.success) {
            console.error("Invalid category data in Firestore", parsed.error);
            return null;
        }
        return parsed.data
    }).filter((item): item is DBCategoryType => item !== null);
}