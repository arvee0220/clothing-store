import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart, clearItemFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import "./checkout-item.styles.scss";
import { FC } from "react";
import { CartItem } from "../../store/cart/cart.types";

type CheckOutItemProp = {
	cartItem: CartItem;
};

const CheckoutItem: FC<CheckOutItemProp> = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	const dispatch = useDispatch();

	const cartItems = useSelector(selectCartItems);

	const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));

	const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

	const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));

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
