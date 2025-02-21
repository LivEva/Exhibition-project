import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../styling/SingleArtwork.css";
import { fetchObjectById } from "../../API/museumApi";

const saveObject = (object) => {
	let savedArtworks = JSON.parse(localStorage.getItem("savedArtworks")) || [];

	if (!savedArtworks.some(obj => obj.id === object.id)) {
		savedArtworks.push(object);
		localStorage.setItem("savedArtworks", JSON.stringify(savedArtworks)); 
	}
};

const SingleArtwork = () => {
	const [artwork, setArtwork] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { source, id } = useParams();

	useEffect(() => {
		fetchObjectById(id, source)
			.then((response) => {
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

	console.log(artwork)

	return (
		<div>
			<h1>{artwork?.title}</h1>
			<img src={artwork?.image} alt={artwork?.title} />
			<p>{artwork?.description}</p>
			<button onClick={() => saveObject(artwork)}>save</button>
			
		</div>
	);
};

export default SingleArtwork;
