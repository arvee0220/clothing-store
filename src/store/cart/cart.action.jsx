import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const { CART_TOGGLE, SET_CART_ITEMS } = CART_ACTION_TYPES;

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // If greater than 1 decrement quantity
    if (existingCartItem && existingCartItem.quantity > 1) {
        return cartItems.map((cartItem) =>
            cartItem.id === cartItemToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
    } else {
        // check if quantity is equal to 1, if it is remove that item from the cart
        return cartItems.filter(
            (cartItem) => cartItem.id !== cartItemToRemove.id
        );
    }
};

const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(SET_CART_ITEMS, newCartItems);
};

export const toggleCartOpen = (boolean) => createAction(CART_TOGGLE, boolean);
