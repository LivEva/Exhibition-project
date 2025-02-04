import { Route, Routes, Navigate } from "react-router-dom";
import ExhibitionCollection from "./components/pages/ExhibitionCollection";
// import SingleExhibitionItem from "./components/pages/SingleCollectionItem";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import NavBar from "./components/main/NavBar";
import VACollectionList from "./components/pages/VACollectionList";

function App() {
	return (
		<>
			<Header />

			<NavBar />

			<ExhibitionCollection />

			<VACollectionList />

			<Footer />
		</>
	);
}

export default App;
