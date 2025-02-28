import { fetchAllObjects } from "../../API/museumApi";
import { useEffect, useState } from "react";
import CollectionListCard from "../cards/CollectionListCard";
import SkeletonCard from '../main/SkeletonCard';
import '../styling/collectionListCard.css';
import Filters from "../main/Filters";
import PaginationElement from "../main/Pagination";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SortBy from "../main/Sortby";
import { useMemo } from "react";
import { Alert } from "@heroui/react";


const ArtworkCollection = () => {
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [eachPage, setEachPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState("");
  const [noArtError, setNoArtError] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const query = searchParams.get("q");

    setIsLoading(true);

    if (query?.trim()) {
    
      fetchAllObjects(query, eachPage, sortBy, sortOrder, selectedCategory)
        .then((response) => {
          setCollections(response);
          setFilteredCollections(response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error, "ERROR FETCHING ARTWORK");
          setIsLoading(false);
        });
    }
  }, [query, eachPage, location, sortBy, sortOrder, selectedCategory]);

  const totalItems = collections.length;
  const totalPages = useMemo(() => Math.ceil(totalItems / 10), [totalItems]);


  return (
    <div className="collection">

     

      <Filters
        collections={collections}
        setFilteredArtwork={setFilteredCollections}
        selectedCategory={setSelectedCategory}
      />

      <SortBy onSelect={setSortBy} orderOnSelect={setSortOrder} />

      <div className="collection-container">
        {isLoading ? (
      
          Array(Math.max(filteredCollections.length, 10))
            .fill(0)
            .map((_, index) => <SkeletonCard key={index} />)
        ) : (
          filteredCollections.map((item) => (
            <CollectionListCard item={item} key={item.id} />
          ))
        )}
      </div>
      <div className="search-and-pagination-container">
       
        <PaginationElement setEachPage={setEachPage} eachPage={eachPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ArtworkCollection;
