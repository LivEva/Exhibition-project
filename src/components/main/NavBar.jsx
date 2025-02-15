import "../../styling/navBar.css";
import { Link } from "react-router";

const NavBar = () => {
	return (
		<div className="nav-bar-container">
			<div className="buttons">
				<button>Collections</button>
				<button>Exhibitions</button>
				<Link to={"/myExhibitions"}>
					<button>My Artwork</button>
				</Link>
			</div>
		</div>
	);
};

export default NavBar;
