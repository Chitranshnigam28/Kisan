import React from "react";
import { Link } from "react-router-dom";
import GMaps from "../GMaps";
import ComponentPriceGraph from "../CropPriceGraph";
import "../../css/dashboard.css";

const Dashboard = () => {
  return (
    <>
    <h1>Dashboard</h1>
    <div className="dashboard-container">
      <div className="dashboard-item-2">
        <Link to="/maps">
          <GMaps />
        </Link>
      </div>

      <div className="dashboard-item">
        <Link to="/price-graph">
          <ComponentPriceGraph />
        </Link>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
