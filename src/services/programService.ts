import { collection, getDocs } from "firebase/firestore";
import type { DBProgramType } from "../types/programTypes";
import { db } from "./firebase";
import { ProgramSchema } from "../schemas/programSchema";

const programRef = collection(db, "program");

/**
 * Fetches the program
 * @returns array of program items as DBProgramType
 */
export const fetchProgram = async (): Promise<DBProgramType[]> => {
    const snapshot = await getDocs(programRef);

    return snapshot.docs.map(doc => {
        const parsed = ProgramSchema.safeParse(doc.data());

        if (!parsed.success) {
            console.error("Invalid program data in Firestore", parsed.error);
            return null;
        }
        return parsed.data
    }).filter((item): item is DBProgramType => item !== null);
}