import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styling/collectionListCard.css';


const SavedExhibitions = () => {
    const [savedCollections, setSavedCollections] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState("");

    useEffect(() => {
     
        const collections = JSON.parse(localStorage.getItem("savedCollections")) || [];
        setSavedCollections(collections);
    }, []);

    const removeArtwork = (folder, id) => {
        let updatedCollections = {...savedCollections};
        updatedCollections[folder] = updatedCollections[folder].filter((artwork) => artwork.id !== id);

        setSavedCollections(updatedCollections);
        localStorage.setItem("savedCollections", JSON.stringify(updatedCollections));  
    };

    return (

		<div className="collection-card-container">
			<h1>Saved Exhibitions</h1>

			{!selectedFolder ? (

				<div className="saved-collection-container">
					
					{Object.keys(savedCollections).length > 0 ? (
						
						<ul>
							{Object.keys(savedCollections).map(folder => (
								<li key={folder}>
									<button onClick={() => setSelectedFolder(folder)}>
										{folder} ({savedCollections[folder].length} items)
									</button>
								</li>
							))}
						</ul>
					) : (
						<p>No collections yet. Save some artwork!</p>
						
					)}
				</div>
			) : (
				<div>
					<h2>{selectedFolder} Collection</h2>
					<button onClick={() => setSelectedFolder(null)}>Back to Collections</button>

	
					{savedCollections[selectedFolder].map(artwork => (
						<div key={artwork.id} className="artwork-card">
							<Link to={`/object/${artwork.source}/${artwork.id}`}>
								<img src={artwork.image} alt={artwork.title} width="200" />
							</Link>
							<h2>{artwork.title}</h2>
							<button onClick={() => removeArtwork(selectedFolder, artwork.id)}>Remove</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SavedExhibitions;
