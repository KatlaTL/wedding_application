import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { signOutUser, signInWithGoogle } from "../services/authService";

const useAuth = () => {
    const { user, isLoading, setIsLoading } = useAuthContext();
    const navigate = useNavigate();

    const login = async () => {
        setIsLoading(true);

        try {
            const user = await signInWithGoogle();

            const authorizedEmails: string = import.meta.env.VITE_AUTHORIZED_EMAILS;
            const authorizedEmailsArr = authorizedEmails.split(";");

            if (!authorizedEmailsArr.includes(user.email ?? "")) {
                await logout();
                throw new Error("Unauthorized");
            }

            navigate("/admin");
        } finally {
            setIsLoading(false);
        }
    }

    const logout = async () => {
        await signOutUser();

        navigate("/admin/login");
    }

    return {
        login,
        logout,
        user,
        isAuthenticated: !!user,
        isLoading
    }
}

export default useAuth;