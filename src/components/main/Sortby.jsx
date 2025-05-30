import { useState } from "react";
import '../styling/filter.css';

const sortOptions = [
	{ id: "date", vna: "date", harvard: "century", label: "Date" },
	{ id: "location", vna: "location", harvard: "department", label: "Location" },
	{ id: "place", vna: "place", harvard: "period", label: "Place" },
  ];
  const SortBy = ({onSelect, orderOnSelect}) => {
	const [selectedSort, setSelectedSort] = useState("");
	const [selectedOrder, setSelectedOrder] = useState();
	
	const handleChange = (event) => {

	  const newValue = event.target.value;
	  setSelectedSort(newValue)
	  onSelect(newValue);
	  
	};

	const handleOrderChange = (event) => {

		const newValue = event.target.value;
		setSelectedOrder(newValue);
		orderOnSelect(newValue);
	
	}
	
	return (
	  <div className="sort-by-container">


		<select onChange={handleChange} value={selectedSort} className="sort-by-box" aria-label="sort-by-options" label="sort-by options">
		  <option value="">Select Sort</option>
		  {sortOptions.map((option) => (
			<option key={option.id} value={option.id}>
			  {option.label}
			</option>
		  ))}
		</select>
	
		<select onChange={handleOrderChange} value={selectedOrder} className="sort-by-box" aria-label="asc-and-desc-sort-by" label="asc-and-desc-sort-by">
			<option value="asc">asc</option>
			<option value="desc">desc</option>
		</select>
	
	  </div>
	);
  };

  export default SortBy;