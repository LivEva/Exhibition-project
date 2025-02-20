import { useEffect, useState } from "react";
import "../../styling/filter.css";

const Filters = ({ collections, setFilteredArtwork }) => {
	const [selectedSource, setSelectedSource] = useState("");
	const [selectedType, setSelectedType] = useState("");
	const [uniqueTypes, setUniqueTypes] = useState([]);

	useEffect(() => {
		if (collections.length > 0) {
			const typeCounts = collections.reduce((acc, art) => {
				acc[art.type] = (acc[art.type] || 0) + 1;
				return acc;
			}, {});
			setUniqueTypes(typeCounts);
		}
	}, [collections]);

	useEffect(() => {
		let filtered = collections;

		if (selectedSource) {
			filtered = filtered.filter((art) => art.source === selectedSource);
		}

		if (selectedType) {
			filtered = filtered.filter((art) => art.type === selectedType);
		}

		setFilteredArtwork(filtered);
	}, [selectedSource, selectedType, collections, setFilteredArtwork]);

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
			<select
				onChange={(e) => setSelectedType(e.target.value)}
				value={selectedType}
			>
				<option value="">All types</option>
				{Object.entries(uniqueTypes).map(([type, count]) => (
					<option value={type} key={type}>
						{type} ({count})
					</option>
				))}
			</select>
		</div>
	);
};

export default Filters;
