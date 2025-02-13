import { fetchAllObjects } from "../../API's/museumApi";
import { useEffect, useState } from "react";
import CollectionListCard from "../cards/CollectionListCard";
import "../../styling/exhibitionCollection.css";
import Filter from "../main/Filter";
import PaginationElement from "../main/Pagination";
import { useSearchParams } from "react-router-dom";
import SortBy from "../main/Sortby";
import { useLocation } from "react-router-dom";

const ArtworkCollection = () => {
	const [collections, setCollections] = useState([]);
	const [filteredCollections, setFilteredCollections] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [eachPage, setEachPage] = useState(1);
	const [query, setQuery] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const [sortByCriteria, setSortByCriteria] = useState("created_at");
	const [sortOrder, setSortOrder] = useState("desc");
	const location = useLocation();

	useEffect(() => {
		const sort_by = searchParams.get("sort_by") || "created_at";
		const order = searchParams.get("order") || "desc";
		const query = searchParams.get("q");

		if (query?.trim()) {
			setIsLoading(true);
			fetchAllObjects(query, eachPage, sort_by, order)
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
	}, [query, eachPage, location]);

	return (
		<div className="collection">
			<div className="search-and-pagination-container">
				<SortBy
					setSearchParams={setSearchParams}
					setSortByCriteria={setSortByCriteria}
					setSortOrder={setSortOrder}
					sortByCriteria={sortByCriteria}
					sortOrder={sortOrder}
				/>

				<h3>Results for: {query}</h3>

				<PaginationElement setEachPage={setEachPage} eachPage={eachPage} />
			</div>

			<Filter
				collections={collections}
				setFilteredCollections={setFilteredCollections}
			/>

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
