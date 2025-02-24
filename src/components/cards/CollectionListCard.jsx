import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styling/collectionListCard.css";


const CollectionListCard = ({ item }) => {
  const [isInCollection, setIsInCollection] = useState(false);

  useEffect(() => {

    const savedCollections = JSON.parse(localStorage.getItem("savedCollections")) || {};
    const isSaved = Object.values(savedCollections).some(collection =>
      collection.some(art => art.id === item.id)

    );

    setIsInCollection(isSaved);
  }, [item.id]);

  return (
    <div className="collection-card-container">
      <Link to={`/object/${item.source}/${item.id}`}>
        <img src={item.image} alt="image of art" />
        <h1>{item.title}</h1>
        <p>{item.location}</p>
        <p>{item.date}</p>
        <p>{item.type}</p>
        <p>{item.department}</p>
      </Link>
      {isInCollection && <p className="in-collection-badge">In Your Collection</p>}
    </div>
  );
};

export default CollectionListCard;