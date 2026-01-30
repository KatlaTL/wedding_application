import type { GuestType } from "../types/invitationTypes";
import { useInvitationContext } from "../context/InvitationContext";
import { useNavigate } from "react-router-dom";
import { GUEST, INVITATION_CODE, RSVP_IS_SUBMITTED } from "../constants/localstorageKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchGuestList, updateGuestRSVP } from "../services/invitationService";
import { useState } from "react";
import { queryClient } from "../queryClient";

/**
 * Hook to handle invitation data logic
 */
const useInvitation = () => {
    const { actionDispatch, ...rest } = useInvitationContext();
    const navigate = useNavigate();
    const [isEnabled, setIsEnabled] = useState<boolean>(false);

    const { data: guestList = {}, isLoading: guestListIsLoading, refetch: refetchGuestList } = useQuery({
        queryKey: ["guestList"],
        queryFn: fetchGuestList,
        enabled: isEnabled
    })

    /**
     * The RSVP update mutation 
     */
    const updateRSVPMutation = useMutation({
        mutationFn: ({ RSVP }: { RSVP: Partial<GuestType> }) => {
            if (!rest.guestCode) throw new Error("Guest code is required");
            return updateGuestRSVP(rest.guestCode, RSVP);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["guestList"] });
        },
        onError: (err) => console.error(err)
    })

    /**
     * Set the guestList query property enabled to true or false \
     * Default is false.
     * @param value - boolean
     */
    const setGuestListQueryEnabled = (value: boolean) => setIsEnabled(value);

    /**
     * Save the response from the RSVP. \
     * Stores it in the InvitationContext reducer. \
     */
    const saveRSVP = (guest: Omit<GuestType, "firstName" | "lastName">) => {
        if (!rest.guest) {
            navigate("/invitation");
            return;
        }

        actionDispatch?.setGuestInfo({
            firstName: rest.guest.firstName,
            lastName: rest.guest.lastName,
            ...guest
        });

        actionDispatch?.setIsSubmittedState(true);
        localStorage.setItem(RSVP_IS_SUBMITTED, JSON.stringify({ isSubmitted: true }));
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
        guestListIsLoading,
        updateRSVPMutation,
        saveRSVP,
        updatedRSVP,
        saveGuestInfo,
        clearGuest,
        actionDispatch,
        setGuestListQueryEnabled,
        refetchGuestList,
        ...rest
    };
}

export default useInvitation;