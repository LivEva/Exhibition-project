import ArtworkCollection from "./components/pages/ArtworkCollection";
import SearchArtworks from "./components/main/SearchArtworks";
import SingleArtwork from "./components/pages/SingleArtwork";
import SavedExhibitions from './components/pages/SavedExhibitions';
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import NavBar from "./components/main/NavBar";
import Home from "./components/pages/Home";
import { Routes, Route, Navigate } from "react-router";

function App() {
	return (
		<>
			<Header />

			<div className="nav-bar-container">

			<SearchArtworks />

			<NavBar />

			</div>

			<Routes>
				
				<Route path="/" element={<Navigate to="/Home" replace />} />

				<Route path="/collections" element={<ArtworkCollection />} />

				<Route path="/Home" element={<Home />} />

				<Route path="/object/:source/:id" element={<SingleArtwork />} />

				<Route path="/myExhibitions" element={<SavedExhibitions/>} />

			</Routes>

			<Footer />
		</>
	);
}

export default App;
