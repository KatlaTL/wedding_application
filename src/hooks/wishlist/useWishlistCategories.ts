import type { CategoryType, DBCategoryType } from "../../types/wishlistTypes";
import { mapIcons } from "../../utils/iconMapper";
import {  fetchCategories,  } from "../../services/wishlistService";
import {  useQuery,  } from "@tanstack/react-query";

/**
 * Hook to handle wishlistCategory data logic
 */
const useWishlistCategories = () => {

    const { data: dbCategories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,

    })

    /**
     * Maps DBCategoryType to CategoryType
     */
    const categories: CategoryType[] = dbCategories.map((category: DBCategoryType): CategoryType => {
        return {
            ...category,
            icon: mapIcons(category.icon)
        }
    });

    return {
        categories,
        isLoading,
    };

}

export default useWishlistCategories;