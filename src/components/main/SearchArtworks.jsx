import { useState } from "react";
import "../styling/searchBar.css";
import { useNavigate } from "react-router";
import "../styling/singleArtwork.css"


const SearchArtworks = ({ onSearch }) => {
	const [currentSearchTerm, setCurrentSearchTerm] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	const handleChange = (event) => {
		setCurrentSearchTerm(event.target.value);
		setErrorMessage("");
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (currentSearchTerm.trim()) {
			setErrorMessage("");
			navigate(`/collections?q=${currentSearchTerm}`);
		}else{
			setErrorMessage("Please enter a search term before searching.")
		}
	};

	return (

		<form className="search-bar-container" onSubmit={handleSubmit}>
			<label id="enterString">What are you looking for...</label>
			<input
			   type="text"
			    name="input-box"
			    placeholder="E.g Art, Department, Artist..."
				id="input-box"
				label="search term..."
				onChange={handleChange}
				value={currentSearchTerm}
			></input>
			<button type="submit">search</button>
			{errorMessage && <p className="alert-design">{errorMessage}</p>}
		</form>
	);
};

export default SearchArtworks;
