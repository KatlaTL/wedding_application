import type { LocationType } from "../types/locationTypes";

/**
 * Hook to handle location data logic
 */
const useLocation = () => {
    const Locations: LocationType[] = [
        {
            address: "Bodebjergvej 2, 5620 Glamsbjerg",
            mapUrl: "",
            imageUrl: "",
            title: "Køng Kirke",
            description: "Køng kirke er der hvor Rikke er konfirmeret og ligger ved siden af Rikkes barndomshjem",
            time: "kl. 12:30"
        },
    ]


    return Locations;

}

export default useLocation;