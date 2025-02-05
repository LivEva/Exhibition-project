import "../../styling/collectionListCard.css";

const CollectionListCard = (props) => {
	const { item } = props;

	return (
		<div className="collection-card-container">
			<h2>Title: {item.title}</h2>
			<img src={item.image} alt="image of art" />
			<p>Location: {item.location}</p>
			<p>Date: {item._primaryDate}</p>
			<p>Type: {item.type}</p>
			<p>Department: {item.department}</p>
		</div>
	);
};

export default CollectionListCard;
