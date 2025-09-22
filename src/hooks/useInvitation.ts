import type { ValidCode } from "../types/invitation.types";


const useInvitation = () => {
    const validCodes: ValidCode = {
        "123abc": { id: 1, name: "Asger" },
        "abc123": { id: 1, name: "Rikke" },
    }


    return {
        validCodes
    };
}

export default useInvitation;