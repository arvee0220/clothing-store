import "./product-card.styles.scss";
import PropTypes from "prop-types";
import Button from "../button/button.component";

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType="inverted">Add to Cart</Button>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
    }),
};

export default ProductCard;
