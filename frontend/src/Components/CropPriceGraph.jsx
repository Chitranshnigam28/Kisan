import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "../css/dashboard.css";
import "./SingleTips";
import SingleTips from "./SingleTips";
import TopCropsChart from "./TopCropChart";
import "../css/marketInsights.css"; // Import the new CSS file

const CropPriceChart = ({ crop }) => {
  const [cropPrices, setCropPrices] = useState([]);
  const [cropName, setCropName] = useState("");
  const [loading, setLoading] = useState(true);
  // const [location, setLocation] = useState("Delhi");

  const fetchCropPrices = async () => {
    try {
      const cropSent = cropName ? cropName : "Wheat";
      const response = await fetch(
        `http://localhost:5001/api/crops/price?crop=${cropSent}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const allPrices =
        data[0]?.historical_prices.flatMap((yearData) =>
          yearData.monthly_prices.map((priceData) => ({
            month: `${priceData.month} ${yearData.year}`,
            price: priceData.price,
          }))
        ) || [];
      setCropPrices(allPrices);
    } catch (error) {
      console.error("Error fetching crop prices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCropPrices();
  }, [crop]);

  const chartData = {
    series: [
      {
        name: "Price",
        data: cropPrices.map((item) => item.price),
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
      },
      title: {
        text: "", // No title as per your request
      },
      xaxis: {
        categories: cropPrices.map((item) => item.month),
      },
    },
  };

  const handleCropName = (e) => {
    setCropName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchCropPrices();
  };

  // const handleLocationChange = (newLocation) => {
  //   setLocation(newLocation);
  //   console.log(`Location changed to: ${newLocation}`);
  // };

  return (
    <div className="container">
      <div className="title">
        <h1>Market Insights</h1>
        <span className="title-icon">📈</span>{" "}
        {/* Replace with an icon from React Icons */}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="content">
          <div className="chart">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col m-auto w-full place-items-center mt-4"
            >
              <input
                type="text"
                value={cropName}
                onChange={handleCropName}
                className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-4"
                placeholder="Enter crop name"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Get Prices
              </button>
            </form>
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
              height={350}
            />
          </div>
        </div>
      )}

      <div className="content2">
          <div className="tips">
            <SingleTips cropName={cropName} />
          </div>
         
      </div>
    </div>
  );
};

export default CropPriceChart;
