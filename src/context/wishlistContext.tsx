import { CLAIMED_CATEGORIES } from "../constants/localstorageKeys";
import { ClaimedCategories, WishlistStateSchema } from "../schemas/wishlistSchema";
import type { WishlistContextI, WishlistReducerActionType, WishlistStateType } from "../types/wishlistTypes";
import { safeParser } from "../utils/parser";
import { createContext, useContext, useReducer, type PropsWithChildren } from "react";


const reducerInitialState: WishlistStateType = WishlistStateSchema.parse({
    claimedCategories: safeParser(
        localStorage.getItem(CLAIMED_CATEGORIES),
        ClaimedCategories,
        []
    )
});

const contextInitialState: WishlistContextI = {
    actionDispatch: null,
    claimedCategories: reducerInitialState.claimedCategories
};

const WishlistContext = createContext<WishlistContextI>(contextInitialState);

/**
 * The producer used to handle the state logic for the wishlist useReducer
 */
const wishlistProducer = (state: WishlistStateType, action: WishlistReducerActionType): WishlistStateType => {
    switch (action.type) {
        case "SET_CLAIMED_CATEGORY":
            const existing = state.claimedCategories.find(
                cat => cat.categoryTitle === action.payload.category
            );

            if (existing) {
                return {
                    ...state,
                    claimedCategories: state.claimedCategories.map(cat => {
                        if (cat.categoryTitle === action.payload.category) {
                            return {
                                ...cat,
                                claims: [
                                    ...cat.claims,
                                    {
                                        guestCode: action.payload.guestCode,
                                        claimId: action.payload.claimId
                                    }
                                ]
                            }
                        }

                        return cat;
                    })
                }
            }

            return {
                ...state,
                claimedCategories: [...state.claimedCategories, {
                    categoryTitle: action.payload.category,
                    claims: [{
                        guestCode: action.payload.guestCode,
                        claimId: action.payload.claimId
                    }]
                }]
            }
        case "REMOVE_CLAIMED_CATEGORY":
            return {
                ...state,
                claimedCategories: state.claimedCategories.filter(item => item.categoryTitle !== action.payload.category)
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
        setClaimedCategory: (category: string, guestCode: string, claimId: string) => {
            dispatch({
                type: "SET_CLAIMED_CATEGORY",
                payload: {
                    category,
                    guestCode,
                    claimId
                }
            })
        },
        removeClaimedCategory: (category: string) => {
            dispatch({
                type: "REMOVE_CLAIMED_CATEGORY",
                payload: {
                    category
                }
            })
        },
        resetClaimedCategories: () => {
            dispatch({
                type: "RESET_CLAIMED_CATEGORIES"
            })
        }
    } as WishlistContextI["actionDispatch"]


    return (
        <WishlistContext.Provider value={{
            actionDispatch,
            claimedCategories: state.claimedCategories
        }}>
            {children}
        </WishlistContext.Provider>
    )
}

/**
 * Hook which checks if the Wishlist context is defined
 * @returns Wishlist context
 */
export const useWishlistContext = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlistContext must be used within a LoadingProvider');
    }
    return context;
};