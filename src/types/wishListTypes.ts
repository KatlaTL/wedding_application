import type { LucideProps } from "lucide-react";


export type CategoryTileType = {
    title: string;
    description: string;
    link?: string;
}

export type CategorySectionType = {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
    title: string;
    description: string;
    totalClaimed: number;
}

export type CategoryType = CategorySectionType & {
    items: CategoryTileType[];
}