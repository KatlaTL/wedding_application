import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { GuestSchema } from "../schemas/invitationSchema";
import type { AdminGuestListType, AdminGuestType } from "../types/adminTypes";


export const fetchAdminGuestList = async (): Promise<AdminGuestListType> => {
    const guestListRef = collection(db, "guestList");

    const snapshot = await getDocs(guestListRef);

    return snapshot.docs.map((doc) => {
        const parsed = GuestSchema.safeParse(doc.data());

        if (!parsed.success) {
            console.error("Invalid guest data in Firestore", parsed.error);
            return null;
        }

        return {
            name: parsed.data.firstName + " " + parsed.data.lastName,
            email: parsed.data.email,
            invitationCode: doc.id
        } as AdminGuestType;
    }).filter((item): item is AdminGuestType => item !== null);
}