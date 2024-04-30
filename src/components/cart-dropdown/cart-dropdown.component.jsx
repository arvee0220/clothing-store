import { useNavigate } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";

import "./cart-dropdown.styles.scss";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);

    const navigate = useNavigate();

    const goToCheckOutHandler = () => {
        navigate("/checkout");
    };
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.length ? (
                    cartItems.map((cartItem) => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                    ))
                ) : (
                    <span className="empty-message">Your cart is empty</span>
                )}
            </div>
            <Button buttonType="default" onClick={goToCheckOutHandler}>
                GO TO CHECKOUT
            </Button>
        </div>
    );
};

export default CartDropdown;
