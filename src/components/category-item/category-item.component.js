import { useNavigate } from 'react-router-dom';
import './category-item.styles.scss';

const CategoryItem = ({ category }) => {
    const { imageUrl, title } = category;
    const navigate = useNavigate();

    const goToShopHandler = () => {
        navigate('/shop');
    };

    return (
        <div className='category-container' onClick={goToShopHandler}>
            <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }} />
            <div className='category-body-container'>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    );
};

export default CategoryItem;
