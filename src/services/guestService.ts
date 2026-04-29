import { collection, deleteDoc, doc, getDoc, getDocs, runTransaction, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import type { GuestListType, GuestType } from "../types/invitationTypes";
import { GuestSchema } from "../schemas/invitationSchema";
import { sanitizeObject } from "../utils/normalizeObject";
import type { AdminGuestListType, AdminGuestType } from "../types/adminTypes";
import { generateCode } from "../lib/guestCode";

const guestListRef = collection(db, "guestList");

/**
 * Binds the provided guest code to the current anonymously authenticated user
 * @param guestCode - The guest code
 */
export const bindGuestCode = async (guestCode: string) => {
    if (!auth.currentUser) throw new Error("Not authenticated");

    const guestDocRef = doc(guestListRef, guestCode);
    const guestSnap = await getDoc(guestDocRef);

    if (!guestSnap.exists()) {
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
    if (!auth.currentUser) throw new Error("Not authenticated");

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

export const updateGuestRSVP = async (guestCode: string, RSVP: Partial<GuestType>) => {
    if (!RSVP) throw new Error("Missing RSVP data");

    const guestDocRef = doc(guestListRef, guestCode);

    return await updateDoc(guestDocRef, {
        ...sanitizeObject(RSVP),
        updatedAt: serverTimestamp(),
    });
}

export const fetchAdminGuestList = async (): Promise<AdminGuestListType> => {
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
            invitationCode: doc.id,
            isAttending: parsed.data.isAttending,
            dietary: parsed.data.dietary,
            allergies: parsed.data.allergies
        } as AdminGuestType;
    }).filter((item): item is AdminGuestType => item !== null);
}

export const updateGuestAttendance = async (guestCode: string, isAttending: boolean) => {
    if (isAttending === undefined || isAttending === null) throw new Error("Missing isAttending");

    const guestDocRef = doc(guestListRef, guestCode);

    return await updateDoc(guestDocRef, {
        isAttending: isAttending,
        updatedAt: serverTimestamp(),
    });
}

export const addGuest = async (guest: GuestType): Promise<string> => {
    if (!guest || guest.email === "" || guest.firstName === "" || guest.lastName === "") throw new Error("ALL_FIELDS_ARE_REQUIRED");

    for (let i = 0; i < 5; i++) {
        const guestCode = generateCode(guest.firstName + " " + guest.lastName);
        const docRef = doc(guestListRef, guestCode);

        try {
            await runTransaction(db, async (tx) => {
                const docSnap = await tx.get(docRef);

                if (docSnap.exists()) {
                    throw new Error("COLLISION");
                }

                tx.set(docRef, {
                    ...sanitizeObject(guest)
                });
            });

            return guestCode;
        } catch (e: any) {
            if (e.message === "COLLISION") continue;
            throw e;
        }
    }

    throw new Error("Failed to generate unique guest code after retries");
}

export const deleteGuest = async (guestCode: string) => {
    if (!guestCode) throw new Error("Missing guest code");

    const guestDocRef = doc(guestListRef, guestCode);

    await deleteDoc(guestDocRef);
}