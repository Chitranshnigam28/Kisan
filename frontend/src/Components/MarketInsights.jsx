import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/insigtsAiData.css";
import barleyImg from "../Assets/Vegetables/barley.png";
import bitterGourdImg from "../Assets/Vegetables/bitter-gourd.png";
import cabbageImg from "../Assets/Vegetables/cabbage.png";
import cauliflowerImg from "../Assets/Vegetables/cauliflower.png";
import coffeeBeansImg from "../Assets/Vegetables/coffee-beans.png";
import cornImg from "../Assets/Vegetables/Corn.svg";
import eggplantImg from "../Assets/Vegetables/eggplant.png";
import garlicImg from "../Assets/Vegetables/garlic.png";
import greenTeaImg from "../Assets/Vegetables/green-tea.png";
import jowarImg from "../Assets/Vegetables/jowar.png";
import maizeImg from "../Assets/Vegetables/maize.svg";
import onionImg from "../Assets/Vegetables/onion.png";
import peaImg from "../Assets/Vegetables/pea.png";
import potatoImg from "../Assets/Vegetables/Potato.svg";
import pumpkinImg from "../Assets/Vegetables/pumpkin.png";
import sesameImg from "../Assets/Vegetables/sesame.png";
import soyImg from "../Assets/Vegetables/Soy.svg";
import soybeanImg from "../Assets/Vegetables/soyabean.png";
import spinachImg from "../Assets/Vegetables/spinach.png";
import sugarCaneImg from "../Assets/Vegetables/sugar-cane.png";
import tobaccoImg from "../Assets/Vegetables/tobacco.png";
import tomatoImg from "../Assets/Vegetables/tomato.png";
import wheatImg from "../Assets/Vegetables/wheat.png";
import bajra from "../Assets/Vegetables/plant.png";
import cotton from "../Assets/Vegetables/cotton.png";
import rice from "../Assets/Vegetables/rice.png";
import ragi from "../Assets/Vegetables/ragi.png";
import groundnut from "../Assets/Vegetables/groundnut.png";
import marketInsights from "../Assets/marketinsights.svg";

const MarketInsights = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const fetchMarketInsights = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/get-market-insights/"
        );
        setInsights(response.data.crops); // Access the data directly
      } catch (error) {
        console.error("Error fetching market insights:", error);
      }
    };

    fetchMarketInsights();
  }, []);

  // Function to get crop icons
  const getCropIcon = (cropName) => {
    switch (cropName.toLowerCase()) {
      case "rice":
        return rice;
      case "wheat":
        return wheatImg;
      case "maize":
        return cornImg;
      case "cotton":
        return cotton;
      case "sugarcane":
        return sugarCaneImg;
      case "barley":
        return barleyImg;
      case "millet":
        return cornImg;
      case "tobacco":
        return tobaccoImg;
      case "cabbage":
        return cabbageImg;
      case "onion":
        return onionImg;
      case "garlic":
        return garlicImg;
      case "cauliflower":
        return cauliflowerImg;
      case "spinach":
        return spinachImg;
      case "tomato":
        return tomatoImg;
      case "pumpkin":
        return pumpkinImg;
      case "eggplant":
        return eggplantImg;
      case "bitter gourd":
        return bitterGourdImg;
      case "tea":
        return greenTeaImg;
      case "coffee":
        return coffeeBeansImg;
      case "jowar":
        return jowarImg;
      case "bajra":
        return bajra;
      case "potato":
        return potatoImg;
      case "peas":
        return peaImg;
      case "ragi":
        return ragi;
      case "soybean":
        return soybeanImg;
      case "sesame":
        return sesameImg;
      case "groundnut":
        return groundnut;
      default:
        return "🌿"; // Default icon for other crops
    }
  };

  return (
    <div className="market-insights-container">
      <h2 className="market-insights-title">
        {" "}
        <img
          src={marketInsights}
          alt="Market Insights"
          className="market-insights-icon"
        />
        Market Insights
      </h2>
      {insights.length > 0 ? (
        <ul className="market-insights-list">
          {insights.map((crop, index) => (
            <li key={index} className="market-insights-item">
              <img
                src={getCropIcon(crop.crop_name)}
                alt={crop.crop_name}
                className="crop-icon"
              />
              <div className="crop-info">
                <h3 className="crop-name">{crop.crop_name}</h3>
                <p className="crop-location">{crop.state}</p>
              </div>
              <p
                className={`price-trend ${
                  crop.price_trend.startsWith("+") ? "positive" : "negative"
                }`}
              >
                {crop.price_trend}
              </p>
              <p className="current-price">{crop.current_price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="loading-text">Loading market insights...</p>
      )}
    </div>
  );
};

export default MarketInsights;
