import type { LucideProps } from "lucide-react";
import type { DietaryType } from "./invitationTypes";

export type Tabs = "Gæster" | "Program" | "Lokationer" | "Ønskeliste";

export type TabsType = {
    title: Tabs;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
    tabComponent: React.ComponentType
}

export type AdminGuestType = {
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    invitationCode: string;
    isAttending: boolean;
    dietary?: DietaryType | null;
    allergies?: string | null;
}

export type AdminGuestListType = AdminGuestType[];

export type AdminTabContentProps = {
    activeTab: number,
    previousTab: number
}

export type AdminEventType = {
    time: string;
    title: string;
    description: string;
    lokation: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">> | undefined;
}

const adminGuestModalKeys = [
    "firstName",
    "lastName",
    "email",
    "invitationCode",
    "dietary",
    "allergies",
] as const;

export type AdminGuestModalKey = typeof adminGuestModalKeys[number];

export const isAdminGuestModalKey = (key: PropertyKey): key is AdminGuestModalKey => {
    return adminGuestModalKeys.includes(key as AdminGuestModalKey);
}

export type AdminGuestModalType = {
    firstName: string;
    lastName: string;
    email: string;
    invitationCode: string;
    dietary: DietaryType | undefined;
    allergies: string;
}

export type AdminDietaryAndAllergiesType =
    Record<DietaryType, number> &
    {
        allergies: {
            [key: string]: string;
        }[];
    }