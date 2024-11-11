import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WeatherWidget from "../weatherWidget";
import MyFarms from "../Farms/MyFarms";
import TopCropsChart from "../TopCropChart";
import TopCropIndia from "../TopCropIndia";
import Loader from "../Loader";
import FunFacts from "../FunFacts";
import { BiRightTopArrowCircle } from "react-icons/bi";
import "../../css/main.css";

const Main = () => {
  const userId = localStorage.getItem("userId");
  console.log(userId);

  // State to manage location and loading states
  const [location, setLocation] = useState("Delhi");
  const [isLoading, setIsLoading] = useState(true);

  // Function to handle location change
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    console.log(`Location changed to: ${newLocation}`);
  };

  // Set a timeout to simulate loading for TopCropIndia and TopCropsChart
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // 10 seconds

    // Clean up timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <main className="main-layout">
        
        <div className="weather-info">
          <Link
            to="/weather"
            onClick={() => {
              if (typeof setShowOverlay === "function") {
                setShowOverlay(false);
              }
            }}
          >
            <BiRightTopArrowCircle
              style={{ fontSize: "30px", color: "grey" }}
            />
          </Link>
          <WeatherWidget />
        </div>

        <div className="my-farms">
          <Link to="/my-farms">
            <BiRightTopArrowCircle
              style={{ fontSize: "30px", color: "grey" }}
            />
          </Link>
          <MyFarms userId={userId} />
        </div>

        <div className="dashboard-marketview">
          <Link to="/charts">
            <BiRightTopArrowCircle
              style={{ fontSize: "30px", color: "grey", float: "right" }}
            />
          </Link>
          <div className="insightsWrapper">
            {isLoading ? (
              <Loader /> // Show a single loader while components are loading
            ) : (
              <>
                <div className="market-info">
                  <TopCropIndia />
                </div>
                <div className="top-crops">
                  <TopCropsChart
                    onLocationChange={handleLocationChange}
                    location={location}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="funFacts-Container">
          <FunFacts />
        </div>
      </main>
    </>
  );
};

export default Main;
