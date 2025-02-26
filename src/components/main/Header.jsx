import "../styling/header.css";
import { Link } from "react-router";
import logo from '../../images/logo.jpeg'

const Header = () => {
	return (
		<div className="header-container">
			<Link to={"/Home"}>
				<img src={logo} alt="website logo" id="logo"/>
			</Link>
		</div>
	);
};

export default Header;
