import { createSlice } from "@reduxjs/toolkit";
import {
    addCartItem,
    removeCartItem,
    clearCartItem,
} from "../../utils/cartUtils/cart.utils";

export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState: CART_INITIAL_STATE,
    reducers: {
        toggleCartOpen(state) {
            state.isCartOpen = !state.isCartOpen;
        },
        setCartItems(state, action) {
            state.cartItems = action.payload.cartItems;
            state.cartCount = action.payload.cartCount;
            state.cartTotal = action.payload.cartTotal;
        },
        addItem(state, action) {
            const newCartItems = addCartItem(state.cartItems, action.payload);
            state.cartItems = newCartItems;
            state.cartCount = newCartItems.reduce(
                (total, item) => total + item.quantity,
                0
            );
            state.cartTotal = newCartItems.reduce(
                (total, item) => total + item.quantity * item.price,
                0
            );
        },
        removeItem(state, action) {
            const newCartItems = removeCartItem(
                state.cartItems,
                action.payload
            );
            state.cartItems = newCartItems;
            state.cartCount = newCartItems.reduce(
                (total, item) => total + item.quantity,
                0
            );
            state.cartTotal = newCartItems.reduce(
                (total, item) => total + item.quantity * item.price,
                0
            );
        },
        clearItem(state, action) {
            const newCartItems = clearCartItem(state.cartItems, action.payload);
            state.cartItems = newCartItems;
            state.cartCount = newCartItems.reduce(
                (total, item) => total + item.quantity,
                0
            );
            state.cartTotal = newCartItems.reduce(
                (total, item) => total + item.quantity * item.price,
                0
            );
        },
    },
});

export const { toggleCartOpen, setCartItems, addItem, removeItem, clearItem } =
    cartSlice.actions;

export default cartSlice.reducer;
