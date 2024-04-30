import "./checkout-item.styles.scss";
import { useDispatch } from "react-redux";
import { addItem, removeItem, clearItem } from "../../store/cart/cart.reducer";

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const dispatch = useDispatch();

    const addItemHandler = () => dispatch(addItem(cartItem));

    const removeItemHandler = () => dispatch(removeItem(cartItem));

    const clearItemHandler = () => dispatch(clearItem(cartItem));

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
