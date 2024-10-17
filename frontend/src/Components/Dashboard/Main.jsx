import React from "react";
import { Link } from 'react-router-dom';
import Weather from "../Weather";
import ComponentPriceGraph from "../CropPriceGraph";
import AddFarms from "../AddFarms";
import '../../css/main.css';
import CropRecommendation from "../CropRecomendation";

const Main = () => {
  return (
    <main className="main-layout">
      <div className="weather-info">
        <h3>Weather Information</h3>
        <Weather />
      </div>

      <div className="my-farms">
        <h3>My Farms</h3>
        <Link to="/add-farm">Add a New Farm</Link>
        <div className="farms-cards">
          <div className="farm-card"></div>
          <div className="farm-card"></div>
          <div className="farm-card"></div>
        </div>
      </div>

      <div className="crop-info">
        <h3>Crop Price Graph</h3>
        <ComponentPriceGraph />
      </div>

      <div className="tips">
        <h3>Tips</h3>
        <div className="tips-content">
          Content Here
        </div>
      </div>

      <div className="cropRecomendation">
        <h3>Crop Recommendation</h3>
        <div className="cropRecomendation-content">
          <CropRecommendation ownerId="66f92acd44f00ac86e5adac1"></CropRecommendation>
        </div>
      </div>
    </main>
  );
};

export default Main;
