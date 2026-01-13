import { Utensils } from "lucide-react"
import type { CategoryType } from "../types/wishListTypes";
import { CLAIMED_CATEGORIES } from "../constants/localstorageKeys";

/**
 * Hook to handle wishlist data logic
 */
const useWishList = () => {

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


    const wishListCategories: CategoryType[] = [
        {
            icon: Utensils,
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
            icon: Utensils,
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
    ]

    return {
        wishListCategories,
        getClaimedCategories,
        saveClaimedCategory,
        removeClaimedCategory
    };

}

export default useWishList;