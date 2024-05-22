import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../context/categories_context/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import "./category.styles.scss";

const Category = () => {
	const { category } = useParams();
	const { categoriesMap, loading, error } = useContext(CategoriesContext);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <div>Error loading categories</div>;
	}

	return (
		<>
			{products.length > 0 && (
				<>
					<h2 className="category-title">{category.toUpperCase()}</h2>
					<div className="category-container">
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</>
			)}
			{products.length === 0 && !loading && !error && (
				<div>No products found in this category</div>
			)}
		</>
	);
};

export default Category;
