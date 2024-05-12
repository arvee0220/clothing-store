import "./checkout-item.styles.scss";
import { useDispatch } from "react-redux";
import {
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
} from "../../store/cart/cart.slice";

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const dispatch = useDispatch();

    const addItemHandler = () => dispatch(addItemToCart(cartItem));

    const removeItemHandler = () => dispatch(removeItemFromCart(cartItem));

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItem));

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <h2 className="name">{name}</h2>
            <span className="quantity">
                <div className="arrow" onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>

            <span className="price">{price}</span>
            <span className="remove-button" onClick={clearItemHandler}>
                &#10005;
            </span>
        </div>
    );
};

export default CheckoutItem;
