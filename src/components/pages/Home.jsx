import "../styling/home.css";
import homeImage from '../../images/homeImage.webp'

const Home = () => {
	return (
		<div className="home-container">
			<h1>Virtual Exhibition</h1>
			<img src={homeImage} alt="image the artwork Japanese Resting on the Mountain by Emil Orlik" ></img>
			<div className="info">
				<p>Japanese Resting on the Mountain</p>
				<p>Emil Orlik</p>
				<p>1870-1932</p>
			</div>
		</div>
	);
};

export default Home;
