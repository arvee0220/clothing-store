import { useContext } from "react";
import { CategoriesContext } from "../../context/categories_context/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
	const { categoriesMap, loading, error } = useContext(CategoriesContext);

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <div>Error loading categories</div>;
	}

	return (
		<div>
			{categoriesMap &&
				Object.keys(categoriesMap).map((title) => {
					const products = categoriesMap[title];
					return <CategoryPreview key={title} title={title} products={products} />;
				})}
		</div>
	);
};

export default CategoriesPreview;
