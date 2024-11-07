import React, { useState } from "react";
import { Link } from "react-router-dom";
import Weather from "../Weather";
import ComponentPriceGraph from "../CropPriceGraph";
import MyFarms from "../Farms/MyFarms";
import "../../css/main.css";
import FunFacts from "../FunFacts";
import { BiRightTopArrowCircle } from "react-icons/bi";
import TopCropsChart from "../TopCropChart";
import WeatherWidget from "../weatherWidget";
import MarketInsights from "../MarketInsights";

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
    <>
      <main className="main-layout">
        <div className="weather-info">
          <Link to="/weather">
            <BiRightTopArrowCircle style={{ fontSize: "30px", color: "grey" }} />
          </Link>
          <WeatherWidget />
        </div>

        <div className="my-farms ">
          <Link to="/my-farms">
            <BiRightTopArrowCircle style={{ fontSize: "30px", color: "grey" }} />
          </Link>
          <MyFarms userId={userId} />
        </div>

        <div className="dashboard-marketview">
        <Link to="/charts">
            <BiRightTopArrowCircle style={{ fontSize: "30px", color: "grey",float : "right" }} />
          </Link>
          <div className="insightsWrapper">
          
            <div className="market-info">
              <MarketInsights />
            </div>
            <div className="top-crops">
              <TopCropsChart
                onLocationChange={handleLocationChange}
                location={location}
              />
            </div>
          </div>
        </div>

        <FunFacts />
      </main>
    </>
  );
};
export default Main;
