import React from "react";
import Weather from "../Weather";
import ComponentPriceGraph from "../CropPriceGraph";
import '../../css/main.css';
import FunFacts from "../FunFacts";

const Main = () => {
  return (
    <main className="main-layout">
      <div className="weather-info">
        <h3>Weather Information</h3>
        <Weather />
      </div>

      <div className="my-farms">
        <h3>My Farms</h3>
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

      <div className="fun-facts">
        <FunFacts />
      </div>
    </main>
  );
};

export default Main;
