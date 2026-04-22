import { browserSessionPersistence, GoogleAuthProvider, linkWithPopup, onAuthStateChanged, setPersistence, signInAnonymously, signInWithPopup, signOut, type User } from "firebase/auth"
import { auth } from "./firebase";
import { FirebaseError } from "firebase/app";

export const initAuth = async () => {
    await setPersistence(auth, browserSessionPersistence);

    if (!auth.currentUser) {
        await signInAnonymously(auth);
    }
}

/**
 * Wait for firebase to resolve the auth state change and return in signed in user or null if no user is signed in
 * @returns The signed in user or null
 */
export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        })
    })
}

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    return result.user;
}

export const signOutUser = async () => {
    await signOut(auth)
    await signInAnonymously(auth);
}