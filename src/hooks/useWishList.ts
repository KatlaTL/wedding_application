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
            items: [
                {
                    title: "Standmixer",
                    description: "Til at bage sammen og lave frisk pasta",
                    priority: "Essential"
                },
                {
                    title: "Standmixer",
                    description: "Til at bage sammen og lave frisk pasta",
                    priority: "Dream Gift"
                },
                {
                    title: "Standmixer",
                    description: "Til at bage sammen og lave frisk pasta",
                    priority: "Nice to Have"
                },
                {
                    title: "Standmixer",
                    description: "Til at bage sammen og lave frisk pasta",
                    priority: "Essential"
                },
                {
                    title: "Standmixer",
                    description: "Til at bage sammen og lave frisk pasta",
                    priority: "Essential"
                },
                {
                    title: "Standmixer",
                    description: "Til at bage sammen og lave frisk pasta",
                    priority: "Essential"
                },
                {
                    title: "Standmixer",
                    description: "Til at bage sammen og lave frisk pasta",
                    priority: "Nice to Have"
                },
            ]
        },
        {
            icon: Utensils,
            title: "Køkken & Spisestue",
            description: "Til madlavning og gæstfrihed",
            items: [
                {
                    title: "Standmixer",
                    description: "Til at bage sammen og lave frisk pasta",
                    priority: "Essential"
                },
                {
                    title: "Standmixer",
                    description: "Til at bage sammen og lave frisk pasta",
                    priority: "Dream Gift"
                },
                {
                    title: "Standmixer",
                    description: "Til at bage sammen og lave frisk pasta",
                    priority: "Nice to Have"
                },
                {
                    title: "Standmixer",
                    description: "Til at bage sammen og lave frisk pasta",
                    priority: "Essential"
                },
                {
                    title: "Standmixer",
                    description: "Til at bage sammen og lave frisk pasta",
                    priority: "Essential"
                },
                {
                    title: "Standmixer",
                    description: "Til at bage sammen og lave frisk pasta",
                    priority: "Essential"
                },
                {
                    title: "Standmixer",
                    description: "Til at bage sammen og lave frisk pasta",
                    priority: "Nice to Have"
                },
            ]
        },
    ]

    return wishListCategories;

}

export default useWishList;