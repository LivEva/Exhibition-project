import { useEffect, useState } from "react";
import "../styling/filter.css";
import ObjectCategories from "./ObjectCategories";



const Filters = ({ collections, setFilteredArtwork, selectedCategory }) => {
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
			>
				<option value="">All locations</option>
				<option value="Harvard">Harvard Museum</option>
				<option value="VA">Victoria and Albert Museum</option>
			</select>

			<ObjectCategories onSelect={selectedCategory}/>
			
		</div>
	);
};

export default Filters;
