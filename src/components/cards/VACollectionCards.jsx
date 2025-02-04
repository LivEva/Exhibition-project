const VACollectionCards = (props) => {
	const { item } = props;

	return (
		<>
			<h2>{item._primaryMaker.name}</h2>
			<p>{item._primaryPlace}</p>
			<p>{item._primaryDate}</p>
			<p>{item._currentLocation.displayName}</p>
		</>
	);
};

export default VACollectionCards;
