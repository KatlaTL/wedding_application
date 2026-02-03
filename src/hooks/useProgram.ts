import { fetchProgram } from "../services/programService";
import { useQuery } from "@tanstack/react-query";
import type { DBProgramType, ProgramType } from "../types/programTypes";
import { useMemo } from "react";
import { mapIcons } from "../utils/iconMapper";

/**
 * Hook to handle program data logic
 */
const useProgram = () => {

    const { data: dbProgram = [], isLoading } = useQuery({
        queryKey: ["program"],
        queryFn: fetchProgram,
    })

    /**
    * Maps DBProgramType to ProgramType
    */
    const program: ProgramType[] = useMemo(() => dbProgram.map((category: DBProgramType): ProgramType => {
        return {
            ...category,
            icon: mapIcons(category.icon)
        }
    }), [dbProgram]);

    return { program, isLoading };

}

export default useProgram;