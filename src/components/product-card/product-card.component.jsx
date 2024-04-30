import { useDispatch } from "react-redux";
import Button from "../button/button.component";

import "./product-card.styles.scss";
import { addItem } from "../../store/cart/cart.reducer";

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;

    const dispatch = useDispatch();

    const addProductToCart = () => dispatch(addItem(product));

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType="inverted" onClick={addProductToCart}>
                Add to Cart
            </Button>
        </div>
    );
};

export default ProductCard;
