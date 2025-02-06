import ArtworkCollection from "./components/pages/ArtworkCollection";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import NavBar from "./components/main/NavBar";
import SearchArtworks from "./components/main/SearchArtworks";

function App() {
	return (
		<>
			<Header />

			<NavBar />

			<ArtworkCollection />

			<Footer />
		</>
	);
}

export default App;
