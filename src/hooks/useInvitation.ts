import type { Guest, ValidCode } from "../types/invitation.types";
import { useInvitationContext } from "../context/InvitationContext";
import { useNavigate } from "react-router-dom";


const useInvitation = () => {
    const { actionDispatch, ...rest } = useInvitationContext();
    const navigate = useNavigate();

    //TO-DO check if validcode is stored in the DB
    const validCodes: ValidCode = {
        "123abc": { id: 1, firstName: "Asger", lastName: "Thorsboe Lundblad" },
        "abc123": { id: 1, firstName: "Rikke", lastName: "Samsing Bendixen" },
    }

    const saveRSVP = (guest: Omit<Guest, "firstName" | "lastName">) => {
        if (rest.guest) {
            actionDispatch?.setGuestInfo({
                firstName: rest.guest.firstName,
                lastName: rest.guest.lastName,
                ...guest
            });
            actionDispatch?.setIsSubmittedState(true);
        } else {
            navigate("/invitation");
        }
    }

    const updatedRSVP = () => {
        actionDispatch?.setIsSubmittedState(false);
    }

    const saveCode = (code: string) => {
        localStorage.setItem("invitationCode", code);
    }

    const saveGuest = (guest: Pick<Guest, "firstName" | "lastName">) => {
        localStorage.setItem("guest", JSON.stringify(guest));
    }

    const clearGuest = () => {
        localStorage.removeItem("invitationCode");
        localStorage.removeItem("guest");
        actionDispatch?.removeCodeState();
    }

    return {
        validCodes,
        saveRSVP,
        updatedRSVP,
        saveCode,
        saveGuest,
        clearGuest,
        actionDispatch,
        ...rest
    };
}

export default useInvitation;