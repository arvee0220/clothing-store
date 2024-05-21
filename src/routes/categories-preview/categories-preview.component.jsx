import { useContext } from "react";
import { CategoriesContext } from "../../context/categories_context/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
	const { categoriesMap } = useContext(CategoriesContext);

	if (Object.keys(categoriesMap).length === 0) {
		return <div className="shop-container">Loading categories...</div>;
	}

	return (
		<>
			{Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title];

				return <CategoryPreview key={title} title={title} products={products} />;
			})}
		</>
	);
};

export default CategoriesPreview;
