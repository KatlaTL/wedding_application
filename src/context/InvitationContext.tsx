import { createContext, useContext, useReducer, type PropsWithChildren } from "react";
import type { Guest, InvitationContextI, InvitationStateType, ReducerActionType } from "../types/invitationTypes";
import { GuestSchema, InvitationStateSchema } from "../schemas/invitationSchema";
import { safeParser } from "../utils/parser";
import * as z from "zod";
import { CLAIMED_CATEGORIES, GUEST, INVITATION_CODE, RSVP_IS_SUBMITTED } from "../constants/localstorageKeys";

const reducerInitialState: InvitationStateType = InvitationStateSchema.parse({
    isSubmitted: safeParser(
        localStorage.getItem(RSVP_IS_SUBMITTED),
        z.object({ isSubmitted: z.boolean() }),
        { isSubmitted: false }
    ).isSubmitted,
    code: localStorage.getItem(INVITATION_CODE),
    guest: safeParser(
        localStorage.getItem(GUEST),
        GuestSchema,
        null
    ),
    wishlistClaimedCategories: safeParser(
        localStorage.getItem(CLAIMED_CATEGORIES),
        z.array(z.string()),
        []
    )
});

const contextInitialState: InvitationContextI = {
    isSubmitted: reducerInitialState.isSubmitted,
    code: reducerInitialState.code,
    guest: reducerInitialState.guest,
    actionDispatch: null,
    wishlistClaimedCategories: reducerInitialState.wishlistClaimedCategories
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
        case "SET_WISHLIST_CLAIMED_CATEGORY":
            return {
                ...state,
                wishlistClaimedCategories: [...state.wishlistClaimedCategories, action.payload.category]
            }
        case "REMOVE_WISHLIST_CLAIMED_CATEGORY":
            return {
                ...state,
                wishlistClaimedCategories: state.wishlistClaimedCategories.filter(item => item !== action.payload.category)
            }
        case "RESET_WISHLIST_CLAIMED_CATEGORIES":
            return {
                ...state,
                wishlistClaimedCategories: []
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
        setWishlistClamiedCategory: (category: string) => {
            dispatch({
                type: "SET_WISHLIST_CLAIMED_CATEGORY",
                payload: {
                    category
                }
            })
        },
        removeWishlistClamiedCategory: (category: string) => {
            dispatch({
                type: "REMOVE_WISHLIST_CLAIMED_CATEGORY",
                payload: {
                    category
                }
            })
        },
        resetWishlistClamiedCategories: () => {
            dispatch({
                type: "RESET_WISHLIST_CLAIMED_CATEGORIES"
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
            wishlistClaimedCategories: state.wishlistClaimedCategories
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