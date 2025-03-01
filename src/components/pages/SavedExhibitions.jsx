import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styling/savedExhibitions.css'

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

		if(updatedCollections[folder].length === 0){
			delete updatedCollections[folder];

			if(selectedFolder === folder){
				setSelectedFolder(null);
			}
		}

        setSavedCollections(updatedCollections);
        localStorage.setItem("savedCollections", JSON.stringify(updatedCollections));  
    };

	

    return (

		<div className="saved-collection-container">
			<h1>{selectedFolder} collections</h1>

			{!selectedFolder ? (

				<div className="saved-artwork-card">
					
					{Object.keys(savedCollections).length > 0 ? (
						
						<ul>
							{Object.keys(savedCollections).map(folder => (
								<li key={folder}>
									<button onClick={() => setSelectedFolder(folder)} className="saved-collection-container">
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
				<div className="saved-exhibition-container">

					<div className="back-to-button">
					
					
					    <button onClick={() => setSelectedFolder(null)} className="saved-collection-buttons"> ← Back to Collections</button>

	                </div>

					{savedCollections[selectedFolder].map(artwork => (
						<div key={artwork.id} className="artwork-card">
							<Link to={`/object/${artwork.source}/${artwork.id}`}>
								<img src={artwork.image} alt={artwork.title} width="200" />
							</Link>
							<h2>{artwork.title}</h2>
							<button onClick={() => removeArtwork(selectedFolder, artwork.id)} className="saved-collection-buttons" id="remove-button">Remove</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SavedExhibitions;
