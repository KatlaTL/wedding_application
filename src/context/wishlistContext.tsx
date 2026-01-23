import { CLAIMED_CATEGORIES } from "../constants/localstorageKeys";
import { WishlistClaimedCategoriesSchema, WishlistStateSchema } from "../schemas/wishlistSchema";
import type { ClaimedCategories, WishlistContextI, WishlistReducerActionType, WishlistStateType } from "../types/wishlistTypes";
import { safeParser } from "../utils/parser";
import { createContext, useContext, useReducer, type PropsWithChildren } from "react";


const reducerInitialState: WishlistStateType = WishlistStateSchema.parse({
    wishlistClaimedCategories: safeParser(
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
            const guestCodeExists = state.wishlistClaimedCategories.find(item => item.guestCode === action.payload.guestCode);

            if (!guestCodeExists) {
                return {
                    ...state,
                    wishlistClaimedCategories: [...state.wishlistClaimedCategories, {
                        guestCode: action.payload.guestCode,
                        claimedCategories: [{
                            categoryTitle: action.payload.category
                        }]
                    }]
                }
            }

            const categoryExists = guestCodeExists?.claimedCategories.some(cat => cat.categoryTitle === action.payload.category);

            if (categoryExists) {
                return {
                    ...state,
                    wishlistClaimedCategories: state.wishlistClaimedCategories.map(item => {
                        if (item.guestCode === action.payload.guestCode) {

                            const itemClaimedCategories = item.claimedCategories.map(cat => {
                                if (cat.categoryTitle === action.payload.category) {
                                    return {
                                        ...cat,
                                        categoryTitle: action.payload.category,
                                    }
                                }
                                return cat;
                            });

                            return {
                                ...item,
                                claimedCategories: [...itemClaimedCategories]
                            }
                        }

                        return item;
                    })
                }
            }

            return {
                ...state,
                wishlistClaimedCategories: state.wishlistClaimedCategories.map(item => {
                    if (item.guestCode === action.payload.guestCode) {
                        return {
                            ...item,
                            claimedCategories: [
                                ...item.claimedCategories,
                                {
                                    categoryTitle: action.payload.category
                                }
                            ] as ClaimedCategories
                        }
                    }

                    return item;
                })
            }
        case "REMOVE_CLAIMED_CATEGORY":
            return {
                ...state,
                wishlistClaimedCategories: state.wishlistClaimedCategories.map(item => {
                    if (item.guestCode === action.payload.guestCode) {
                        return {
                            ...item,
                            claimedCategories: item.claimedCategories.filter(cat => cat.categoryTitle !== action.payload.category)
                        }
                    }
                    return item;
                })
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