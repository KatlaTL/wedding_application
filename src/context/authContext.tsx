import { onAuthStateChanged, signInAnonymously, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { auth } from "../services/firebase";

type AuthContextValue = {
    user: User | null;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Auth context provider \
 * Signs in the user anonymously on page load
 * @returns Context provider
 */
export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                await signInAnonymously(auth);
                return;
            }

            setUser(user);
            setIsLoading(false);
        })

        return unsubscribe;
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
} 

/**
 * Hook which checks if the auth context is defined
 * @returns Auth context
 */
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a LoadingProvider');
    }
    return context;
};