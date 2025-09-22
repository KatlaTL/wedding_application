import type { ValidCode } from "../types/invitation.types";
import { useInvitationContext } from "../context/InvitationContext";


const useInvitation = () => {
    const { isSubmitted, setIsSubmitted } = useInvitationContext();

    //TO-DO add validCodes to the invitationContext
    const validCodes: ValidCode = {
        "123abc": { id: 1, name: "Asger" },
        "abc123": { id: 1, name: "Rikke" },
    }

    const saveRSVP = () => {
        setIsSubmitted(true);
    }

    const updatedRSVP = () => {
        setIsSubmitted(false);
    }

    return {
        validCodes,
        saveRSVP,
        updatedRSVP,
        isSubmitted
    };
}

export default useInvitation;