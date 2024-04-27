import { createContext, useReducer } from "react";
import {
    addCartItem,
    clearCartItem,
    removeCartItem,
} from "../utils/cartUtils/cart.utils";
import { CART_ACTION_TYPES } from "../reducerActionTypes/cartActionTypes";

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

const cartReducer = (state, action) => {
    const { isCartOpen } = state;
    const { type, payload } = action;

    const { CART_TOGGLE, SET_CART_ITEMS } = CART_ACTION_TYPES;

    switch (type) {
        case CART_TOGGLE:
            return {
                ...state,
                isCartOpen: !isCartOpen,
            };
        case SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const { isCartOpen, cartItems, cartCount, cartTotal } = state;

    const { CART_TOGGLE, SET_CART_ITEMS } = CART_ACTION_TYPES;

    const setIsCartOpen = () => {
        dispatch({ type: CART_TOGGLE });
    };

    const addItemToCart = (product) => {
        const newCartItems = addCartItem(cartItems, product);
        updateCartItems(newCartItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItems(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItems(newCartItems);
    };

    const updateCartItems = (cartItems) => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity,
            0
        );
        dispatch({
            type: SET_CART_ITEMS,
            payload: {
                cartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal,
            },
        });
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartCount,
        cartTotal,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
