import { getExhibitionList } from "../../API's/harvardApi";
import { useEffect, useState } from "react";
import CollectionListCard from "../cards/CollectionListCard";
import "../../styling/exhibitionCollection.css";
import { Link } from "react-router";

const ExhibitionCollection = () => {
	const [collections, setCollections] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getExhibitionList().then((response) => {
			setIsLoading(true);
			setCollections(response.records);
			setIsLoading(false);
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
						<Link to={`/exhibition/${id}`}>
							<CollectionListCard key={id} item={item} />
						</Link>
					</>
				);
			})}
		</div>
	);
};

export default ExhibitionCollection;
