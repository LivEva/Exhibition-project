import { Link } from "react-router";
import "../../styling/collectionListCard.css";
Link;

const CollectionListCard = (props) => {
	const { item } = props;
	return (
		<div className="collection-card-container">
			<Link to={`/object/${item.source}/${item.id}`}>
				<img src={item.image} alt="image of art" />
			</Link>
			<h1>{item.title}</h1>
			<p>{item.location}</p>
			<p>{item.date}</p>
			<p>{item.type}</p>
			<p>{item.department}</p>
		</div>
	);
};

export default CollectionListCard;
