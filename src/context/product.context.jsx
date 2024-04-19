import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState();
    const value = { products };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};

ProductsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
