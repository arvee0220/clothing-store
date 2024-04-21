import { createContext, useState } from "react";
import { addCartItem } from "../utils/cartUtils/cart.utils";
import PropTypes from "prop-types";

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems, product));
    };

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};