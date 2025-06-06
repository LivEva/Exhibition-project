import { useEffect, useState } from "react";
import "../styling/filter.css";
import ObjectCategories from "./ObjectCategories";
import SortBy from './Sortby'

const Filters = ({ collections, setFilteredArtwork, selectedCategory, onSelect, orderOnSelect }) => {
	const [selectedSource, setSelectedSource] = useState("");
	const [selectedType, setSelectedType] = useState("");


	useEffect(() => {
		let filtered = collections;

		if (selectedSource) {
			filtered = filtered.filter((art) => art.source === selectedSource);
		}


		setFilteredArtwork(filtered);
	}, [selectedSource, selectedType, collections, setFilteredArtwork]);

	return (
		<div className="filter-container">
			<select
				onChange={(e) => setSelectedSource(e.target.value)}
				value={selectedSource}
				className="filter-box"
				aria-label="filter options for search"
				label="filter options for search"
			>
				<option value="">All locations</option>
				<option value="Harvard">Harvard Museum</option>
				<option value="VA">Victoria and Albert Museum</option>
			</select>

			<ObjectCategories onSelect={selectedCategory}/>

			<SortBy onSelect={onSelect} orderOnSelect={orderOnSelect}/>
			
		</div>
	);
};

export default Filters;
