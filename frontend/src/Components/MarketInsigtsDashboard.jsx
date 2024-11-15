import React, { useState } from "react";
import CropPriceGraph from "./CropPriceGraph";
import { Footer } from "./Dashboard/Footer";
import Header from "./Dashboard/Header";
import { useLocation } from "react-router-dom";
import TopCropsChart from "./TopCropChart";
import TopCropIndia from "./TopCropIndia";
import Loader from "./CropLoader";
// import '../css/dashboard.css'
import "../css/main.css";
import Demo from "./Demo";

const MarketInsigtsDashboard = () => {
  const [location, setLocation] = useState("Delhi");
  const weblocation = useLocation();
  const [getCropAllData, setcropAllData] = useState([])

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    console.log(`Location changed to: ${newLocation}`);
  };

  const handlegetCropdata = (data)=>{
    console.log(data,"chota --------------------------------")
    setcropAllData(data)
  }

  return (
    <>
      <div className="market-section-container">
        {weblocation.pathname === "/" ? (
          <>
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
                <CropPriceGraph crop="wheat" getCropData = {handlegetCropdata} />
                {getCropAllData && getCropAllData.length>0  ? <Demo  crops = {getCropAllData}/>:<></>}
                
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
