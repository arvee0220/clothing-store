import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./checkout.styles.scss";

const Checkout = () => {
    const { cartItems, addItemToCart, removeItemFromCart } =
        useContext(CartContext);

    return (
        <div>
            <h2>Checkout Page</h2>
            <div>
                {cartItems.map((cartItem) => {
                    const { id, name, imageUrl, quantity } = cartItem;
                    const incrementCartItem = () => addItemToCart(cartItem);
                    const decrementCartItem = () =>
                        removeItemFromCart(cartItem);
                    return (
                        <div key={id}>
                            <img src={imageUrl} alt={`${name}`} />
                            <h2>{name}</h2>
                            <span>{quantity}</span>
                            <span onClick={decrementCartItem}>Decrement</span>
                            <span onClick={incrementCartItem}>Increment</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Checkout;
