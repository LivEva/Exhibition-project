import "../styling/header.css";
import { Link } from "react-router";



const Header = () => {
	return (
		<div className="header-container">
			<Link to={"/home"}>
				<button><h1 className="V">V</h1>
				<h1>E</h1>
				<h1>X</h1>
				</button>
			</Link>
		</div>
	);
};

export default Header;
