import React from "react";
import { Link } from 'react-router-dom';
import Weather from "../Weather";
import ComponentPriceGraph from "../CropPriceGraph";
import MyFarms from '../Farms/MyFarms'
import '../../css/main.css';

const Main = () => {

  const userId = localStorage.getItem('userId');

  return (
    <main className="main-layout">
      <div className="weather-info">
        <h3>Weather Information</h3>
        <Weather />
      </div>

      <div className="my-farms ">
        <h3>My Farms</h3>
        <MyFarms userId={userId} />
        <Link to="/add-farm">Add a New Farm</Link>
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
    </main>
  );
};

export default Main;
