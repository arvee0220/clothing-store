import './cart-item.styles.scss';

const CartItem = ({ cartItem }) => {
    const { imageUrl, price, name, quantity } = cartItem;
    const total = price * quantity;
    return (
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span>
                    {quantity} x ${total}
                </span>
            </div>
        </div>
    );
};

export default CartItem;
