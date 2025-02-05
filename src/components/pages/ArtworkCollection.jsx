import {
	fetchAllHarvardObjectList,
	fetchAllVAObjectList,
} from "../../API's/harvardApi";
import { useEffect, useState } from "react";
import CollectionListCard from "../cards/CollectionListCard";
import "../../styling/exhibitionCollection.css";

const ArtworkCollection = () => {
	const [collections, setCollections] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		Promise.all([
			fetchAllHarvardObjectList({ limit: 10 }),
			fetchAllVAObjectList({ limit: 10 }),
		])
			.then(([harvardCollection, vaCollection]) => {
				const combinedCollections = [
					...harvardCollection.map((item) => ({
						...item,
					})),
					...vaCollection.map((item) => ({
						...item,
					})),
				];
				console.log(combinedCollections);
				setCollections(combinedCollections);
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

export default ArtworkCollection;
