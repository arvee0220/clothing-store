import { Action, PayloadAction } from "@reduxjs/toolkit";
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

export const cartReducer = (state = CART_INITIAL_STATE, action: Action<string>): CartState => {
	if (toggleCart.match(action)) {
		return { ...state, isCartOpen: (action as PayloadAction<boolean>).payload };
	}

	if (setCartItems.match(action)) {
		return { ...state, cartItems: (action as PayloadAction<CartItem[]>).payload };
	}

	return state;
};
