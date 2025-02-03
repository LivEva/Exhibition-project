const CollectionListCard = (props) => {
	const { item } = props;

	return (
		<>
			<img src={item.primaryimageurl} alt="" />
			<p>{item.title}</p>
		</>
	);
};

export default CollectionListCard;
