import { useState } from "react";
import "../../styling/searchBar.css";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const SearchArtworks = ({ onSearch }) => {
	const [currentSearchTerm, setCurrentSearchTerm] = useState("");

	const navigate = useNavigate();

	const handleChange = (event) => {
		setCurrentSearchTerm(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (currentSearchTerm.trim()) {
	
			navigate(`/collections?q=${currentSearchTerm}`);
		}
	};

	return (
		<form className="search-bar-container" onSubmit={handleSubmit}>
			<label id="enterString">E.g Art, Department, Artist...</label>

			<input
				id="input-box"
				label="search term..."
				onChange={handleChange}
				value={currentSearchTerm}
			></input>
			<button type="submit">search</button>
		</form>
	);
};

export default SearchArtworks;
