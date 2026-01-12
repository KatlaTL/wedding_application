import { Utensils } from "lucide-react"
import type { CategoryType } from "../types/wishListTypes";

/**
 * Hook to handle wishlist data logic
 */
const useWishList = () => {
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

    return wishListCategories;

}

export default useWishList;