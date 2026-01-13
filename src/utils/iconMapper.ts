import * as LucideIcons from "lucide-react";
import type { IconName } from "../types/utilsTypes";

export const mapIcons = (icon: IconName): React.ForwardRefExoticComponent<Omit<LucideIcons.LucideProps, "ref">> => {
    return LucideIcons[icon] as React.ForwardRefExoticComponent<Omit<LucideIcons.LucideProps, "ref">>
}