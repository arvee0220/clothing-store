import CategoryItem from '../components/category-item.component';
import { useDirectory } from '../context/directoryContext';
import './directory.styles.scss';

const Directory = () => {
    const { categories } = useDirectory();
    return (
        <div className='directory-container'>
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    );
};

export default Directory;
