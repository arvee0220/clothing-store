import { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./directory-item.styles.scss";
import { DirectoryCategory } from "../directory/directory.component";

type DirectoryItemProp = {
	category: DirectoryCategory;
};

const DirectoryItem: FC<DirectoryItemProp> = ({ category }) => {
	const { imageUrl, title, route } = category;
	const navigate = useNavigate();

	const onNavigateHandler = () => navigate(route);

	return (
		<div className="directory-item-container" onClick={onNavigateHandler}>
			<div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
			<div className="body">
				<h2>{title}</h2>
				<p>Shop Now</p>
			</div>
		</div>
	);
};

export default DirectoryItem;
