import { getAllHarvardObjectList } from "../../API's/harvardApi";
import { useEffect, useState } from "react";
import CollectionListCard from "../cards/CollectionListCard";
import "../../styling/exhibitionCollection.css";

const ExhibitionCollection = () => {
	const [collections, setCollections] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getAllHarvardObjectList().then((response) => {
			setIsLoading(true);
			setCollections(response.records);
			setIsLoading(false);
			console.log(response.records);
		});
	}, []);

	if (isLoading) {
		return <h2>Loading Collections...</h2>;
	}

	return (
		<div className="collection-container">
			{collections.map((item, id) => {
				return (
					<>
						<CollectionListCard key={id} item={item} />
					</>
				);
			})}
		</div>
	);
};

export default ExhibitionCollection;
