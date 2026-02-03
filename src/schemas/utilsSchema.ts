import z from "zod";
import type { IconName } from "../types/utilsTypes";
import * as LucideIcons from "lucide-react";

export const IconNameSchema = z.enum(Object.keys(LucideIcons) as IconName[]);