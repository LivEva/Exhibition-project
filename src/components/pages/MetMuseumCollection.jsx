import { useEffect, useState } from "react";
import { getAllMetObjectList } from "../../API's/harvardApi";
import MetCollectionCard from "../cards/MetCollectionCard";

const MetMuseumCollection = () => {
	const [collection, setCollection] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	console.log(collection);

	useEffect(() => {
		setIsLoading(true);
		getAllMetObjectList()
			.then((response) => {
				setCollection(response.departments);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching collection:", error);
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <h1>Loading the Met collection...</h1>;
	}

	return (
		<>
			{collection.map((item, id) => (
				<MetCollectionCard key={id} item={item} />
			))}
		</>
	);
};

export default MetMuseumCollection;
