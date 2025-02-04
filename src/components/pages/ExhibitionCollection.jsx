import { getAllHarvardObjectList } from "../../API's/harvardApi";
import { useEffect, useState } from "react";
import CollectionListCard from "../cards/CollectionListCard";
import "../../styling/exhibitionCollection.css";

const ExhibitionCollection = () => {
	const [collections, setCollections] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		getAllHarvardObjectList()
			.then((response) => {
				setCollections(response.records || []);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching collections:", error);
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <h2>Loading Collections...</h2>;
	}

	return (
		<div className="collection-container">
			{collections.map((item, id) => (
				<CollectionListCard key={id} item={item} />
			))}
		</div>
	);
};

export default ExhibitionCollection;
