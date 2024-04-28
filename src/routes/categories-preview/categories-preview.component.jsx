import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);

    if (Object.keys(categoriesMap).length === 0) {
        return <div className="shop-container">Loading categories...</div>;
    }

    return (
        <>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];

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
