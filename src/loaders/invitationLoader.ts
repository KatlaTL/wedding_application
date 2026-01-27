import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { fetchGuestList } from "../services/invitationService";
import { queryClient } from "../queryClient";

/**
 * Invitation loader. Used as a guard before entering the invitation route
 */
export const invitationLoader = async ({ params }: LoaderFunctionArgs) => {
    const { guestCode } = params;

    if (!guestCode) {
        return null;
    }

    const guestList = await queryClient.fetchQuery({
        queryKey: ["guestList"],
        queryFn: fetchGuestList,
    })
    
    const trimedCode = guestCode.trim();

    if (!guestList[trimedCode]) {
        return redirect("/invitation");
    }

    return trimedCode;
}