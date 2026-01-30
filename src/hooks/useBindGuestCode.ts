import { useMutation } from "@tanstack/react-query";
import { bindGuestCode, unbindGuest } from "../services/invitationService";
import { queryClient } from "../queryClient";


const useBindGuestCode = () => {

    /**
     * Mutation function to bind the guest code to the anonymously signed in user 
     */
    const bindGuestCodeMutation = useMutation({
        mutationFn: ({ guestCode }: { guestCode: string }) => bindGuestCode(guestCode),
        onError: (err) => {
            console.error("Failed to bind guest code:", err);
            throw err;
        }
    })

    /**
     * Mutation function to unbind the guest code from the anonymously signed in user 
     */
    const unBindGuestCodeMutation = useMutation({
        mutationFn: ({}: {}) => unbindGuest(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guestList"] });
        },
        onError: (err) => {
            console.error("Failed to unbind guest code:", err);
            throw err;
        }
    })

    return {
        bindGuestCodeMutation,
        unBindGuestCodeMutation
    }
}

export default useBindGuestCode;