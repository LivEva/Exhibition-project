import {
	fetchAllHarvardObjectList,
	fetchAllVAObjectList,
} from "../../API's/museumApi";
import { useEffect, useState } from "react";
import CollectionListCard from "../cards/CollectionListCard";
import "../../styling/exhibitionCollection.css";
import SearchArtworks from "../main/SearchArtworks";
import PaginationElement from "../main/Pagination";

const ArtworkCollection = () => {
	const [collections, setCollections] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [eachPage, setEachPage] = useState(1);
	const [query, setQuery] = useState("");

	const handleSearch = (searchQuery) => {
		setQuery(searchQuery);
		setEachPage(1);
	};

	const fetchCollections = () => {
		if (!query) {
			return;
		}

		setIsLoading(true);
		Promise.all([
			fetchAllHarvardObjectList(query, {}, eachPage),
			fetchAllVAObjectList(query, {}, eachPage),
		])
			.then(([harvardCollection, vaCollection]) => {
				const combinedCollections = [
					...harvardCollection.map((item) => ({
						id: item.id,
						source: "Harvard",
						title: item.title,
						image: item.primaryimageurl || "no image",
						type: item.division,
						dimensions: item.dimensions,
						century: item.century,
						date: item.dated,
						department: item.department,
						origin: item.provenance,
						location: item.creditline,
					})),
					...vaCollection.map((item) => ({
						id: item.systemNumber,
						source: "va",
						title: item._primaryTitle,
						image:
							item._images?._iiif_image_base_url + "full/full/0/default.jpg",
						type: item.objectType,
						location: (item._currentLocation.site =
							"Victoria and Albert Museum"),
						date: item._primaryDate,
					})),
				];

				setCollections(combinedCollections);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching collections:", error);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchCollections();
	}, [eachPage, query]);

	return (
		<div className="collection">
			<div className="search-and-pagination-container">
				<SearchArtworks onSearch={handleSearch} />

				<h3>Results for: {query}</h3>

				<PaginationElement setEachPage={setEachPage} eachPage={eachPage} />
			</div>

			<div className="collection-container">
				{isLoading ? (
					<h2>Loading Collections...</h2>
				) : (
					collections.map((item, id) => (
						<CollectionListCard item={item} key={id} />
					))
				)}
			</div>
		</div>
	);
};

export default ArtworkCollection;
