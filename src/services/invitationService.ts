import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import type { GuestListType } from "../types/invitationTypes";
import { GuestSchema } from "../schemas/invitationSchema";

const guestListRef = collection(db, "guestList");

/**
 * Fetches the guest list
 * @returns record of guests
 */
export const fetchGuestList = async (): Promise<GuestListType> => {
    const snapshot = await getDocs(guestListRef);

    return snapshot.docs.reduce((acc, doc) => {
        const parsed = GuestSchema.safeParse(doc.data());

        if (!parsed.success) {
            console.error("Invalid guest data in Firestore", parsed.error);
            return acc;
        }

        acc[doc.id] = parsed.data;

       return acc;
    }, {} as GuestListType)
}