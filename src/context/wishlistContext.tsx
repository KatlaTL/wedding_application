import z from "zod";
import { CLAIMED_CATEGORIES } from "../constants/localstorageKeys";
import { WishlistStateSchema } from "../schemas/wishlistSchema";
import type {  WishlistContextI, WishlistReducerActionType, WishlistStateType } from "../types/wishlistTypes";
import { safeParser } from "../utils/parser";
import { createContext, useContext, useReducer, type PropsWithChildren } from "react";


const reducerInitialState: WishlistStateType = WishlistStateSchema.parse({
    claimedCategories: safeParser(
        localStorage.getItem(CLAIMED_CATEGORIES),
        z.array(z.string()),
        []
    ),
    categories: []
});

const contextInitialState: WishlistContextI = {
    actionDispatch: null,
    claimedCategories: reducerInitialState.claimedCategories,
    categories: []
};

const WishlistContext = createContext<WishlistContextI>(contextInitialState);

/**
 * The producer used to handle the state logic for the wishlist useReducer
 */
const wishlistProducer = (state: WishlistStateType, action: WishlistReducerActionType): WishlistStateType => {
    switch (action.type) {
        case "SET_CATEGORIES":
            return {
                ...state,
                categories: [...action.payload.categories]
            }
        case "SET_CLAIMED_CATEGORY":
            return {
                ...state,
                claimedCategories: [...state.claimedCategories, action.payload.category]
            }
        case "REMOVE_CLAIMED_CATEGORY":
            return {
                ...state,
                claimedCategories: state.claimedCategories.filter(item => item !== action.payload.category)
            }
        case "RESET_CLAIMED_CATEGORIES":
            return {
                ...state,
                claimedCategories: []
            }
    }
}

/**
 * Wishlist context provider
 * @returns Context provider
 */
export const WishlistProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(wishlistProducer, reducerInitialState);

    /**
     * Contains all dispatch functions to update the reducer state
     */
    const actionDispatch = {
        setClamiedCategory: (category: string) => {
            dispatch({
                type: "SET_CLAIMED_CATEGORY",
                payload: {
                    category
                }
            })
        },
        removeClamiedCategory: (category: string) => {
            dispatch({
                type: "REMOVE_CLAIMED_CATEGORY",
                payload: {
                    category
                }
            })
        },
        resetClamiedCategories: () => {
            dispatch({
                type: "RESET_CLAIMED_CATEGORIES"
            })
        }
    } as WishlistContextI["actionDispatch"]


    return (
        <WishlistContext.Provider value={{
            actionDispatch,
            claimedCategories: state.claimedCategories,
            categories: state.categories
        }}>
            {children}
        </WishlistContext.Provider>
    )
}

/**
 * Hook which checks if the invitation context is defined
 * @returns Invitation context
 */
export const useWishlistContext = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useInvitationContext must be used within a LoadingProvider');
    }
    return context;
};