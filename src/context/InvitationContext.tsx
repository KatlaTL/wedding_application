import { createContext, useContext, useReducer, type PropsWithChildren } from "react";
import type { Guest, InvitationContextI, InvitationStateType, ReducerActionType } from "../types/invitationTypes";
import { GuestSchema, InvitationStateSchema } from "../schemas/invitationSchema";
import { safeParser } from "../utils/parser";
import * as z from "zod";

const reducerInitialState: InvitationStateType = InvitationStateSchema.parse({
    isSubmitted: safeParser(
        localStorage.getItem("RSVPIsSubmitted"),
        z.object({ isSubmitted: z.boolean() }),
        { isSubmitted: false }
    ).isSubmitted,
    code: localStorage.getItem("invitationCode"),
    guest: safeParser(
        localStorage.getItem("guest"),
        GuestSchema,
        null
    )
});

const contextInitialState: InvitationContextI = {
    isSubmitted: reducerInitialState.isSubmitted,
    code: reducerInitialState.code,
    guest: reducerInitialState.guest,
    actionDispatch: null
};

const InvitationContext = createContext<InvitationContextI>(contextInitialState);

/**
 * The producer used to handle the state logic for the invitation useReducer
 */
const invitationProducer = (state: InvitationStateType, action: ReducerActionType): InvitationStateType => {
    switch (action.type) {
        case "SET_CODE":
            return {
                ...state,
                code: action.payload.code
            }
        case "REMOVE_CODE":
            return {
                ...state,
                code: null
            }
        case "SET_GUEST":
            return {
                ...state,
                guest: action.payload.guest
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
        removeCodeState: () => {
            dispatch({
                type: "REMOVE_CODE"
            })
        },
        setGuestInfo: (guest: Guest) => {
            dispatch({
                type: "SET_GUEST",
                payload: {
                    guest
                }
            })
        }
    } as InvitationContextI["actionDispatch"]

    return (
        <InvitationContext.Provider value={{
            actionDispatch: actionDispatch,
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