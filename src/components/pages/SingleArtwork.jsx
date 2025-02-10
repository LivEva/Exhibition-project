import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
	fetchHarvardObjectById,
	fetchVAObjectById,
} from "../../API's/museumApi";
import CollectionsListCard from "../cards/CollectionListCard";

const SingleArtwork = () => {
	const [artwork, setArtwork] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	let { source, id } = useParams();

	id = parseInt(id);

	useEffect(() => {
		if (!id || !source) {
			return;
		}

		// Set loading state to true
		setIsLoading(true);

		// Use Promise.all to make both API calls at once
		Promise.all([fetchHarvardObjectById(id), fetchVAObjectById(id)])
			.then(([harvardData, vaData]) => {
				// Combine the data from both sources if available
				const combinedData = { ...harvardData, ...vaData };

				setArtwork(combinedData); // Set combined artwork data to state
				setIsLoading(false); // Set loading state to false
			})
			.catch((error) => {
				console.log(error);

				setIsLoading(false);
			});
	}, [id, source]);

	if (isLoading) {
		<h1>Loading single artwork...</h1>;
	}

	return (
		<>
			<Link to={`/object/${source}/${id}`}></Link>

			<h1>{artwork.title}</h1>

			<h3>{artwork.department}</h3>
		</>
	);
};

export default SingleArtwork;
