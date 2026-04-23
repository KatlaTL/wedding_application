import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { auth } from "../services/firebase";
import { initAuth } from "../services/authService";

type AuthContextI = {
    user: User | null;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
};

const contextInitialState: AuthContextI = {
    user: null,
    isLoading: true,
    setIsLoading: () => {
        throw new Error("setIsLoading must be used within AuthProvider");
    }
};

const AuthContext = createContext<AuthContextI>(contextInitialState);

/**
 * Auth context provider \
 * Signs in the user anonymously on page load
 * @returns Context provider
 */
export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        initAuth();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setIsLoading(false);
        })

        return unsubscribe;
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            setIsLoading
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
        throw new Error('useAuthContext must be used within a AuthProvider');
    }
    return context;
};