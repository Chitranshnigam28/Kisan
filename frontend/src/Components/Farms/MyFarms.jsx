import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MatchingTips, { deleteMyTips } from "../MatchingTips";
import MyFarmsSvg from "../../Assets/Logo/Myfarm.svg";
import "../../css/myFarms.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { BsArrowUpRightCircle } from "react-icons/bs";
import barleyImg from "../../Assets/Vegetables/barley.png";
import bitterGourdImg from "../../Assets/Vegetables/bitter-gourd.png";
import cabbageImg from "../../Assets/Vegetables/cabbage.png";
import cauliflowerImg from "../../Assets/Vegetables/cauliflower.png";
import coffeeBeansImg from "../../Assets/Vegetables/coffee-beans.png";
import cornImg from "../../Assets/Vegetables/Corn.svg";
import eggplantImg from "../../Assets/Vegetables/eggplant.png";
import garlicImg from "../../Assets/Vegetables/garlic.png";
import greenTeaImg from "../../Assets/Vegetables/green-tea.png";
import jowarImg from "../../Assets/Vegetables/jowar.png";
import maizeImg from "../../Assets/Vegetables/maize.svg";
import onionImg from "../../Assets/Vegetables/onion.png";
import peaImg from "../../Assets/Vegetables/pea.png";
import potatoImg from "../../Assets/Vegetables/Potato.svg";
import pumpkinImg from "../../Assets/Vegetables/pumpkin.png";
import sesameImg from "../../Assets/Vegetables/sesame.png";
import soyImg from "../../Assets/Vegetables/Soy.svg";
import soybeanImg from "../../Assets/Vegetables/soyabean.png";
import spinachImg from "../../Assets/Vegetables/spinach.png";
import sugarCaneImg from "../../Assets/Vegetables/sugar-cane.png";
import tobaccoImg from "../../Assets/Vegetables/tobacco.png";
import tomatoImg from "../../Assets/Vegetables/tomato.png";
import wheatImg from "../../Assets/Vegetables/wheat.png";
import bajra from "../../Assets/Vegetables/plant.png";
import cotton from "../../Assets/Vegetables/cotton.png";
import rice from "../../Assets/Vegetables/rice.png";
import ragi from "../../Assets/Vegetables/ragi.png";
import groundnut from "../../Assets/Vegetables/groundnut.png";
import AddFarms from "./AddFarms";
import EmptyFarms from "./EmptyFarms";
import Header from './../Dashboard/Header';
import {Footer} from './../Dashboard/Footer';

