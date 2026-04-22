import { redirect } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

/**
 * Admin loader. Used as a guard before entering the admin route
 */
export const adminLoader = async () => {
    const user = await getCurrentUser();

    if (!user || user.isAnonymous) {
        throw redirect("/admin/login");
    }

    return { user }
}