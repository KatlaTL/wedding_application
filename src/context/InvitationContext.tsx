import { createContext, useContext, useReducer, type PropsWithChildren } from "react";
import type { InvitationContextI, InvitationStateType, ReducerActionType } from "../types/invitation.types";

const reducerInitialState: InvitationStateType = {
    isSubmitted: false,
    code: localStorage.getItem("invitationCode"),
    guest: null
};

const contextInitialState: InvitationContextI = {
    isSubmitted: reducerInitialState.isSubmitted,
    code: reducerInitialState.code,
    guest: reducerInitialState.guest,
    actionDispatch: null
}

const InvitationContext = createContext<InvitationContextI>(contextInitialState);


const invitationProducer = (state: InvitationStateType, action: ReducerActionType): InvitationStateType => {
    switch (action.type) {
        case "SET_CODE":
            return {
                ...state,
                code: action.payload.code
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

export const useInvitationContext = () => {
    const context = useContext(InvitationContext);
    if (context === undefined) {
        throw new Error('useInvitationContext must be used within a LoadingProvider');
    }
    return context;
};