import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import CropPriceChart from "./CropPriceGraph";
import { Footer } from "./Dashboard/Footer";
import Header from "./Dashboard/Header";
import { useLocation } from "react-router-dom";
import TopCropsChart from "./TopCropChart";
import TopCropIndia from "./TopCropIndia";
import "../css/main.css";
import marketInsights from "../Assets/marketinsights.svg";

const MarketInsigtsDashboard = () => {
  const [location, setLocation] = useState("Delhi");
  const weblocation = useLocation();
  const [getCropAllData, setcropAllData] = useState([]);
  const [cropName, setCropName] = useState("Wheat");
  const [selectedYear, setSelectedYear] = useState("2023");

  const locationVal = useLocation();

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    console.log(`Location changed to: ${newLocation}`);
  };

  const handlegetCropdata = (data) => {
    setcropAllData(data);
  };

  const handleCropNameChange = (newCropName) => {
    setCropName(newCropName);
  };

  const handleYearChange = (newYear) => {
    setSelectedYear(newYear);
  };

  return (
    <>
      <div className="market-section-container">
        {weblocation.pathname === "/" ? (
          <>
            <Link to="charts" className="LinkToCharts">
              <BsArrowUpRightCircle
                style={{ fontSize: "30px", color: "grey", float: "right" }}
              />
            </Link>
            <div className="topCropIndia-container">
              <TopCropIndia />
            </div>
            <div className="topCropChart-container">
              <TopCropsChart
                onLocationChange={handleLocationChange}
                location={location}
              />
            </div>
          </>
        ) : (
          <div className="main-market-container">
            <>
              <Header />
              <Footer />
              <div className="marketInsightWidgetWrapper">
                <div className="heading">
                  
                  <div className="title">
                  <div className="heading-title-wrapper">
                    <img
                      src={marketInsights}
                      alt="Market Insights"
                      className="market-insights-icon"
                    />
                    <h1>Market Insights</h1>
                    </div>
                    <p className="market-insights-para">
                    Explore key market trends and insights to stay ahead.
                  </p>
                  </div>
                  
                </div>
                <div className="both-chart-container">
                  <div className="container-tips-graph">
                    {locationVal.pathname === "/charts" && (
                      <div className="extra-info">
                        <h4>Your Crops</h4>
                        <p>Choose from the crops below or search it</p>
                      </div>
                    )}
                    <CropPriceChart
                      getCropData={handlegetCropdata}
                      cropName={cropName}
                      selectedYear={selectedYear}
                      onCropNameChange={handleCropNameChange}
                      onYearChange={handleYearChange}
                    />
                  </div>
                  <div className="top-crop-container">
                    <TopCropsChart />
                    <div className="tip-container mt-10 ml-4 mr-4">
                      <div className="tip-card">
                        <div className="tip-content">
                          <div className="icon-cropName">
                            <span className="tip-icon">💡</span>
                          </div>
                          <span>Practice alternate wetting and drying (AWD) to conserve water and improve root growth in rice fields.
                          Incorporate green manure like Azolla to naturally boost soil fertility and nitrogen levels.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="single-tips-container">
                    <SingleTips cropName={cropName} />
                  </div> */}
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center vh-70">
                <Link
                  to="/"
                  className="btn btn-dark btn-lg rounded-pill mt-3 mb-5"
                >
                  Go Back
                </Link>
              </div>
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default MarketInsigtsDashboard;
