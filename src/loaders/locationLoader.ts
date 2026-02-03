import { queryClient } from "../queryClient";
import { fetchLocations } from "../services/locationService";

/**
 * Location loader. Used to prefetch Location data before entering the Location route
 */
export const locationLoader = async () => {

    queryClient.prefetchQuery({
        queryKey: ["locations"],
        queryFn: fetchLocations,
    })

    return null;
}