import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "./firebase";


export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    
    const result = await signInWithPopup(auth, provider);

    return result.user;
}

export const signOutUser = () => signOut(auth);