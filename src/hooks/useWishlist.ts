import type { CategoryType, DBCategoryType } from "../types/wishlistTypes";
import { CLAIMED_CATEGORIES } from "../constants/localstorageKeys";
import { useWishlistContext } from "../context/wishlistContext";
import { mapIcons } from "../utils/iconMapper";
import { useEffect, useState } from "react";
import { fetchCategories } from "../services/wishlistService";


/**
 * Hook to handle wishlist data logic
 */
const useWishlist = () => {
    const { ...rest } = useWishlistContext();
    const [dbCategories, setDbCategories] = useState<DBCategoryType[]>([]);


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



    //TO-DO move this to DB
    /*  const dbCategories: DBCategoryType[] = [
         {
             icon: "Utensils",
             title: "Køkken & Spisestue",
             description: "Til madlavning og gæstfrihed",
             totalClaimed: 4,
             items: [
                 {
                     title: "Standmixer",
                     description: "Til at bage sammen og lave frisk pasta",
                     link: "https://mythicspoiler.com/newspoilers.html"
                 },
                 {
                     title: "Standmixer",
                     description: "Til at bage sammen og lave frisk pasta",
                 },
                 {
                     title: "Standmixer",
                     description: "Til at bage sammen og lave frisk pasta",
                     link: "https://mythicspoiler.com/newspoilers.html"
                 },
                 {
                     title: "Standmixer",
                     description: "Til at bage sammen og lave frisk pasta",
                 },
                 {
                     title: "Standmixer",
                     description: "Til at bage sammen og lave frisk pasta",
                 },
                 {
                     title: "Standmixer",
                     description: "Til at bage sammen og lave frisk pasta",
                 },
                 {
                     title: "Standmixer",
                     description: "Til at bage sammen og lave frisk pasta",
                 },
             ]
         },
         {
             icon: "Utensils",
             title: "Køkken & Spisestue",
             description: "Til madlavning og gæstfrihed",
             totalClaimed: 0,
             items: [
                 {
                     title: "Standmixer",
                     description: "Til at bage sammen og lave frisk pasta",
                 },
                 {
                     title: "Standmixer",
                     description: "Til at bage sammen og lave frisk pasta",
                     link: "https://mythicspoiler.com/newspoilers.html"
                 },
                 {
                     title: "Standmixer",
                     description: "Til at bage sammen og lave frisk pasta",
                 },
                 {
                     title: "Standmixer",
                     description: "Til at bage sammen og lave frisk pasta",
                 },
                 {
                     title: "Standmixer",
                     description: "Til at bage sammen og lave frisk pasta",
                 },
                 {
                     title: "Standmixer",
                     description: "Til at bage sammen og lave frisk pasta",
                 },
                 {
                     title: "Standmixer",
                     description: "Til at bage sammen og lave frisk pasta",
                 },
             ]
         },
     ] */
    useEffect(() => {
        const load = async () => {
            const categories = await fetchCategories();
            setDbCategories(categories);
            console.log(categories);
        };
        load();
    }, []);

    const wishListCategories: CategoryType[] = dbCategories.map((category: DBCategoryType): CategoryType => {
        return {
            ...category,
            icon: mapIcons(category.icon)
        }
    });

    return {
        wishListCategories,
        getClaimedCategories,
        saveClaimedCategory,
        removeClaimedCategory,
        ...rest
    };

}

export default useWishlist;