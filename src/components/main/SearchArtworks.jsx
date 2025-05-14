import { useState } from "react";
import "../styling/searchBar.css";
import { useNavigate } from "react-router";
import "../styling/singleArtwork.css"
import { div } from "framer-motion/client";


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
		
	}

	return (
<div className="search-wrapper">
		<form className="search-bar-container" onSubmit={handleSubmit}>
			<label id="enterString"></label>
			<input
			   type="text"
			    name="input-box"
			    placeholder="E.g Art, Department, Artist..."
				className="input-box"
				label="search term..."
				onChange={handleChange}
				value={currentSearchTerm}
			></input>

			<button type="submit">search</button>
			{errorMessage && <p className="alert-design">{errorMessage}hello</p>}
	
		</form>
		</div>
	);
};

export default SearchArtworks;
