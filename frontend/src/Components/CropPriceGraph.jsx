import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./SingleTips";
import SingleTips from "./SingleTips";
import { Footer } from "./Dashboard/Footer";
import Header from "./Dashboard/Header";
import TopCropsChart from "./TopCropChart";
import marketInsights from "../Assets/marketinsights.svg";
import '../css/marketInsights.css';


const CropPriceChart = ({ crop }) => {
  const [cropPrices, setCropPrices] = useState([]);
  const [cropName, setCropName] = useState("");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [loading, setLoading] = useState(true);

  const fetchCropPrices = async () => {
    try {
      const cropSent = cropName || "Wheat";
      console.log("Fetching data for crop:", cropSent);

      const response = await fetch(
        `http://localhost:5001/api/crops/price?crop=${cropSent}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      const allPrices =
        data[0]?.historical_prices.flatMap((yearData) =>
          yearData.monthly_prices.map((priceData) => ({
            month: `${priceData.month} ${yearData.year}`,
            year: yearData.year.toString(),
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

  // Filter the data based on the selected year
  const filteredPrices = cropPrices.filter(
    (item) => item.year === selectedYear
  );
  console.log("Filtered Prices for year", selectedYear, filteredPrices);

  const chartData = {
    series: [
      {
        name: "Price",
        data: filteredPrices.map((item) => item.price),
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 10,
          left: 0,
          blur: 6,
          opacity: 0.4,
        },
      },
      title: {
        text: `${cropName || "Wheat"} Prices in ${selectedYear}`,
        align: "center",
        style: {
          color: "#003300", // Dark forest green for title
          fontWeight: "bold",
        },
      },
      xaxis: {
        categories: filteredPrices.map((item) => item.month),
        labels: {
          style: {
            colors: "#003300", // Dark green for labels
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#003300",
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0.9,
          gradientToColors: ["#003300", "#001a00"], // Very dark greens for gradient contrast
          inverseColors: false,
          opacityFrom: 0.9,
          opacityTo: 0.5,
          stops: [0, 100],
        },
      },
      stroke: {
        curve: "smooth",
        colors: ["#004d00"], // Dark green line color
        width: 3,
      },
      tooltip: {
        theme: "dark",
        style: {
          fontSize: "13px",
        },
      },
    },
  };

  const handleCropName = (e) => {
    setCropName(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchCropPrices();
  };

  return (
    <>
      <Header />
      <Footer />
      <div className="MarketDashboardContainer">
      <div className="title">
            <img
              src={marketInsights}
              alt="Market Insights"
              className="market-insights-icon"
            />          <h1>Market Insights</h1>
          </div>
        <div className="container marketContainer">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
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
                  <select
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-4"
                  >
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                  <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    height={350}
                  />
                </div>
              </div>

              <div className="tips MarketTips">
                <SingleTips cropName={cropName} />
              </div>
            </>
          )}

          <div className="content2">
            <TopCropsChart />

          </div>
        </div>
      </div>
    </>

  );
};

export default CropPriceChart;
