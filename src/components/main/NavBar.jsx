import "../../styling/navBar.css";

const NavBar = () => {
	return (
		<div className="nav-bar-container">
			<h2>This is the navbar!</h2>

			<div className="buttons">
				<button>Collections</button>
				<button>Exhibitions</button>
				<button>My artwork</button>
			</div>
		</div>
	);
};

export default NavBar;