const MyFarms = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [matchedTips, setMatchedTips] = useState([]);
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [priceData, setPriceData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token not found");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5001/api/farms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userFarms = response.data.filter((farm) => farm.owner === userId);
        setFarms(userFarms);

        if (userFarms.length > 0 && location.pathname === "/my-farms") {
          setSelectedFarm(userFarms[0]);
        }
      } catch (err) {
        console.error("Error fetching farms:", err);
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();

    return () => clearInterval(fetchFarms);
  }, [userId, location.pathname]);

  useEffect(() => {
    const loadPriceData = async () => {
      if (selectedFarm) {
        try {
          const response = await axios.get(
            "http://localhost:5001/api/historical-price",
            {
              params: {
                crop_name: selectedFarm.cropName,
                last_crop_sowed: selectedFarm.last_crop_sowed,
              },
            }
          );

          console.log("API Response:", response.data);
          setPriceData(response.data.crops);
        } catch (error) {
          console.error("Error fetching historical price data:", error);
          setError("Failed to load historical price data.");
        }
      } else {
        console.log("No selected farm");
      }
    };

    loadPriceData();
  }, [selectedFarm]);

  const getCropIcon = (cropName) => {


    if (!cropName) return null;
    switch (cropName.toLowerCase()) {
      case "rice":
      case "चावल": // Hindi translation for Rice
      case "ਚਾਵਲ": // Punjabi translation for Rice
        return rice;
      case "wheat":
      case "गेहूँ": // Hindi translation for Wheat
      case "ਕਣਕ": // Punjabi translation for Wheat
        return wheatImg;
      case "maize":
      case "मक्का": // Hindi translation for Maize
      case "ਮੱਕੀ": // Punjabi translation for Maize
        return cornImg;
      case "cotton":
      case "कपास": // Hindi translation for Cotton
      case "ਕਪਾਹ": // Punjabi translation for Cotton
        return cotton;
      case "sugarcane":
      case "गन्ना": // Hindi translation for Sugarcane
      case "ਗੰਨਾ": // Punjabi translation for Sugarcane
        return sugarCaneImg;
      case "barley":
      case "जौ": // Hindi translation for Barley
      case "ਜੌ": // Punjabi translation for Barley
        return barleyImg;
      case "millet":
      case "बाजरा": // Hindi translation for Millet
      case "ਬਾਜਰਾ": // Punjabi translation for Millet
        return cornImg; // Same icon for millet
      case "tobacco":
      case "तंबाकू": // Hindi translation for Tobacco
      case "ਤਮਾਕੂ": // Punjabi translation for Tobacco
        return tobaccoImg;
      case "cabbage":
      case "पत्ता गोभी": // Hindi translation for Cabbage
      case "ਪੱਤਾ ਗੋਭੀ": // Punjabi translation for Cabbage
        return cabbageImg;
      case "onion":
      case "प्याज": // Hindi translation for Onion
      case "ਪਿਆਜ਼": // Punjabi translation for Onion
        return onionImg;
      case "garlic":
      case "लहसुन": // Hindi translation for Garlic
      case "ਲਹਸੁਨ": // Punjabi translation for Garlic
        return garlicImg;
      case "cauliflower":
      case "फूलगोभी": // Hindi translation for Cauliflower
      case "ਫੂਲਗੋਭੀ": // Punjabi translation for Cauliflower
        return cauliflowerImg;
      case "spinach":
      case "पालक": // Hindi translation for Spinach
      case "ਪਾਲਕ": // Punjabi translation for Spinach
        return spinachImg;
      case "tomato":
      case "टमाटर": // Hindi translation for Tomato
      case "ਟਮਾਟਰ": // Punjabi translation for Tomato
        return tomatoImg;
      case "pumpkin":
      case "कद्दू": // Hindi translation for Pumpkin
      case "ਕਦੂ": // Punjabi translation for Pumpkin
        return pumpkinImg;
      case "eggplant":
      case "बैंगन": // Hindi translation for Eggplant
      case "ਬੈੰਗਣ": // Punjabi translation for Eggplant
        return eggplantImg;
      case "bitter gourd":
      case "करेला": // Hindi translation for Bitter Gourd
      case "ਕਰੇਲਾ": // Punjabi translation for Bitter Gourd
        return bitterGourdImg;
      case "tea":
      case "चाय": // Hindi translation for Tea
      case "ਚਾਹ": // Punjabi translation for Tea
        return greenTeaImg;
      case "coffee":
      case "कॉफ़ी": // Hindi translation for Coffee
      case "ਕਾਫੀ": // Punjabi translation for Coffee
        return coffeeBeansImg;
      case "jowar":
      case "ज्वार": // Hindi translation for Jowar
      case "ਜਵਾਰ": // Punjabi translation for Jowar
        return jowarImg;
      case "bajra":
      case "बाजरा": // Hindi translation for Bajra
      case "ਬਾਜਰਾ": // Punjabi translation for Bajra
        return bajra;
      case "potato":
      case "आलू": // Hindi translation for Potato
      case "ਆਲੂ": // Punjabi translation for Potato
        return potatoImg;
      case "peas":
      case "मटर": // Hindi translation for Peas
      case "ਮਟਰ": // Punjabi translation for Peas
        return peaImg;
      case "ragi":
      case "रागी": // Hindi translation for Ragi
      case "ਰਾਗੀ": // Punjabi translation for Ragi
        return ragi;
      case "soybean":
      case "सोयाबीन": // Hindi translation for Soybean
      case "ਸੋਯਾਬੀਨ": // Punjabi translation for Soybean
        return soybeanImg;
      case "sesame":
      case "तिल": // Hindi translation for Sesame
      case "ਤਿਲ": // Punjabi translation for Sesame
        return sesameImg;
      case "groundnut":
      case "मूंगफली": // Hindi translation for Groundnut
      case "ਮੂੰਗਫਲੀ": // Punjabi translation for Groundnut
        return groundnut;
      default:
        return "🌿"; // Default icon for any undefined crop
    }
  };

  const placeholderData = [
    {
      crop_name: "Loading...",
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Sept",
        "Oct",
      ],
      prices: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  const chartOptions = {
    series:
      priceData || loading
        ? [
          {
            name: priceData
              ? priceData[0].crop_name
              : placeholderData[0].crop_name,
            data: priceData ? priceData[0].prices : placeholderData[0].prices,
          },
          {
            name: priceData
              ? priceData[1].crop_name
              : placeholderData[0].crop_name,
            data: priceData ? priceData[1].prices : placeholderData[0].prices,
          },
        ]
        : [],
    options: {
      chart: {
        type: "area",
        height: 350,
      },
      xaxis: {
        categories: priceData ? priceData[0].months : placeholderData[0].months,
        title: {
          text: "Months (2024)",
        },
      },
      // yaxis: {
      //   title: {
      //     text: "Price (INR per kg)",
      //   },
      // },
      stroke: {
        curve: "smooth",
      },
      tooltip: {
        x: {
          format: "MMM YYYY",
        },
      },
      fill: {
        opacity: 0.5,
      },
      colors: ["#28a745", "#8B4513"],
    },
  };

  const handleDelete = async (farmId) => {
    try {
      await deleteMyTips(farmId);
      setFarms((prevFarms) => prevFarms.filter((farm) => farm._id !== farmId));
      setMatchedTips((prevTips) =>
        prevTips.filter((tip) => tip.farmId !== farmId)
      );
    } catch (err) {
      console.error("Error deleting farm:", err);
      alert("Failed to delete farm: " + err.message);
    }
  };

  if (loading) return <p>Loading farms...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
      <div className="container">
        <div className="MyFarmsHeading">
          <h4>
            <img
              src={MyFarmsSvg}
              alt="My Farm"
              style={{ width: "40px", height: "40px" }}
            />
            My Farms
          </h4>
          {/* Conditionally render based on the path */}
          {location.pathname === "/" ? (
            <Link to="my-farms">
              <BsArrowUpRightCircle style={{ fontSize: "30px", color: "grey" }} />
            </Link>
          ) : (
            location.pathname === "/my-farms" &&
              (showAddFarm ? (
                <MdOutlineCancel
      
                  className="add-icon"
                  onClick={() => setShowAddFarm(false)}
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    marginLeft: "10px",
                    color: "grey",
                  }}
                />
              ) : (
                <IoIosAddCircleOutline
                  className="add-icon"
                  onClick={() => setShowAddFarm(true)}
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    marginLeft: "10px",
                    color: "grey",
                  }}
                />
              ))
          )}
        </div>
        {/* Main content */}
        {showAddFarm ? (
          <AddFarms />
        ) : farms.length === 0 ? (
          <EmptyFarms />
        ) : (
          <div
            className={
              location.pathname === "/" ? "farms-cards-container" : "row g-3"
            }
          >
            {location.pathname === "/" ? (
              farms.map((farm) => (
                <div
                  className="col-md-4"
                  key={farm._id}
                  onClick={() => setSelectedFarm(farm)}
                >
                  <div className="card farm-card">
                    <img
                      src={farm.farmImageUrl}
                      alt={farm.farmName}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="card-info">
                          <h4 className="card-title mb-0">{farm.farmName}</h4>
                          <p className="card-text mb-0">{farm.sizeOfFarm} HA</p>
                        </div>
                        <img
                          src={getCropIcon(farm.cropName)}
                          alt={farm.cropName}
                          className="crop-icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="farms-card-container">
                <p className="farms-card-paragraph">Track crops, monitor soil, and get personalized insights</p>
                  <div className="flex mt-1rem">
                    {farms.map((farm) => (
                      <div
                        className="flex-none"
                        key={farm._id}
                        onClick={() => setSelectedFarm(farm)}
                      >
                        <div className="card farm-card myFarmsCard">
                          <img
                            src={farm.farmImageUrl}
                            alt={farm.farmName}
                            className="card-img-top"
                          />
                          <div className="card-header d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column">
                              <h5 className="card-title mb-0">{farm.farmName}</h5>
                              <p className="card-text mb-0">{farm.sizeOfFarm} HA</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {farms.length === 0 && (
                      <div className="col-12 text-center">
                        <p className="text-muted">No farms found.</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="myFarms_info">
                  {selectedFarm && (
                    <div className="selected-farm mt-5 p-4">
                      <div className="sub1">
                        <img
                          src={selectedFarm.farmImageUrl}
                          alt={selectedFarm.farmName}
                          className="card-img-top rounded-top abc"
                        />
                      </div>
                      <div className="sub2">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <div className="d-flex flex-column">
                            <h5 className="card-title mb-0">
                              {selectedFarm.farmName}
                            </h5>
                            <p className="card-text mb-0">{selectedFarm.sizeOfFarm} HA</p>
                          </div>
                        </div>
                        <br />
                        <div className="totalBox">
                          <div className="greenBoxes">
                            <div className="soilBox">
                              <h2>🌱</h2>
                              <p className="boxHeading">
                                Soil:
                                <br />
                                {selectedFarm.soilType}
                              </p>
                            </div>
                            <div className="waterBox">
                              <h2>💧</h2>
                              <p className="boxHeading">
                                Water Source:
                                <br />
                                {selectedFarm.waterSource}
                              </p>
                            </div>
                            <div className="farmBox">
                              <h2>🚜</h2>
                              <p className="boxHeading">
                                Farming Method:
                                <br />
                                {selectedFarm.farmingMethod}
                              </p>
                            </div>
                          </div>
                          <div className="tipsBox">
                            <h1>💡</h1>
                            <MatchingTips
                              matchedTips={matchedTips}
                              setMatchedTips={setMatchedTips}
                              selectedFarm={selectedFarm}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {priceData && priceData.length >= 2 && (
                    <div id="chart" style={{ marginTop: "20px" }}>
                      {loading ? (
                        <p>Loading data...</p>
                      ) : error ? (
                        <p>{error}</p>
                      ) : (
                        <div className="splineChart">
                          <h4>Current Vs Previously Grown Crop</h4>
                          <Chart
                            options={chartOptions.options}
                            series={chartOptions.series}
                            type="area"
                            height={350}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-center align-items-center vh-50">
                  <Link to="/" className="btn btn-dark btn-lg rounded-pill mt-3">
                    Back
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
  );
};

export default MyFarms;
