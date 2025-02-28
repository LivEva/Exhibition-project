import { useState } from "react";
import { Link } from "react-router";
import Header from "../main/Header";
import "../styling/navBar.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
	setMenuOpen(false);  
}

  return (
    <div className="nav-bar-container">
      <div className="logo">
        <Header />
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <nav className={`buttons ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to={"/myExhibitions"} onClick={closeMenu}>
              <button className="nav-button">My Artwork</button>
            </Link>
          </li>
          <li>
            <Link to={"/Home"} onClick={closeMenu}>
              <button className="nav-button">Home</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
