import { CLAIMED_CATEGORIES } from "../constants/localstorageKeys";
import { WishlistClaimedCategoriesSchema, WishlistStateSchema } from "../schemas/wishlistSchema";
import type {  WishlistContextI, WishlistReducerActionType, WishlistStateType } from "../types/wishlistTypes";
import { safeParserZod } from "../utils/parser";
import { createContext, useContext, useReducer, type PropsWithChildren } from "react";
import { removeClaimedCategory, upsertClaimedCategory } from "../utils/wishlist/claimedCategories";


const reducerInitialState: WishlistStateType = WishlistStateSchema.parse({
    wishlistClaimedCategories: safeParserZod(
        localStorage.getItem(CLAIMED_CATEGORIES),
        WishlistClaimedCategoriesSchema,
        []
    )
});

const contextInitialState: WishlistContextI = {
    actionDispatch: null,
    wishlistClaimedCategories: reducerInitialState.wishlistClaimedCategories,
};

const WishlistContext = createContext<WishlistContextI>(contextInitialState);

/**
 * The producer used to handle the state logic for the wishlist useReducer
*/
const wishlistProducer = (state: WishlistStateType, action: WishlistReducerActionType): WishlistStateType => {
    switch (action.type) {
        case "SET_CLAIMED_CATEGORY":
            return {
                ...state,
                wishlistClaimedCategories: upsertClaimedCategory(state.wishlistClaimedCategories, action.payload.guestCode, action.payload.category)
            }
        case "REMOVE_CLAIMED_CATEGORY":
            return {
                ...state,
                wishlistClaimedCategories: removeClaimedCategory(state.wishlistClaimedCategories, action.payload.guestCode, action.payload.category)
            }
        case "RESET_CLAIMED_CATEGORIES":
            return {
                ...state,
                wishlistClaimedCategories: []
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
        setClaimedCategory: (category: string, guestCode: string) => {
            dispatch({
                type: "SET_CLAIMED_CATEGORY",
                payload: {
                    category,
                    guestCode
                }
            })
        },
        removeClaimedCategory: (category: string, guestCode: string) => {
            dispatch({
                type: "REMOVE_CLAIMED_CATEGORY",
                payload: {
                    category,
                    guestCode
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
            wishlistClaimedCategories: state.wishlistClaimedCategories
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