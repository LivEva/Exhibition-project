import { Routes, Route, Navigate } from "react-router";
import ArtworkCollection from "./components/pages/ArtworkCollection";
import SearchArtworks from "./components/main/SearchArtworks";
import SingleArtwork from "./components/pages/SingleArtwork";
import SavedExhibitions from './components/pages/SavedExhibitions';
import NavBar from "./components/main/NavBar";
import Footer from "./components/main/Footer";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";

function App() {
    return (
        <div className="app-wrapper">
       
            <main className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Dashboard/>}/>
                    <Route path="/collections" element={<ArtworkCollection />} />
                    <Route path="/object/:source/:id" element={<SingleArtwork />} />
                    <Route path="/myExhibitions" element={<SavedExhibitions />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
