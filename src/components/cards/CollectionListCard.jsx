import "../../styling/collectionListCard.css";

const CollectionListCard = (props) => {
	const { item } = props;

	return (
		<div className="collection-card-container">
			<img src={item.image} alt="image of art" />
			<h1>{item.title}</h1>
			<p>{item.location}</p>
			<p>{item.date}</p>
			<p>{item.type}</p>
			<p>{item.department}</p>
		</div>
	);
};

export default CollectionListCard;
