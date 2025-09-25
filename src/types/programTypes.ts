import type { LucideProps } from "lucide-react";

export type ProgramType = {
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
    title: string;
    description: string;
    location: string;
    time: string;
} 