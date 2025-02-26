import "../styling/navBar.css";
import { Link } from "react-router";
import Header from '../main/Header'

const NavBar = () => {
	return (
		<div className="nav-bar-container">
			<div className="logo">
				<Header />
			</div>
			<div className="buttons">
				<Link to={"/myExhibitions"}>
					<button className="nav-button">My Artwork</button>
				</Link>
				<Link to={"/Home"}>
					<button className="nav-button">Home</button>
				</Link>
			</div>
		</div>
	);
};

export default NavBar;


