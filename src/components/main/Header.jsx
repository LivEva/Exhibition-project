import "../styling/header.css";
import { Link } from "react-router";



const Header = () => {
	return (
		<div className="header-container">
			<Link to={"/Home"}>
				<button><h1 className="V">V</h1>
				<h1 className="T">E</h1>
				<h1 className="A">x</h1>
				</button>
			</Link>
		</div>
	);
};

export default Header;
