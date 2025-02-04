import { useEffect, useState } from "react";
import { getAllVAObjectList } from "../../API's/harvardApi";
import VACollectionCards from "../cards/VACollectionCards";

const VACollectionList = () => {
	const [collection, setCollection] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getAllVAObjectList().then((response) => {
			setIsLoading(true);
			console.log(response.records);
			setCollection(response.records);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return <h2>Loading VA Collections....</h2>;
	}

	return (
		<>
			{collection.map((item, id) => {
				return (
					<>
						<VACollectionCards key={id} item={item} />
					</>
				);
			})}
		</>
	);
};

export default VACollectionList;
