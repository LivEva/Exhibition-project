import { Route, Routes, Navigate } from "react-router-dom";
import ExhibitionCollection from "./components/pages/ExhibitionCollection";
import SingleExhibitionItem from "./components/pages/SingleCollectionItem";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Navigate to="/exhibition" replace />} />
				<Route path="/exhibition" element={<ExhibitionCollection />} />
				<Route
					path="/exhibition/:object_id"
					element={<SingleExhibitionItem />}
				/>
			</Routes>
		</>
	);
}

export default App;
