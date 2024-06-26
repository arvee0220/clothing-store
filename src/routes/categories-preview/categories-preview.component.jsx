import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";

const CategoriesPreview = () => {
    const categories = useSelector(selectCategoriesMap);

    if (Object.keys(categories).length === 0) {
        return <div className="shop-container">Loading categories...</div>;
    }

    return (
        <>
            {Object.keys(categories).map((title) => {
                const products = categories[title];

                return (
                    <CategoryPreview
                        key={title}
                        title={title}
                        products={products}
                    />
                );
            })}
        </>
    );
};

export default CategoriesPreview;
