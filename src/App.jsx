import { Route, Routes, Navigate } from "react-router-dom";
import ExhibitionCollection from "./components/pages/ExhibitionCollection";
import SingleExhibitionItem from "./components/pages/SingleCollectionItem";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import NavBar from "./components/main/NavBar";

function App() {
	return (
		<>
			<Header />

			<NavBar />

			<Routes>
				<Route path="/" element={<Navigate to="/exhibition" replace />} />
				<Route path="/exhibition" element={<ExhibitionCollection />} />
				<Route
					path="/exhibition/:object_id"
					element={<SingleExhibitionItem />}
				/>
			</Routes>

			<Footer />
		</>
	);
}

export default App;
