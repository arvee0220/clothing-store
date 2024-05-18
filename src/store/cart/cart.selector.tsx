import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";
import { RootState } from "../store";

const selectCart = (state: RootState): CartState => state.cart;

export const selectIsCartOpen = createSelector([selectCart], (cart) => cart.isCartOpen);

export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce(
		(accumulatedTotal, cartItem) => accumulatedTotal + cartItem.price * cartItem.quantity,
		0
	)
);
