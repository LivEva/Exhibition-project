import { useEffect, useState } from "react";
import "../../styling/filter.css";

const Filter = ({ collections, setFilteredCollections }) => {
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

		setFilteredCollections(filtered);
	}, [
		selectedSource,
		collections,
		setFilteredCollections,
		selectedType,
		selectedYear,
	]);

	const typeFilterOptions = collections.map((type) => {
		return type.type;
	});

	const yearFilterOptions = collections.map((year) => {
		return year.yearAdded;
	});

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
				<option value="">
					{typeFilterOptions.map((type, id) => {
						<option key={id} type={type}>
							{type}
						</option>;
					})}
				</option>
			</select>
		</div>
	);
};

export default Filter;
