import type { Dispatch } from "react";

export type validCodeEntry = {
    id: number;
    name: string
}

export type ValidCode = Record<string, validCodeEntry>;

export type DietaryType = "Vegan" | "Vegetarian" | "Omnivore";

export type Guest = {
    firstName: string;
    lastName: string;
    isAttending: boolean | undefined;
    needLift: boolean | undefined;
    canOfferLift: boolean | undefined;
    dietary: DietaryType | undefined;
    allergies: string | undefined;
}

export type InvitationStateType = {
    isSubmitted: boolean;
    code: string | null;
    guest: Guest | null
};
export interface InvitationContextI extends InvitationStateType {
    actionDispatch: {
        setIsSubmittedState: (isSubmitted: boolean) => void;
        setCodeState: (code: string) => void;
        removeCodeState: () => void;
    } | null;
}

export const ActionTypes = {
  SET_CODE: "SET_CODE",
  REMOVE_CODE: "REMOVE_CODE",
  SET_IS_SUBMITTED: "SET_IS_SUBMITTED",
  SET_GUEST: "SET_GUEST",
} as const;

export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];

export type ReducerActionType =
    { type: typeof ActionTypes.SET_CODE, payload: { code: string } } |
    { type: typeof ActionTypes.REMOVE_CODE } |
    { type: typeof ActionTypes.SET_IS_SUBMITTED, payload: { isSubmitted: boolean } } |
    { type: typeof ActionTypes.SET_GUEST, payload: { guest: Guest } } 