import z from "zod";
import { IconNameSchema } from "./utilsSchema";

export const ProgramSchema = z.object({
    icon: IconNameSchema,
    title: z.string(),
    description: z.string(),
    time: z.string(),
    location: z.string(),
});