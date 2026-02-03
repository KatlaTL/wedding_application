import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import type { LocationType } from "../types/locationTypes";
import { LocationSchema } from "../schemas/locationSchema";

const locationRef = collection(db, "location");

/**
 * Fetches the locations
 * @returns array of location as LocationType
 */
export const fetchLocations = async (): Promise<LocationType[]> => {
    const snapshot = await getDocs(locationRef);

    return snapshot.docs.map(doc => {
        const parsed = LocationSchema.safeParse(doc.data());

        if (!parsed.success) {
            console.error("Invalid location data in Firestore", parsed.error);
            return null;
        }
        return parsed.data
    }).filter((item): item is LocationType => item !== null);
}