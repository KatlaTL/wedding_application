import { queryClient } from "../queryClient";
import { fetchCategories } from "../services/wishlistService";

/**
 * Wishlist loader. Used to prefetch wishlist category data before entering the wishlist route
 */
export const wishlistLoader = async () => {

    queryClient.prefetchQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    })

    return null;
}