import { useMutation, useQuery } from "@tanstack/react-query"
import { addGuest, deleteGuest, fetchAdminGuestList, updateGuestAttendance } from "../services/guestService"
import { queryClient } from "../queryClient";
import type { GuestType } from "../types/invitationTypes";
import { fillGuest } from "../utils/fillGuestObject";

const useAdmin = () => {
    const { data: guestList = [], isLoading: guestListIsLoading, refetch: refetchGuestList } = useQuery({
        queryKey: ["adminGuestList"],
        queryFn: fetchAdminGuestList,
    })

    /**
     * The Guest attendance update mutation 
     */
    const updateGuestAttendanceMutation = useMutation({
        mutationFn: ({ isAttending, guestCode }: { isAttending: boolean, guestCode: string }) => {
            if (!guestCode) throw new Error("Guest code is required");
            return updateGuestAttendance(guestCode, isAttending);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminGuestList"] }),
        onError: (err) => console.error(err)
    })

    const addGuestMutation = useMutation({
        mutationFn: ({ guest }: { guest: GuestType }) => addGuest(fillGuest(guest)),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminGuestList"] }),
        onError: (err) => console.error(err)
    })

    const deleteGuestMutation = useMutation({
        mutationFn: ({ guestCode }: { guestCode: string }) => deleteGuest(guestCode),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminGuestList"] }),
        onError: (err) => console.error(err)
    })

    return {
        guestList,
        guestListIsLoading,
        refetchGuestList,
        addGuestMutation,
        updateGuestAttendanceMutation,
        deleteGuestMutation
    }
}

export default useAdmin;