import "../../styling/collectionListCard.css";

const CollectionListCard = (props) => {
	const { item } = props;

	return (
		<div className="collection-card-container">
			<img src={item.image} alt="image of art" />
			<h1>Title: {item.title}</h1>
			<p>Location: {item.location}</p>
			<p>Date: {item.date}</p>
			<p>Type: {item.type}</p>
			<p>Department: {item.department}</p>
		</div>
	);
};

export default CollectionListCard;
