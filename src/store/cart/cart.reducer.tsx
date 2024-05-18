import { UnknownAction } from "@reduxjs/toolkit";
import { CartItem } from "./cart.types";
import { setCartItems, toggleCart } from "./cart.action";

export type CartState = {
	readonly cartItems: CartItem[];
	readonly isCartOpen: boolean;
};

const CART_INITIAL_STATE: CartState = {
	cartItems: [],
	isCartOpen: false,
};

export const cartReducer = (state = CART_INITIAL_STATE, action: UnknownAction): CartState => {
	if (toggleCart.match(action)) ({ ...state, isCartOpen: action.payload });

	if (setCartItems.match(action)) ({ ...state, cartItems: action.payload });

	return state;
};
