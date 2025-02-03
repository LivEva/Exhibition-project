import collectionList from "../../API's/harvardApi";
import { useEffect, useState } from "react";

const ExhibitionCollection = () => {
	const [collections, setCollections] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		collectionList().then((response) => {
			console.log(response.records);
			setIsLoading(true);
			setCollections(response.records);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return <h2>Loading Collections...</h2>;
	}
};

export default ExhibitionCollection;
