import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../styling/CollectionListCard.css'



const SavedExhibitions = () => {
    const [savedArtworks, setSavedArtworks] = useState([]);

    useEffect(() => {
     
        const artworks = JSON.parse(localStorage.getItem("savedArtworks")) || [];
        setSavedArtworks(artworks);
    }, []);

    const removeArtwork = (id) => {
        const updatedArtworks = savedArtworks.filter((artwork) => artwork.id !== id);
        setSavedArtworks(updatedArtworks);
        localStorage.setItem("savedArtworks", JSON.stringify(updatedArtworks));
    };

    return (
        <div>
            <h1>Saved Exhibitions</h1>
            {savedArtworks.length > 0 ? (
                <div className="collection-card-container">
                    {savedArtworks.map((artwork) => (
                        <div key={artwork.id} className="artwork-card">
                            <Link to={`/object/${artwork.source}/${artwork.id}`}>
                                <img src={artwork.image} alt={artwork.title} width="200" />
                            </Link>
                            <h2>{artwork.title}</h2>
                           
                            <button onClick={() => removeArtwork(artwork.id)}>Remove</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No saved exhibitions yet.</p>
            )}
        </div>
    );
};

export default SavedExhibitions;
