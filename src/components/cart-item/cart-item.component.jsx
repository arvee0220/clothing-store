import PropTypes from "prop-types";
import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
    const { imageUrl, name, quantity, price } = cartItem;
    return (
        <div className="cart-item-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="item-details">
                <span className="name">{name}</span>
                <span className="price">
                    {quantity} x ${price}
                </span>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    cartItem: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    }),
};

export default CartItem;
