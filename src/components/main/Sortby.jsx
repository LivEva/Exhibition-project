import { useState } from "react";

const sortOptions = [
	{ id: "date", vna: "date", harvard: "century", label: "Date" },
	{ id: "location", vna: "location", harvard: "department", label: "Location" },
	{ id: "place", vna: "place", harvard: "period", label: "Place" },
  ];
  const SortBy = ({onSelect}) => {
	const [selectedSort, setSelectedSort] = useState("");
	
	const handleChange = (event) => {
	  const newValue = event.target.value;
	  setSelectedSort(newValue)
	  onSelect(newValue);
	};


	return (
	  <div>
		<select onChange={handleChange} value={selectedSort}>
		  <option value="">Select Sort</option>
		  {sortOptions.map((option) => (
			<option key={option.id} value={option.id}>
			  {option.label}
			</option>
		  ))}
		</select>
	  </div>
	);
  };
  export default SortBy;