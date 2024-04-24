import { useContext } from "react";
import { CategoriesContext } from "../../context/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss";

const Shop = () => {
    const {} = useContext(CategoriesContext);
    return <div className="products-container"></div>;
};

export default Shop;
