import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import type { ValidCode } from "../types/invitation.types";

export const invitationLoader = ({ params }: LoaderFunctionArgs) => {
    const { code } = params;

    if (!code) {
        return null;
    }

    // TO-DO get valid code from backend
    const validCodes: ValidCode = {
        "123abc": { id: 1, firstName: "Asger", lastName: "Thorsboe Lundblad" },
        "abc123": { id: 1, firstName: "Rikke", lastName: "Samsing Bendixen" },
    }

    const trimedCode = code.trim();

    if (!validCodes[trimedCode]) {
        return redirect("/invitation");
    }

    return trimedCode;
}