import { Routes, Route, Navigate } from "react-router";
import ArtworkCollection from "./components/pages/ArtworkCollection";
import SearchArtworks from "./components/main/SearchArtworks";
import SingleArtwork from "./components/pages/SingleArtwork";
import SavedExhibitions from './components/pages/SavedExhibitions';
import NavBar from "./components/main/NavBar";
import Footer from "./components/main/Footer";
import Home from "./components/pages/Home";

function App() {
    return (
        <div className="app-wrapper">
            <NavBar />
            <SearchArtworks />
            
            <main className="content">
                <Routes>
                    <Route path="/" element={<Navigate to="/Home" replace />} />
                    <Route path="/collections" element={<ArtworkCollection />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/object/:source/:id" element={<SingleArtwork />} />
                    <Route path="/myExhibitions" element={<SavedExhibitions />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
