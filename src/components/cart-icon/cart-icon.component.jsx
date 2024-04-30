// import { useContext } from "react";
import ShoppingIcon from "../../assets/shopping-bag.svg?react";
// import { CartContext } from "../../context/cart.context";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartOpen } from "../../store/cart/cart.reducer";
import { selectCartCount } from "../../store/cart/cart.selector";

import "./cart-icon.styles.scss";

const CartIcon = () => {
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);

    const handleCartToggling = () => {
        dispatch(toggleCartOpen());
    };

    return (
        <div className="cart-icon-container" onClick={handleCartToggling}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    );
};

export default CartIcon;
