import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <h2 className="name">{name}</h2>
            <span className="quantity">{quantity}</span>
            <span className="price">{price}</span>
            <span className="remove-button">&#10005;</span>
        </div>
    );
};

export default CheckoutItem;
