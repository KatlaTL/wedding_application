import { useQuery } from "@tanstack/react-query"
import { fetchAdminGuestList } from "../services/adminService"

const useAdmin = () => {
     const { data: guestList = [], isLoading: guestListIsLoading, refetch: refetchGuestList } = useQuery({
        queryKey: ["adminGuestList"],
        queryFn: fetchAdminGuestList,
    })

    return {
        guestList,
        guestListIsLoading,
        refetchGuestList
    }
}

export default useAdmin;