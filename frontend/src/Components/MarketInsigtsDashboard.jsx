import React from "react";
import CropPriceGraph from "./CropPriceGraph";
import TopCropsChart from "./TopCropChart";
import { Footer } from "./Dashboard/Footer";
import Header from "./Dashboard/Header";

const MarketInsigtsDashboard = () => {
  return (
    <div>
      <Header />
      <Footer />
      <CropPriceGraph crop="wheat" />
      <TopCropsChart />
    </div>
  );
};

export default MarketInsigtsDashboard;
