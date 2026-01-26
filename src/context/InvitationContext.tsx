import { createContext, useContext, useReducer, type PropsWithChildren } from "react";
import type { Guest, InvitationContextI, InvitationReducerActionType, InvitationStateType } from "../types/invitationTypes";
import { GuestSchema, InvitationStateSchema } from "../schemas/invitationSchema";
import { safeParserZod } from "../utils/parser";
import * as z from "zod";
import { GUEST, INVITATION_CODE, RSVP_IS_SUBMITTED } from "../constants/localstorageKeys";

const reducerInitialState: InvitationStateType = InvitationStateSchema.parse({
    isSubmitted: safeParserZod(
        localStorage.getItem(RSVP_IS_SUBMITTED),
        z.object({ isSubmitted: z.boolean() }),
        { isSubmitted: false }
    ).isSubmitted,
    code: localStorage.getItem(INVITATION_CODE),
    guest: safeParserZod(
        localStorage.getItem(GUEST),
        GuestSchema,
        null
    )
});

const contextInitialState: InvitationContextI = {
    isSubmitted: reducerInitialState.isSubmitted,
    code: reducerInitialState.code,
    guest: reducerInitialState.guest,
    actionDispatch: null,
};

const InvitationContext = createContext<InvitationContextI>(contextInitialState);

/**
 * The producer used to handle the state logic for the invitation useReducer
 */
const invitationProducer = (state: InvitationStateType, action: InvitationReducerActionType): InvitationStateType => {
    switch (action.type) {
        case "SET_CODE":
            return {
                ...state,
                code: action.payload.code
            }
        case "RESET_CODE":
            return {
                ...state,
                code: null
            }
        case "SET_GUEST":
            return {
                ...state,
                guest: action.payload.guest
            }
        case "RESET_GUEST":
            return {
                ...state,
                guest: null
            }
        case "SET_IS_SUBMITTED":
            return {
                ...state,
                isSubmitted: action.payload.isSubmitted
            }
    }
}

/**
 * Invitation context provider
 * @returns Context provider
 */
export const InvitationProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(invitationProducer, reducerInitialState);

    /**
     * Contains all dispatch functions to update the reducer state
     */
    const actionDispatch = {
        setIsSubmittedState: (isSubmitted: boolean) => {
            dispatch({
                type: "SET_IS_SUBMITTED",
                payload: {
                    isSubmitted
                }
            })
        },
        setCodeState: (code: string) => {
            dispatch({
                type: "SET_CODE",
                payload: {
                    code
                }
            })
        },
        resetCodeState: () => {
            dispatch({
                type: "RESET_CODE"
            })
        },
        setGuestInfo: (guest: Guest) => {
            dispatch({
                type: "SET_GUEST",
                payload: {
                    guest
                }
            })
        },
        resetGuestInfoState: () => {
            dispatch({
                type: "RESET_GUEST"
            })
        },
    } as InvitationContextI["actionDispatch"]

    if (actionDispatch) {
        actionDispatch.resetAll = () => {
            for (const [key, fn] of Object.entries(actionDispatch)) {
                if (
                    key.startsWith("reset") &&
                    key !== "resetAll" &&
                    typeof fn === "function" && 
                    fn.length === 0
                ) {
                    (fn as () => void)();
                }
            }
        }
    }

    return (
        <InvitationContext.Provider value={{
            actionDispatch,
            isSubmitted: state.isSubmitted,
            code: state.code,
            guest: state.guest
        }}>
            {children}
        </InvitationContext.Provider>
    )
}

/**
 * Hook which checks if the invitation context is defined
 * @returns Invitation context
 */
export const useInvitationContext = () => {
    const context = useContext(InvitationContext);
    if (context === undefined) {
        throw new Error('useInvitationContext must be used within a LoadingProvider');
    }
    return context;
};