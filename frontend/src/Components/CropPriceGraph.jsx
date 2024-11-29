import React, { useEffect, useState } from "react";
import ApexLineChart from "./ApexLineChart";
import SingleTips from "./SingleTips"; 
import "../css/cropPrice.css";
import tomatoImg from "./../Assets/Vegetables/tomato.png";
import wheatImg from "./../Assets/Vegetables/wheat.png";
import potatoImg from "./../Assets/Vegetables/Potato.svg";
import cornImg from "./../Assets/Vegetables/Corn.png";
import { FaSearch } from "react-icons/fa";

const CropPriceChart = ({ getCropData, selectedYear, onYearChange }) => {
  const [cropName, setCropName] = useState("Wheat");
  const [cropPrices, setCropPrices] = useState([]);
  const [filterPrice, setFilterPrice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("Wheat");
  const [matchingTips, setMatchingTips] = useState([]);

  const predefinedCrops = [
    { name: "Wheat", image: wheatImg },
    { name: "Potato", image: potatoImg },
    { name: "Maize", image: cornImg },
    { name: "Tomato", image: tomatoImg },
  ];

  const fetchCropPrices = async (crop) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/crops/price?crop=${crop}`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
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
    if (getCropData) {
      getCropData(filteredPrices);
    }
  };

  const handleCropClick = (crop) => {
    setCropName(crop); // Set selected crop
    setInputValue(crop); // Sync input with selected crop
    fetchCropPrices(crop);
    setMatchingTips([]); // Clear tips after selecting
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setMatchingTips([]); // Clear dropdown when input is empty
      return;
    }

    const matchingCrops = predefinedCrops
      .map((crop) => crop.name)
      .filter((crop) => crop.toLowerCase().startsWith(value.toLowerCase()));

    setMatchingTips(matchingCrops); // Update dropdown options
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (trimmedInput && trimmedInput !== cropName) {
      setCropName(trimmedInput);
      fetchCropPrices(trimmedInput);
      setMatchingTips([]); // Clear dropdown after submission
    }
  };

  useEffect(() => {
    fetchCropPrices(cropName);
  }, []);

  useEffect(() => {
    filterByYear(cropPrices, selectedYear);
  }, [selectedYear, cropPrices]);

  return (
    <div className="container marketInsightsCropContainer">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="allContainer">
          <div className="content">
            <div className="predefined-crops">
              {predefinedCrops.map((crop) => (
                <button
                  key={crop.name}
                  className={`crop-button ${
                    cropName === crop.name ? "selected" : ""
                  }`}
                  onClick={() => handleCropClick(crop.name)}
                >
                  <img src={crop.image} alt={crop.name} />
                  <span>{crop.name}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="crop-form-container">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Enter crop name"
                  className="crop-input"
                />
                {inputValue.trim() && matchingTips.length > 0 && (
                  <div className="matching-tips">
                    {matchingTips.map((tip) => (
                      <div
                        key={tip}
                        className="tip"
                        onClick={() => handleCropClick(tip)}
                      >
                        {tip}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <select
                id="year-dropdown"
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
              >
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
              <button type="submit" id="crop-submit-btn">
                <FaSearch />
              </button>
            </form>

            <div className="apex-chart-container">
              <ApexLineChart
                crops={filterPrice}
                cropName={cropName}
                selectedYear={selectedYear}
              />
            </div>

            <SingleTips cropName={cropName} />
          </div>
        </div>
      )}
    </div>
  );
};


export default CropPriceChart;
