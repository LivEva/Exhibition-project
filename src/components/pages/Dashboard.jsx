import SearchArtworks from "../main/SearchArtworks";
import '../styling/dashboard.css'
import '../styling/header.css'
import flowers from '../../images/flowers.jpeg'
import lady from '../../images/lady.jpeg'
import japaneseArt from '../../images/japaneseArt.jpeg'


const Dashboard = () => {

    return (
        <div className="dashboard-container">

          <div className="header-section">

<h1>Discover Art & Antiquities Like Never Before...</h1>

</div>

<div className="search-bar">

<h1>Search our collection here...</h1>

        <SearchArtworks/>

        </div>

<div className="lower-content">

<div className="feature1">

    <p>Step into immersive virtual exhibitions combining fine art and ancient artifacts.</p>

    <img src={flowers} alt="A glass vase, containing a reflection of the window and light entering from the left, sitting on the edge of a marble topped table and containing a bouquet of various flowers and a stalk of wheat with several insects among the blooms" />



    </div>

  <div className="feature2">

    <img src={lady} alt="A woman sitting for a painting, posing among the trees with a book on her lap and a flower in her hand. " />

    <p>Browse through hundreds of items straight from the archives of the famous Victoria and Albert Museum in London and artifacts from the Harvard Museum</p>


  </div>

  <div className="feature3">

     <img src={japaneseArt} alt="Man and Woman Admiring Mount Fuji from a Snowy Pavilion" />

     <p>Designed for curious minds—students, researchers, and enthusiasts alike—our platform offers powerful search tools and interactive displays to explore the past in new ways.</p>
  

  </div>


</div> 


     
        </div>
    )

}

export default Dashboard;