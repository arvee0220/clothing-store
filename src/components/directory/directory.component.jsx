import CategoryItem from "../category-item/category-item.component";
import PropTypes from "prop-types";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
    console.log(categories);

    return (
        <div className="directory-container">
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    );
};

Directory.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Directory;
