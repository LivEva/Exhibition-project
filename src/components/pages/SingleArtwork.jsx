import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router";

import "../../styling/SingleArtwork.css";
import { fetchObjectById } from "../../API's/museumApi";

const SingleArtwork = () => {
	const [artwork, setArtwork] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { source, id } = useParams();

	console.log(source, id);

	useEffect(() => {
		fetchObjectById(id, source)
			.then((response) => {
				console.log(response, "WHAT IS THIS GIVING ME");
				setArtwork(response);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(
					error,
					"THIS IS THE ERROR IS GETTING THE OBJECT BY ID IN THE SINGLE PAGE"
				);
			});
	}, [id, source]);

	if (isLoading) {
		return <h1>Loading Artwork...</h1>;
	}

	return (
		<div>
			<h1>{artwork?.title}</h1>
			<img src={artwork?.image} alt={artwork?.title} />
			<p>{artwork?.description}</p>
		</div>
	);
};

export default SingleArtwork;
