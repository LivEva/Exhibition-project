import "../styling/home.css";
import homeImage from '../../images/homeImage.webp'

const Home = () => {
	return (
		<div className="home-container">
  <div className="hero-section">
    <div className="masking-container">
    <h1 className="masked-text">
      Welcome to the <span className="V">Virtual Exhibition</span>
    </h1>
    </div>

    <div className="lower-content">
      <div className="overlay-text">
        <p><strong>Discover Art & Antiquities Like Never Before.</strong> Step into immersive virtual exhibitions combining fine art and ancient artifacts.</p>
        <p>Designed for curious minds—students, researchers, and enthusiasts alike—our platform offers powerful search tools and interactive displays to explore the past in new ways.</p>
      </div>
      <div className="info">
        <p>Japanese Resting on the Mountain, Emil Orlik, 1870–1932</p>
      </div>
    </div>
  </div>
</div>

	  
	);
};

export default Home;
