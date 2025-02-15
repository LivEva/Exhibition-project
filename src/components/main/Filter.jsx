import { useEffect, useState } from "react";
import "../../styling/filter.css";

const Filter = ({ collections, setFilteredArtwork }) => {
	const [selectedSource, setSelectedSource] = useState("");
	const [selectedType, setSelectedType] = useState("");
	const [uniqueTypes, setUniqueTypes] = useState([]);

	useEffect(() => {
		if (collections.length > 0) {
			const types = [...new Set(collections.map((art) => art.type))];
			setUniqueTypes(types);
		}
	}, [collections]);

	useEffect(() => {
		let filtered = collections;

		if (selectedSource) {
			filtered = collections.filter((art) => art.source === selectedSource);
		}

		if (selectedType) {
			filtered = collections.filter((art) => art.type === selectedType);
			console.log(filtered);
		}

		setFilteredArtwork(filtered);
	}, [selectedSource, collections, setFilteredArtwork, selectedType]);

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
				{uniqueTypes.map((type) => (
					<option value={type} key={type}>
						{type}
					</option>
				))}
			</select>
		</div>
	);
};

export default Filter;
