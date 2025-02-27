import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "@heroui/react";
import "../styling/singleArtwork.css";
import { fetchObjectById } from "../../API/museumApi";
import SkeletonCard from "../main/SkeletonCard";

const SingleArtwork = () => {
  const [artwork, setArtwork] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [showAlert, setShowAlert] = useState(false); 

  const { source, id } = useParams();

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  }, [id, source]);


  const saveObject = () => {
    if (!collectionName.trim()) {
      return;
    }

    let savedCollections = JSON.parse(localStorage.getItem("savedCollections")) || {};

    if (!savedCollections[collectionName]) {
      savedCollections[collectionName] = [];
    }

    if (!savedCollections[collectionName].some(obj => obj.id === artwork.id)) {
      savedCollections[collectionName].push(artwork);
      localStorage.setItem("savedCollections", JSON.stringify(savedCollections));
      setShowAlert(true); 

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  if (isLoading) {
    return <h1 className="loading-message">Loading Artwork...</h1>;
  }

  return (
    <div className="single-artwork-container">
  
      {showAlert && (
        <div className="w-full flex justify-center my-3" id="alert-design">
          <Alert color="success" >Artwork added to '{collectionName}' collection successfully ✓</Alert>
        </div>
      )}

      {!artwork || Object.keys(artwork).length === 0 ? <h1 className="error-message">sorry, there seems to be an issue loading this object. Please try again later!</h1> : 

      <>

      <img src={artwork?.image} alt={artwork?.title} id="art-image"/>

      <div className="melting-text-container">
        <h2 className="melting-text">{artwork?.title}</h2>
      </div>

      <div className="art-info">

     
        <h3>Description</h3><p>{artwork?.description}</p>
        <h3>Dimensions</h3><p>{artwork?.dimensions}</p>
        <h3>Type</h3><p>{artwork?.type}</p>
        <h3>Date</h3> <p>{artwork?.date}</p>
        <h3>Department</h3><p>{artwork?.department}</p>
        <h3>location</h3><p>{artwork?.location}</p>
        <h3>Century</h3><p>{artwork?.century}</p>

      </div>

      <div className="save-section">
        
        <input
          type="text"
          placeholder="Enter collection name..."
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />
        <button onClick={saveObject}>Save to Collection</button>
      </div>

</>
}; 
    </div>
      
  );
};

export default SingleArtwork;
