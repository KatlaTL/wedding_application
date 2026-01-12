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
    ),
    wishlistCategoriesClaimed: []
});

const contextInitialState: InvitationContextI = {
    isSubmitted: reducerInitialState.isSubmitted,
    code: reducerInitialState.code,
    guest: reducerInitialState.guest,
    actionDispatch: null,
    wishlistCategoriesClaimed: reducerInitialState.wishlistCategoriesClaimed
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
        case "SET_WISHLIST_CATEGORIES_CLAIMED":
            return {
                ...state,
                wishlistCategoriesClaimed: [...state.wishlistCategoriesClaimed, action.payload.category]
            }
        case "RESET_WISHLIST_CATEGORIES_CLAIMED":
            return {
                ...state,
                wishlistCategoriesClaimed: []
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
        setWishlistCategoriesClamied: (category: string) => {
            dispatch({
                type: "SET_WISHLIST_CATEGORIES_CLAIMED",
                payload: {
                    category
                }
            })
        },
        resetWishlistCategoriesClamied: () => {
            dispatch({
                type: "RESET_WISHLIST_CATEGORIES_CLAIMED"
            })
        }
    } as InvitationContextI["actionDispatch"]

    if (actionDispatch) {
        actionDispatch.resetAll = () => {
            (Object.keys(actionDispatch) as Array<keyof typeof actionDispatch>).forEach((key) => {
                if (key.startsWith("reset")) {
                    const fn = actionDispatch[key];
                    
                    if (typeof fn === "function") {
                        (fn as () => void)() // assert TS fn has no parameters
                    }
                }
            })
        }
    }   

    return (
        <InvitationContext.Provider value={{
            actionDispatch,
            isSubmitted: state.isSubmitted,
            code: state.code,
            guest: state.guest,
            wishlistCategoriesClaimed: state.wishlistCategoriesClaimed
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