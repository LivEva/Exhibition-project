import { Route, Routes, Navigate } from "react-router-dom";
import ExhibitionCollection from "./components/pages/ExhibitionCollection";
// import SingleExhibitionItem from "./components/pages/SingleCollectionItem";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import NavBar from "./components/main/NavBar";
import MetMuseumCollection from "./components/pages/MetMuseumCollection";

function App() {
	return (
		<>
			<Header />

			<NavBar />

			<ExhibitionCollection />

			<MetMuseumCollection />

			<Footer />
		</>
	);
}

export default App;
