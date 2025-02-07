import "../../styling/header.css";
import { Link } from "react-router";

const Header = () => {
	return (
		<div className="header-container">
			<Link to={"/Home"}>
				<h1>Exhibition Time</h1>
			</Link>
		</div>
	);
};

export default Header;
