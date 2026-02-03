import { queryClient } from "../queryClient";
import { fetchProgram } from "../services/programService";

/**
 * Program loader. Used to prefetch program data before entering the program route
 */
export const programLoader = async () => {

    queryClient.prefetchQuery({
        queryKey: ["program"],
        queryFn: fetchProgram,
    })

    return null;
}