import React, {useState} from "react";
import { Link } from "react-router-dom";
import Weather from "../Weather";
import ComponentPriceGraph from "../CropPriceGraph";
import MyFarms from "../Farms/MyFarms";
import "../../css/main.css";
import FunFacts from "../FunFacts";
import CropRecommendation from "../CropRecomendation";
import Tips from "../Tips";
import { BiRightTopArrowCircle } from "react-icons/bi";
// import TopCropsChart from "../TopCropChart"; 
import WeatherWidget from "../weatherWidget";
// import TopCropsChart from "../TopCropChart";
import TranslationComponent from "../TranslationComponent";

const Main = () => {
  const userId = localStorage.getItem("userId");
  console.log(userId);

// State to manage location
const [location, setLocation] = useState("Delhi");

// Function to handle location change
const handleLocationChange = (newLocation) => {
  setLocation(newLocation);
  console.log(`Location changed to: ${newLocation}`);
};

  return (
    <main className="main-layout">
      <div className="weather-info">
        <h3>Weather Information</h3>
        <WeatherWidget />
      </div>

      <div className="my-farms ">
        <h3>My Farms</h3>
        <Link to="/my-farms">
          <BiRightTopArrowCircle style={{ fontSize: "30px", color: "grey" }} />
        </Link>
        <MyFarms userId={userId} />
        <Link to="/add-farm">Add a New Farm</Link>
      </div>

      <div className="crop-info">
        <h3>Crop Price Graph</h3>
        <ComponentPriceGraph />
      </div>

      {/* <div className="top-crops-chart">
        <h3>Top 5 Crops by Estimated Revenue</h3>
        <TopCropsChart onLocationChange={handleLocationChange} location={location} />
        </div> */}

      <div className="fun-facts">
        <FunFacts />
        {/* <Tips /> */}
      </div>

      {/* <div className="cropRecomendation">
        <h3>Crop Recommendation</h3>
        <div className="cropRecomendation-content">
          <CropRecommendation ownerId={userId} />
        </div>
      </div>
      <div className="translation-component">
        <TranslationComponent />
      </div>
      </div> */}
    </main>
  );
};

export default Main;
