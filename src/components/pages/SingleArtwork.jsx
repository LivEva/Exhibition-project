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
	const [collectionName, setCollectionName] = useState("");


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

	const saveObject = () => {
		if(!collectionName.trim()){
			return <h1>Please enter a folder name</h1>
		}

		let savedCollections = JSON.parse(localStorage.getItem("savedCollections")) || {};

		if(!savedCollections[collectionName]){
			savedCollections[collectionName] = [];
		}

		if(!savedCollections[collectionName].some(obj => obj.id === artwork.id)){
			savedCollections[collectionName].push(artwork);
			localStorage.setItem("savedCollections", JSON.stringify(savedCollections));
		}
	}

	if (isLoading) {
		return <h1>Loading Artwork...</h1>;
	}

	return (
		<div>
			<h2>{artwork?.title}</h2>
			<img src={artwork?.image} alt={artwork?.title} />
			<p>{artwork?.description}</p>
			<p>{artwork?.dimensions}</p>
			<p>{artwork?.type}</p>
			<input type="text" placeholder="Enter collection name" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} />
			<button onClick={saveObject}>save to collection</button>
		</div>
	);
};

export default SingleArtwork;
