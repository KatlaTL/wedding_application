import * as LucideIcons from "lucide-react";
import type { IconName } from "../types/utilsTypes";

type LucideIcon = React.ForwardRefExoticComponent<Omit<LucideIcons.LucideProps, "ref">>;

const FALLBACK_ICON: LucideIcon = LucideIcons.HelpCircle;

export const mapIcons = (icon: IconName): LucideIcon => {
    const Icon = LucideIcons[icon as keyof typeof LucideIcons];

    return (Icon ?? FALLBACK_ICON) as LucideIcon;
};