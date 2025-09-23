import type { ValidCode } from "../types/invitation.types";
import { useInvitationContext } from "../context/InvitationContext";


const useInvitation = () => {
    const { actionDispatch, ...rest } = useInvitationContext();

    //TO-DO check if validcode is stored in the DB
    const validCodes: ValidCode = {
        "123abc": { id: 1, name: "Asger" },
        "abc123": { id: 1, name: "Rikke" },
    }

    const saveRSVP = () => {
        actionDispatch?.setIsSubmittedState(true);
    }

    const updatedRSVP = () => {
        actionDispatch?.setIsSubmittedState(false);
    }

    return {
        validCodes,
        saveRSVP,
        updatedRSVP,
        actionDispatch,
        ...rest
    };
}

export default useInvitation;