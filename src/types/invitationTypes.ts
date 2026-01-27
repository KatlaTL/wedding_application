import * as z from "zod";
import type { DietarySchema, GuestSchema, InvitationStateSchema } from "../schemas/invitationSchema";

export type validCodeEntry = {
    id: number;
    firstName: string;
    lastName: string;
}

export type ValidCode = Record<string, validCodeEntry>;

export type DietaryType = z.infer<typeof DietarySchema>

export type Guest = z.infer<typeof GuestSchema>;

export type InvitationStateType = z.infer<typeof InvitationStateSchema>;
export interface InvitationContextI extends InvitationStateType {
    actionDispatch: {
        setIsSubmittedState: (isSubmitted: boolean) => void;
        setGuestCodeState: (guestCode: string) => void;
        resetGuestCodeState: () => void;
        setGuestInfo: (guest: Guest) => void;
        resetGuestInfoState: () => void;
        setWishlistClamiedCategory: (category: string) => void;
        removeWishlistClamiedCategory: (category: string) => void;
        resetWishlistClamiedCategories: () => void;
        resetAll: () => void;
    } | null;
}

export const InvitationActionTypes = {
    SET_GUEST_CODE: "SET_GUEST_CODE",
    RESET_GUEST_CODE: "RESET_GUEST_CODE",
    SET_IS_SUBMITTED: "SET_IS_SUBMITTED",
    SET_GUEST: "SET_GUEST",
    RESET_GUEST: "RESET_GUEST",
} as const;

export type InvitationActionTypes = typeof InvitationActionTypes[keyof typeof InvitationActionTypes];

export type InvitationReducerActionType =
    { type: typeof InvitationActionTypes.SET_GUEST_CODE, payload: { guestCode: string } } |
    { type: typeof InvitationActionTypes.RESET_GUEST_CODE } |
    { type: typeof InvitationActionTypes.SET_IS_SUBMITTED, payload: { isSubmitted: boolean } } |
    { type: typeof InvitationActionTypes.SET_GUEST, payload: { guest: Guest } } |
    { type: typeof InvitationActionTypes.RESET_GUEST }