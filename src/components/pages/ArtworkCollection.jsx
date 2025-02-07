import {
	fetchAllHarvardObjectList,
	fetchAllVAObjectList,
} from "../../API's/museumApi";
import { useState } from "react";
import CollectionListCard from "../cards/CollectionListCard";
import "../../styling/exhibitionCollection.css";
import SearchArtworks from "../main/SearchArtworks";
import Pagination from "../main/Pagination";

const ArtworkCollection = () => {
	const [collections, setCollections] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const [onPageChange, setOnPageChange] = useState();

	const handleSearch = (query) => {
		setIsLoading(true);
		Promise.all([fetchAllHarvardObjectList(query), fetchAllVAObjectList(query)])
			.then(([harvardCollection, vaCollection]) => {
				const combinedCollections = [
					...harvardCollection.map((item) => ({
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
						title: item._primaryTitle,
						image:
							item._images?._iiif_image_base_url + "full/full/0/default.jpg",
						type: item.objectType,
						location: item._currentLocation.site,
						date: item._primaryDate,
					})),
				];
				console.log(combinedCollections);
				setCollections(combinedCollections);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching collections:", error);
				setIsLoading(false);
			});
	};

	return (
		<div className="collection-container">
			<SearchArtworks onSearch={handleSearch} />

			{isLoading ? (
				<h2>Loading Collections...</h2>
			) : (
				collections.map((item, id) => (
					<CollectionListCard key={id} item={item} />
				))
			)}
		</div>
	);
};

export default ArtworkCollection;
