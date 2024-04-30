import ShoppingIcon from "../../assets/shopping-bag.svg?react";

import { useDispatch, useSelector } from "react-redux";
import { toggleCartOpen } from "../../store/cart/cart.action";
import {
    selectCartCount,
    selectIsCartOpen,
} from "../../store/cart/cart.selector";

import "./cart-icon.styles.scss";

const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const handleCartToggling = () => {
        dispatch(toggleCartOpen(!isCartOpen));
    };

    return (
        <div className="cart-icon-container" onClick={handleCartToggling}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    );
};

export default CartIcon;
