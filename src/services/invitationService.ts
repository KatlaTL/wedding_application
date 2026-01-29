import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import type { GuestListType } from "../types/invitationTypes";
import { GuestSchema } from "../schemas/invitationSchema";

const guestListRef = collection(db, "guestList");

/**
 * Binds the provided guest code to the current anonymously authenticated user
 * @param guestCode - The guest code
 */
export const bindGuestCode = async (guestCode: string) => {
    if (!auth.currentUser) throw new Error("Not authenticated");

    const guestDocRef = doc(guestListRef, guestCode);
    const guestSnap = await getDoc(guestDocRef);

    if (!guestSnap.exists) {
        throw new Error("Invalid guest code");
    }

    const sessionRef = doc(db, "guestSessions", auth.currentUser.uid);

    await setDoc(sessionRef, {
        guestCode,
        boundAt: new Date(),
    }, { merge: false });
}

/**
 * Unbinds the current guest code from the anonymously authenticated user
 */
export const unbindGuest = async () => {
    if (!auth.currentUser) return;
    
    const sessionRef = doc(db, "guestSessions", auth.currentUser.uid);
    await deleteDoc(sessionRef);
}

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