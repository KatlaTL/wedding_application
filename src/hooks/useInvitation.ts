import type { GuestType } from "../types/invitationTypes";
import { useInvitationContext } from "../context/InvitationContext";
import { useNavigate } from "react-router-dom";
import { GUEST, INVITATION_CODE, RSVP_IS_SUBMITTED } from "../constants/localstorageKeys";
import { useQuery } from "@tanstack/react-query";
import { fetchGuestList } from "../services/invitationService";

/**
 * Hook to handle invitation data logic
 */
const useInvitation = () => {
    const { actionDispatch, ...rest } = useInvitationContext();
    const navigate = useNavigate();

    const { data: guestList = {}, isLoading } = useQuery({
        queryKey: ["guestList"],
        queryFn: fetchGuestList,
    })

    /**
     * Save the response from the RSVP. \
     * Stores it in the InvitationContext reducer. \
     * TO-DO save it in DB
     */
    const saveRSVP = (guest: Omit<GuestType, "firstName" | "lastName">) => {
        if (rest.guest) {
            actionDispatch?.setGuestInfo({
                firstName: rest.guest.firstName,
                lastName: rest.guest.lastName,
                ...guest
            });

            actionDispatch?.setIsSubmittedState(true);
            localStorage.setItem(RSVP_IS_SUBMITTED, JSON.stringify({ isSubmitted: true }));
        } else {
            navigate("/invitation");
        }
    }

    /**
     * Allows the RSVP to be updated
     */
    const updatedRSVP = () => {
        actionDispatch?.setIsSubmittedState(false);
        localStorage.removeItem(RSVP_IS_SUBMITTED);
    }

    /**
     * Saves the guest info in the InvitationContext reducer and localstorage
     */
    const saveGuestInfo = (guest: Pick<GuestType, "firstName" | "lastName">, guestCode: string) => {
        localStorage.setItem(GUEST, JSON.stringify(guest));
        localStorage.setItem(INVITATION_CODE, guestCode);

        actionDispatch?.setGuestInfo(guest);
        actionDispatch?.setGuestCodeState(guestCode);
    }

    /**
     * Clears the guest data
     */
    const clearGuest = () => {
        localStorage.removeItem(INVITATION_CODE);
        localStorage.removeItem(GUEST);
        localStorage.removeItem(RSVP_IS_SUBMITTED);
        actionDispatch?.resetAll();
        actionDispatch?.setIsSubmittedState(false);
    }

    return {
        guestList,
        isLoading,
        saveRSVP,
        updatedRSVP,
        saveGuestInfo,
        clearGuest,
        actionDispatch,
        ...rest
    };
}

export default useInvitation;