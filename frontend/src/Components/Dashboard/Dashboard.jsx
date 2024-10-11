import React from "react";
import { Link } from "react-router-dom";
import GMaps from "../GMaps";
import ComponentPriceGraph from "../CropPriceGraph";
import Header from "./Header";
import "../../css/dashboard.css";
import Footer from "./Footer";

const Dashboard = () => {
  return (
    <>
    <Header />
    <div className="dashboard-container">
      <div className="dashboard-item-2">
        {/* <Link to="/maps">
          <GMaps />
        </Link> */}
      </div>

      <div className="dashboard-item">
        <Link to="/charts">
          <ComponentPriceGraph />
        </Link>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Dashboard;
