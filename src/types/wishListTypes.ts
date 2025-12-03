import type { LucideProps } from "lucide-react";

export type PriorityType = "Essential" | "Nice to Have" | "Dream Gift";

export type PriorityTileType = {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
    title: PriorityType;
    description: string;
}

export type CategoryTileType = {
    title: string;
    description: string;
    priority: PriorityType;
    showPriority?: boolean;
}

export type CategoryType = {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
    title: string;
    description: string;
    items: CategoryTileType[];
}

export type CategorySectionType = {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
    title: string;
    description: string;
}