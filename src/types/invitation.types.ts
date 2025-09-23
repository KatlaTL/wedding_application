import type { Dispatch } from "react";

export type validCodeEntry = {
    id: number;
    name: string
}

export type ValidCode = Record<string, validCodeEntry>;

export type InvitationStateType = {
    isSubmitted: boolean;
};
export interface InvitationContextI extends InvitationStateType {
    setIsSubmitted: Dispatch<React.SetStateAction<boolean>>;
}