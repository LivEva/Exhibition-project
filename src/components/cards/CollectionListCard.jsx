import "../../styling/collectionListCard.css";

const CollectionListCard = (props) => {
	const { item } = props;

	return (
		<div className="collection-card-container">
			<h2>{item.title}</h2>
			<img src={item.primaryimageurl} alt="" />
		</div>
	);
};

export default CollectionListCard;
