import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router";

import "../../styling/SingleArtwork.css";
import { fetchObjectById } from "../../API's/museumApi";

const SingleArtwork = () => {
	const [artwork, setArtwork] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { source, id } = useParams();

	useEffect(() => {
		fetchObjectById(id, source)
			.then((response) => {
				setArtwork(response.data);
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
			<Link to={`/object/${source}/${id}`}></Link>

			<h1>THIS WORKS</h1>
		</div>
	);
};

export default SingleArtwork;
