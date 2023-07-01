import { useNavigate } from 'react-router-dom';
import { DirectoryItemContainer, Body, BackgroundImage } from './directory-item.styles.js';

const CategoryItem = ({ category }) => {
    const { imageUrl, title } = category;
    const navigate = useNavigate();

    const goToShopHandler = () => {
        navigate('/shop');
    };

    return (
        <DirectoryItemContainer onClick={goToShopHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default CategoryItem;
