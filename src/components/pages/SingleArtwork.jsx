import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "@heroui/react";
import "../styling/singleArtwork.css";
import { fetchObjectById } from "../../API/museumApi";
import ImageModal from "../cards/ImageModal";

const SingleArtwork = () => {
  const [artwork, setArtwork] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); 
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
      setShowSuccess(true); 

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } else if(savedCollections[collectionName].some(obj => obj.id === artwork.id)){
      setShowAlert(true)
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

      {!artwork || Object.keys(artwork).length === 0 ? <h1 className="error-message">sorry, there seems to be an issue loading this object. Please try again later!</h1> : 

      <>

      <div className="image-modal">

      <ImageModal artwork={artwork}/>

      </div>

      <div className="title-container">
        <h2>{artwork?.title}</h2>
      </div>

      <div className="art-info">
  <p>{artwork?.description}</p>
  <p><span className="tag">Physical Description:</span> {artwork?.physicalDescription}</p>
  <p><span className="tag">Credit:</span> {artwork?.credit}</p>
  <p><span className="tag">Dimensions:</span> {artwork?.dimensions}</p>
  <p><span className="tag">Century:</span> {artwork?.century}</p>
  <p><span className="tag">Created:</span> {artwork?.date}</p>
  <p><span className="tag">Department:</span> {artwork?.department}</p>
  <p><span className="tag">Location:</span> {artwork?.location}</p>
  <p>{artwork?.summary}</p>
</div>

{showSuccess && (
        <div className="w-full flex justify-center my-3" id="success-design">
          <Alert color="success" >Artwork added to '{collectionName}' collection successfully ✓</Alert>
        </div>
      )}

      {showAlert && 

      (<div className="w-full flex justify-center my-3" id="alert-design">
          <Alert color="error" >Artwork already added to '{collectionName}' collection!</Alert>
        </div>)}

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
