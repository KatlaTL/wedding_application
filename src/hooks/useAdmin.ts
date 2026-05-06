import { useMutation, useQuery } from "@tanstack/react-query"
import { addGuest, deleteGuest, fetchAdminGuestList, updateGuest, updateGuestAttendance } from "../services/guestService"
import { queryClient } from "../queryClient";
import type { GuestType } from "../types/invitationTypes";
import { fillGuest } from "../utils/fillGuestObject";
import type { AdminDietaryAndAllergiesType } from "../types/adminTypes";

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

    /**
     * The update guest mutation 
     */
    const updateGuestMutation = useMutation({
        mutationFn: ({ guest, guestCode }: { guest: GuestType, guestCode: string }) => {
            if (!guestCode) throw new Error("Guest code is required");
            return updateGuest(guest, guestCode);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminGuestList"] }),
        onError: (err) => console.error(err)
    })

    /**
     * The add new guest mutation
     */
    const addGuestMutation = useMutation({
        mutationFn: ({ guest }: { guest: GuestType }) => addGuest(fillGuest(guest)),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminGuestList"] }),
        onError: (err) => console.error(err)
    })

    /**
     * The delete guest mutation
     */
    const deleteGuestMutation = useMutation({
        mutationFn: ({ guestCode }: { guestCode: string }) => deleteGuest(guestCode),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminGuestList"] }),
        onError: (err) => console.error(err)
    })

    const dietaryOverview = guestList.reduce((acc: AdminDietaryAndAllergiesType, current) => {
        if (current.dietary) {
            acc[current.dietary]++;
        }

        if (current.allergies) {
            acc.allergies = [...acc.allergies, { [current.fullName]: current.allergies }];
        }

        return acc;
    }, {
        Omnivore: 0,
        Vegan: 0,
        Vegetarian: 0,
        allergies: []
    });

    return {
        guestList,
        guestListIsLoading,
        refetchGuestList,
        addGuestMutation,
        updateGuestAttendanceMutation,
        deleteGuestMutation,
        dietaryOverview,
        updateGuestMutation
    }
}

export default useAdmin;