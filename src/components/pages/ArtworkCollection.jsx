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
import ErrorCard from "../cards/ErrorCard";
import NavBar from "../main/NavBar";



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
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page")) || 1;
  
    setEachPage(page);
  
    if (!query.trim()) return;
  
    setIsLoading(true);
    setError(null);
  
    fetchAllObjects(query, page, sortBy, sortOrder, selectedCategory)
      .then((response) => {
        if (response.length === 0) {
          setError(true);
        } else {
          setError(false);
        }
        setCollections(response);
        setFilteredCollections(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error, "ERROR FETCHING ARTWORK");
        setError(error.message);
        setIsLoading(false);
      });
  
  }, [searchParams, sortBy, sortOrder, selectedCategory]);
  

  const totalItems = collections.length;
  const totalPages = useMemo(() => Math.ceil(totalItems / 10), [totalItems]);

  return (
    <div className="collection">

      <NavBar/>

      <Filters
        collections={collections}
        setFilteredArtwork={setFilteredCollections}
        selectedCategory={setSelectedCategory}
        onSelect={setSortBy} 
        orderOnSelect={setSortOrder} 
      />

      {/* <SortBy onSelect={setSortBy} orderOnSelect={setSortOrder} /> */}

      <div className="collection-container">
        {isLoading ? (
      
          Array(Math.max(filteredCollections.length, 10))
            .fill(0)
            .map((_, index) => <SkeletonCard key={index} />)
        ) : error ? (
          <ErrorCard error={error} /> ) : (
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
