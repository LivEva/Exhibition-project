import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styling/singleArtwork.css";
import { fetchObjectById } from "../../API/museumApi";
import ImageModal from "../cards/ImageModal";
import { useNavigate } from "react-router-dom";
import '../styling/savedExhibitions.css'
import NavBar from "../main/NavBar";

const SingleArtwork = () => {
  const [artwork, setArtwork] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); 
  const [showAlert, setShowAlert] = useState(false);
  const [existingCollectionName, setExistingCollectionName] = useState("");

  const { source, id } = useParams();
  const navigate = useNavigate();

  const deleteHtmlTags = (input) => {
    return input.replace(/<\/?[^>]+(>|$)/g, ""); 
  };

  useEffect(() => {
    setIsLoading(true);
    fetchObjectById(id, source)
      .then((response) => {
        const correctArtworkText = {
          ...response,
          description: deleteHtmlTags(response.description || ''),
          physicalDescription: deleteHtmlTags(response.physicalDescription || ''),
          summary: deleteHtmlTags(response.summary || ''),
        };
        setArtwork(correctArtworkText);
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

    const foundCollection = Object.keys(savedCollections).find(collection => savedCollections[collection].some(obj => obj.id === artwork.id))

    
    if (!foundCollection) {
      savedCollections[collectionName] = savedCollections[collectionName] || [];
      savedCollections[collectionName].push(artwork);
      localStorage.setItem("savedCollections", JSON.stringify(savedCollections));
      setShowSuccess(true);
      setExistingCollectionName(""); // clear any previous state
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } else {
      setExistingCollectionName(foundCollection);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    
  };

  const handleBack = () => {

    navigate(-1)
    
		
	}

  if (isLoading) {
    return <h1 className="loading-message">Loading Artwork...</h1>;
  }

  return (

    <div>

      <NavBar />
  
    <div className="single-artwork-container">

<button onClick={() => handleBack()} className="back-button"> ← Back to Search Results</button>

      {!artwork || Object.keys(artwork).length === 0 ? <h1 className="error-message">sorry, there seems to be an issue loading this object. Please try again later!</h1> : 

      <>

      <div className="image-modal">

      <ImageModal artwork={artwork}/>

      </div>

      <div className="title-container">
        <h2>{artwork?.title}</h2>
      </div>

      <div className="art-info">


        <div className="info-sectioned">
        
          <p><span className="tag">Art Description: </span>{artwork?.description}</p>
          <p><span className="tag">Physical Description: </span>{artwork?.physicalDescription}</p>
          <p><span className="tag">Dimensions: </span>{artwork?.dimensions}</p>
          <p><span className="tag">Type: </span>{artwork?.type}</p>
          <p><span className="tag">Department: </span>{artwork?.department}</p>
          <p><span className="tag">Location: </span>{artwork?.location}</p>
          <p><span className="tag">Credit: </span>{artwork?.credit}</p>
          <p><span className="tag">Created: </span>{artwork?.date}</p>
         

       </div>

       <div className="info-sectioned">

          <p><span className="tag">Summary: </span>{artwork?.summary}</p>
        
       </div>

     </div>

{showSuccess && (
        <div className="success-design">
          <p>Artwork added to '{collectionName}' collection successfully ✓</p>
        </div>
      )}

      {showAlert && 

      (<div className="alert-design">
          <p>Artwork already added to '{existingCollectionName}' collection!</p>
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
    </div>
      
  );
};

export default SingleArtwork;
