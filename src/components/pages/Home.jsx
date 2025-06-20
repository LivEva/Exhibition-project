import "../styling/home.css";
import homeImage from '../../images/homeImage.webp'
import { useNavigate } from "react-router-dom";
import door from '../../images/door.png'

const Home = () => {

  const navigate = useNavigate();

	return (
		<div className="home-container">

  <div className="hero-section">

    <div className="masking-container">

    <h1 className="masked-text">

      <span className="W">Welcome to </span><span className="V">the Virtual Exhibition</span>

    </h1>

    <img src={door} alt="An icon of an exhibition behind a railing" onClick={() => { navigate("/home")}}/>

</div>    
  </div>
</div>

	  
	);
};

export default Home;
