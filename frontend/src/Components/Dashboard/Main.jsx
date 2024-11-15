import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WeatherWidget from "../weatherWidget";
import MyFarms from "../Farms/MyFarms";
import FunFacts from "../FunFacts";
import { BiRightTopArrowCircle } from "react-icons/bi";
import ChatBot from "../ChatBot";
import "../../css/dashboard.css";
import "../../css/main.css";
import MarketInsigtsDashboard from "../MarketInsigtsDashboard";

const Main = () => {
  const userId = localStorage.getItem("userId");
  console.log(userId);

  const [location, setLocation] = useState("Delhi");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <main className="main-layout">
        <div className="weather-info">
          {/* <Link
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
          </Link> */}
          <WeatherWidget />
        </div>

        <div className="my-farms">
          <MyFarms userId={userId} />
        </div>

        <div className="dashboard-marketview-part">
          <Link to="/charts" className="navigation-to-charts">
            <BiRightTopArrowCircle
              style={{ fontSize: "30px", color: "grey", float: "right" }}
            />
          </Link>
          <MarketInsigtsDashboard />
        </div>

        {/* <div className="chat-bot">
              <ChatBot/>
            </div> */}
        <div className="funFacts-Container">
          <FunFacts />
        </div>
      </main>
    </>
  );
};

export default Main;
