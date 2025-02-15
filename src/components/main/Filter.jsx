import { useEffect, useState } from "react";
import "../../styling/filter.css";

const Filter = ({ collections, setFilteredArtwork }) => {
	const [selectedSource, setSelectedSource] = useState("");
	const [selectedType, setSelectedType] = useState("");
	const [selectedYear, setSelectedYear] = useState("");

	useEffect(() => {
		let filtered = collections;

		if (selectedSource) {
			filtered = collections.filter((art) => art.source === selectedSource);
		}

		if (selectedType) {
			filtered = collections.filter((art) => art.type === selectedType);
		}

		if (selectedYear) {
			filtered = collections.filter((art) => art.yearAdded === selectedYear);
		}

		setFilteredArtwork(filtered);
	}, [
		selectedSource,
		collections,
		setFilteredArtwork,
		selectedType,
		selectedYear,
	]);

	return (
		<div className="filter-container">
			<select
				onChange={(e) => setSelectedSource(e.target.value)}
				value={selectedSource}
			>
				<option value="">All locations</option>
				<option value="Harvard">Harvard Museum</option>
				<option value="VA">Victoria and Albert Museum</option>
			</select>
		</div>
	);
};

export default Filter;
