import React, { useEffect, useState } from "react";
import SingleTips from "./SingleTips";
import marketInsights from "../Assets/marketinsights.svg";
import ApexLineChart from './ApexLineChart'

const CropPriceChart = ({ getCropData, cropName, selectedYear, onCropNameChange, onYearChange }) => {
  const [cropPrices, setCropPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterPrice, setFilterPrice] = useState([]);

  const fetchCropPrices = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5001/api/crops/price?crop=${cropName}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
  
      const data = await response.json();
      console.log("Fetched crop data:", data);  
  
      const allPrices =
        data[0]?.historical_prices.flatMap((yearData) =>
          yearData.monthly_prices.map((priceData) => ({
            month: `${priceData.month}`,
            year: yearData.year.toString(),
            price: priceData.price,
          }))
        ) || [];
  
      setCropPrices(allPrices);
      filterByYear(allPrices, selectedYear);
    } catch (error) {
      console.error("Error fetching crop prices:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const filterByYear = (data, year) => {
    const filteredPrices = data.filter((item) => item.year === year);
    setFilterPrice(filteredPrices);
    getCropData(filteredPrices);
  };
  

  useEffect(() => {
    fetchCropPrices();
  }, []); 

  useEffect(() => {
    filterByYear(cropPrices, selectedYear);
  }, [selectedYear, cropPrices]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCropPrices();
  };

  return (
    <div className="container">
      <div className="title">
        <img src={marketInsights} alt="Market Insights" className="market-insights-icon" />
        <h1>Market Insights</h1>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="allContainer">
          <div className="content">
            <form onSubmit={handleSubmit} className="flex flex-col m-auto w-full place-items-center mt-4">
              <input
                type="text"
                value={cropName}
                onChange={(e) => onCropNameChange(e.target.value)} 
                placeholder="Enter crop name"
                className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-4"
              />
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Get Prices
              </button>
            </form>
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)} 
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-4"
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
            <ApexLineChart crops={filterPrice} cropName={cropName} selectedYear={selectedYear} />

          </div>
          <div className="content2">
            <div className="tips">
              <SingleTips cropName={cropName}  />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropPriceChart;