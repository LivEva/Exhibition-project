import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styling/collectionListCard.css";

const CollectionListCard = ({ item }) => {
  const [isInCollection, setIsInCollection] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  useEffect(() => {

    const savedCollections = JSON.parse(localStorage.getItem("savedCollections")) || {};
   
    let foundFolder = "";
    let isSaved = false;

    for (const folder in savedCollections) {
        if (savedCollections[folder].some(art => art.id === item.id)) {
            isSaved = true;
            foundFolder = folder;
      
        }
    }
  
    setIsInCollection(isSaved);
    setCollectionName(foundFolder)
  }, [item.id]);

  return (

    <div className="collection-card-container">
      <Link to={`/object/${item.source}/${item.id}`}>
        <img src={item.image} alt="image of museum object" />
        <h2>{item.title}</h2>
        <p>{item.type}</p>
        <p id="location">{item.location}</p>
      
 
      </Link>
      {isInCollection && <p className="in-collection-badge">Saved in: {collectionName}</p>}
    </div>

  );
};

export default CollectionListCard;