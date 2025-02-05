import "../../styling/navBar.css";

const NavBar = () => {
	return (
		<div className="nav-bar-container">
			<div className="buttons">
				<button>Collections</button>
				<button>Exhibitions</button>
				<button>My Artwork</button>
			</div>
		</div>
	);
};

export default NavBar;
