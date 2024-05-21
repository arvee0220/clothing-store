import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";

import "./category.styles.scss";
import { useSelector } from "react-redux";
import {
	selectCategoriesIsLoading,
	selectCategoriesMap,
} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";

type CategoryRouteParams = {
	category: string;
};

const Category = () => {
	// useParams hook creates a dynamic routes in react by adjusting its content based on URL parameters (ex. shop/:category, shop/hats, shop/jackets etc.,)
	const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
	const categories = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);
	const [products, setProducts] = useState(categories[category]);

	useEffect(() => {
		setProducts(categories[category]);
	}, [category, categories]);

	return (
		<>
			<h2 className="category-title">{category.toUpperCase()}</h2>
			{isLoading ? (
				<Spinner />
			) : (
				<div className="category-container">
					{products &&
						products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
				</div>
			)}
		</>
	);
};

export default Category;
