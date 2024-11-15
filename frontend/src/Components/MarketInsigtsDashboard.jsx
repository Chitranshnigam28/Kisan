import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowUpRightCircle } from "react-icons/bs";
import CropPriceChart from "./CropPriceGraph"; 
import { Footer } from "./Dashboard/Footer";
import Header from "./Dashboard/Header";
import { useLocation } from "react-router-dom";
import TopCropsChart from "./TopCropChart";
import TopCropIndia from "./TopCropIndia";
import "../css/main.css";

const MarketInsigtsDashboard = () => {
  const [location, setLocation] = useState("Delhi");
  const weblocation = useLocation();
  const [getCropAllData, setcropAllData] = useState([]);
  const [cropName, setCropName] = useState("Wheat"); 
  const [selectedYear, setSelectedYear] = useState("2023"); 

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
              <BsArrowUpRightCircle style={{ fontSize: "30px", color: "grey", float: "right" }} />
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
              <div>
                <CropPriceChart 
                  getCropData={handlegetCropdata}
                  cropName={cropName}
                  selectedYear={selectedYear}
                  onCropNameChange={handleCropNameChange}
                  onYearChange={handleYearChange}
                />
                <TopCropsChart />
              </div>
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default MarketInsigtsDashboard;

