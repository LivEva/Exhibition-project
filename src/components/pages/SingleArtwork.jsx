import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
	fetchHarvardObjectById,
	fetchVAObjectById,
} from "../../API's/museumApi";
import "../../styling/SingleArtwork.css";

const SingleArtwork = () => {
	const [artwork, setArtwork] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	let { source, id } = useParams();

	id = parseInt(id);

	useEffect(() => {
		if (!id || !source) {
			return;
		}

		setIsLoading(true);

		if (source === "Harvard") {
			fetchHarvardObjectById(id).then((response) => {
				console.log(response, "HARVARD RESPONSE");

				setArtwork(response);
			});
			setIsLoading(false);
		} else {
			fetchVAObjectById(id).then((response) => {
				console.log(response, "VA RESPONSE");

				setArtwork(response);
			});
			setIsLoading(false);
		}

		setIsLoading(true);
	}, [id, source]);

	return (
		<div className="single-artwork-container">
			<Link to={`/object/${source}/${id}`}></Link>

			{console.log(artwork, "LOGGED ARTWORK")}

			<h2>{artwork.title}</h2>
			<img src={artwork.primaryimageurl} alt="" />
			<h3>{artwork.division}</h3>
			<p>{artwork.description}</p>
		</div>
	);
};

export default SingleArtwork;
