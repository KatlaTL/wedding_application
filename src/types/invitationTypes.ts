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
        setCodeState: (code: string) => void;
        resetCodeState: () => void;
        setGuestInfo: (guest: Guest) => void;
        resetGuestInfoState: () => void;
    } | null;
}

export const ActionTypes = {
  SET_CODE: "SET_CODE",
  RESET_CODE: "RESET_CODE",
  SET_IS_SUBMITTED: "SET_IS_SUBMITTED",
  SET_GUEST: "SET_GUEST",
  RESET_GUEST: "RESET_GUEST",
} as const;

export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];

export type ReducerActionType =
    { type: typeof ActionTypes.SET_CODE, payload: { code: string } } |
    { type: typeof ActionTypes.RESET_CODE } |
    { type: typeof ActionTypes.SET_IS_SUBMITTED, payload: { isSubmitted: boolean } } |
    { type: typeof ActionTypes.SET_GUEST, payload: { guest: Guest } } |
    { type: typeof ActionTypes.RESET_GUEST } 