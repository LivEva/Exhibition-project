import ArtworkCollection from "./components/pages/ArtworkCollection";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import NavBar from "./components/main/NavBar";
import Filter from "./components/main/Filter";
import Home from "./components/pages/Home";
import SingleArtwork from "./components/pages/SingleArtwork";
import { Routes, Route, Navigate, useLocation, Router } from "react-router";

function App() {
	return (
		<>
			<Header />

			<NavBar />

			<Filter />

			<ArtworkCollection />

			<Routes>
				<Route path="/collections" element={<ArtworkCollection />} />
				<Route path="/" element={<Navigate to="/Home" replace />} />
				<Route path="/Home" element={<Home />} />

				<Route
					path="/object/:source/:id"
					element={<SingleArtwork key={window.location.pathname} />}
				/>
			</Routes>

			<Footer />
		</>
	);
}

export default App;
