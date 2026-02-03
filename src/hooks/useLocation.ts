import { useQuery } from "@tanstack/react-query";
import { fetchLocations } from "../services/locationService";

/**
 * Hook to handle location data logic
 */
const useLocation = () => {

    const { data: locations = [], isLoading } = useQuery({
        queryKey: ["locations"],
        queryFn: fetchLocations,
    })

    return { locations, isLoading };
}

export default useLocation;