import { Link } from "react-router-dom";
import "../../styling/collectionListCard.css";

const CollectionListCard = ({item}) => {

	return (
		<div className="collection-card-container">
			<Link to={`/object/${item.source}/${item.id}`}>
				<img src={item.image} alt="image of art" />
		
			<h1>{item.title}</h1>
			<p>{item.location}</p>
			<p>{item.date}</p>
			<p>{item.type}</p>
			<p>{item.department}</p>
			</Link>
			
		</div>
	);
};

export default CollectionListCard;
