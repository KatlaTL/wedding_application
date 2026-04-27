import type { GuestType } from "../types/invitationTypes";

// 1. Create a "template" with all keys
const guestDefaults: Required<GuestType> = {
    firstName: undefined as any,
    lastName: undefined as any,
    email: undefined as any,
    isAttending: null,
    needLift: null,
    canOfferLift: null,
    dietary: null,
    allergies: null,
};

// 2. Merge function
export const fillGuest = (partial: Partial<GuestType>): GuestType => {
    return { ...guestDefaults, ...partial };
}