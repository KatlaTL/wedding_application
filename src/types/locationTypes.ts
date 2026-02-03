import type z from "zod";
import type { LocationSchema } from "../schemas/locationSchema";

export type LocationType = z.infer<typeof LocationSchema>;