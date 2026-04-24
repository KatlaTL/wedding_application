import * as LucideIcons from "lucide-react";
import type { IconKey } from "../lib/icons/iconMap";

export type IconName = keyof typeof LucideIcons;

export type SelectItemType = {
    name: string;
    iconKey: IconKey;
}