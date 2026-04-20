import { redirect } from "react-router-dom";
import { type User } from "firebase/auth";

/**
 * Admin loader. Used as a guard before entering the admin route
 */
export const adminLoader = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "") as User;

    if (!user || user.isAnonymous) {
        throw redirect("/admin/login");
    }

    return { user }
}