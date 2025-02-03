import collectionList from "../../API's/harvardApi";
import { useEffect, useState } from "react";
import CollectionListCard from "../cards/CollectionListCard";

const ExhibitionCollection = () => {
	const [collections, setCollections] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		collectionList().then((response) => {
			setIsLoading(true);
			setCollections(response.records);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return <h2>Loading Collections...</h2>;
	}

	return (
		<>
			{collections.map((item, id) => {
				return (
					<>
						<CollectionListCard key={id} item={item} />
					</>
				);
			})}
		</>
	);
};

export default ExhibitionCollection;
