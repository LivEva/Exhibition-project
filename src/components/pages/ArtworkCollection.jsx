import { fetchAllObjects } from "../../API/museumApi";
import { useEffect, useState } from "react";
import CollectionListCard from "../cards/CollectionListCard";
import "../../styling/exhibitionCollection.css";
import Filters from "../main/Filters";
import PaginationElement from "../main/Pagination";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SortBy from "../main/Sortby";

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

	const location = useLocation();

	useEffect(() => {
	
		const query = searchParams.get("q");

		if (query?.trim()) {
			setIsLoading(true);
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

	console.log(selectedCategory)


	return (
		<div className="collection">
			<div className="search-and-pagination-container">
			

				<h3>Results for: {query}</h3>

				<PaginationElement setEachPage={setEachPage} eachPage={eachPage} />
			</div>

			<Filters
				collections={collections}
				setFilteredArtwork={setFilteredCollections}
				selectedCategory={setSelectedCategory}
			/>

			<SortBy onSelect={setSortBy} orderOnSelect={setSortOrder}/>

			<div className="collection-container">
				{isLoading ? (
					<h2>Loading Collections...</h2>
				) : (
					filteredCollections.map((item) => (
						<CollectionListCard item={item} key={item.id} />
					))
				)}
			</div>
		</div>
	);
};

export default ArtworkCollection;
