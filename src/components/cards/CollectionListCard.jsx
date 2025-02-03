import "../../styling/collectionListCard.css";

const CollectionListCard = (props) => {
	const { item } = props;

	return (
		<div className="collection-card-container">
			<img src={item.primaryimageurl} alt="" />
			<p>{item.title}</p>
		</div>
	);
};

export default CollectionListCard;
