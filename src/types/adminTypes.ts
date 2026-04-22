import type { LucideProps } from "lucide-react";

export type Tabs = "Gæster" | "Program" | "Lokationer" | "Ønskeliste";

export type TabsType = {
    title: Tabs;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
}

export type AdminGuestType = {
    name: string;
    email: string;
    invitationCode: string;
}

export type AdminGuestListType = AdminGuestType[];