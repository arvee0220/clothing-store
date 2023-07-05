import { CartItemContainer } from './cart-item.styles.js';

const CartItem = ({ cartItem }) => {
    const { imageUrl, price, name, quantity } = cartItem;
    const total = price * quantity;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span>
                    {quantity} x ${total}
                </span>
            </div>
        </CartItemContainer>
    );
};

export default CartItem;
