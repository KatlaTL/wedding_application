import type { LucideProps } from "lucide-react";
import type { ProgramSchema } from "../schemas/programSchema";
import type z from "zod";

export type DBProgramType = z.infer<typeof ProgramSchema>;

export type ProgramType = Omit<DBProgramType, "icon"> & {
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
} 