import { CART_ACTION_TYPES } from "./cart.types";

const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    const { CART_TOGGLE, SET_CART_ITEMS } = CART_ACTION_TYPES;

    switch (type) {
        case SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload,
            };
        case CART_TOGGLE:
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            return state;
    }
};
