import { CategoryItem } from "../categories/category.types";
import {
	createAction,
	withMatcher,
	Action,
	ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

const { CART_TOGGLE, SET_CART_ITEMS } = CART_ACTION_TYPES;

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
	// find the cart item to remove
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

	// If greater than 1 decrement quantity
	if (existingCartItem && existingCartItem.quantity > 1) {
		return cartItems.map((cartItem) =>
			cartItem.id === cartItemToRemove.id
				? { ...cartItem, quantity: cartItem.quantity - 1 }
				: cartItem
		);
	} else {
		// check if quantity is equal to 1, if it is remove that item from the cart
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] =>
	cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export type ToggleCart = ActionWithPayload<typeof CART_TOGGLE, boolean>;

export type SetCartItems = ActionWithPayload<typeof SET_CART_ITEMS, CartItem[]>;

export const toggleCart = withMatcher(
	(bool: boolean): ToggleCart => createAction(CART_TOGGLE, bool)
);

export const setCartItems = withMatcher(
	(cartItems: CartItem[]): SetCartItems => createAction(SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
	const newCartItems = clearCartItem(cartItems, cartItemToClear);
	return setCartItems(newCartItems);
};
