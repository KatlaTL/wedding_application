import type { Guest, ValidCode } from "../types/invitationTypes";
import { useInvitationContext } from "../context/InvitationContext";
import { useNavigate } from "react-router-dom";

/**
 * Hook to handle invitation data logic
 */
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
            localStorage.setItem("RSVPIsSubmitted", JSON.stringify({ isSubmitted: true }));
        } else {
            navigate("/invitation");
        }
    }

    const updatedRSVP = () => {
        actionDispatch?.setIsSubmittedState(false);
        localStorage.removeItem("RSVPIsSubmitted");
    }

    const saveGuestInfo = (guest: Pick<Guest, "firstName" | "lastName">, code: string) => {
        localStorage.setItem("guest", JSON.stringify(guest));
        localStorage.setItem("invitationCode", code);

        actionDispatch?.setGuestInfo(guest);
        actionDispatch?.setCodeState(code);
    }

    const clearGuest = () => {
        localStorage.removeItem("invitationCode");
        localStorage.removeItem("guest");
        localStorage.removeItem("RSVPIsSubmitted");
        actionDispatch?.removeCodeState();
    }

    return {
        validCodes,
        saveRSVP,
        updatedRSVP,
        saveGuestInfo,
        clearGuest,
        actionDispatch,
        ...rest
    };
}

export default useInvitation;