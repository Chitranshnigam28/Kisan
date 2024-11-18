// import React, { useEffect, useState } from "react";
// import ApexLineChart from './ApexLineChart';
// import '../css/cropPrice.css';
// import tomatoImg from "./../Assets/Vegetables/tomato.png";
// import wheatImg from "./../Assets/Vegetables/wheat.png";
// import potatoImg from "./../Assets/Vegetables/Potato.svg";
// import cornImg from "./../Assets/Vegetables/Corn.png";
// import { FaSearch } from 'react-icons/fa';

// const CropPriceChart = ({ getCropData, selectedYear, onYearChange }) => {
//   const [cropName, setCropName] = useState("Wheat"); 
//   const [cropPrices, setCropPrices] = useState([]);
//   const [filterPrice, setFilterPrice] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const predefinedCrops = [
//     { name: "Wheat", image: wheatImg },
//     { name: "Potato", image: potatoImg },
//     { name: "Maize", image: cornImg },
//     { name: "Tomato", image: tomatoImg },
//   ];

//   const fetchCropPrices = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `http://localhost:5001/api/crops/price?crop=${cropName}`
//       );
//       if (!response.ok) throw new Error("Network response was not ok");

//       const data = await response.json();
//       const allPrices =
//         data[0]?.historical_prices.flatMap((yearData) =>
//           yearData.monthly_prices.map((priceData) => ({
//             month: `${priceData.month}`,
//             year: yearData.year.toString(),
//             price: priceData.price,
//           }))
//         ) || [];

//       setCropPrices(allPrices);
//       filterByYear(allPrices, selectedYear);
//     } catch (error) {
//       console.error("Error fetching crop prices:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterByYear = (data, year) => {
//     const filteredPrices = data.filter((item) => item.year === year);
//     setFilterPrice(filteredPrices);
//     if (getCropData) {
//       getCropData(filteredPrices);
//     }
//   };

//   const handleCropClick = (crop) => {
//     setCropName(crop);
//     fetchCropPrices(); 
//   };

//   const handleInputChange = (e) => {
//     setCropName(e.target.value); 
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault(); 
//     fetchCropPrices(); 
//   };

//   useEffect(() => {
//     fetchCropPrices();
//   }, []); 

//   useEffect(() => {
//     filterByYear(cropPrices, selectedYear); 
//   }, [selectedYear, cropPrices]);

//   return (
//     <div className="container">
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="allContainer">
//           <div className="content">
//             <div className="predefined-crops">
//               {predefinedCrops.map((crop) => (
//                 <button
//                   key={crop.name}
//                   className={`crop-button ${
//                     cropName === crop.name ? "selected" : ""
//                   }`}
//                   onClick={() => handleCropClick(crop.name)}
//                 >
//                   <img src={crop.image} alt={crop.name} />
//                   <span>{crop.name}</span>
//                 </button>
//               ))}
//             </div>

//             <form onSubmit={handleSubmit} className="crop-form-container">
//               <input
//                 type="text"
//                 value={cropName} 
//                 onChange={handleInputChange} 
//                 placeholder="Enter crop name"
//                 className="crop-input"
//               />

//               <select
//                 id="year-dropdown"
//                 value={selectedYear}
//                 onChange={(e) => onYearChange(e.target.value)}
//               >
//                 <option value="2023">2023</option>
//                 <option value="2022">2022</option>
//                 <option value="2021">2021</option>
//               </select>

//               <button type="submit" className="crop-submit-btn">
//                 <FaSearch />
//               </button>
//             </form>

//             <div className="apex-chart-container">
//               <ApexLineChart
//                 crops={filterPrice}
//                 cropName={cropName}
//                 selectedYear={selectedYear}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// export default CropPriceChart;

import React, { useEffect, useState } from "react";
import ApexLineChart from './ApexLineChart';
import '../css/cropPrice.css';
import tomatoImg from "./../Assets/Vegetables/tomato.png";
import wheatImg from "./../Assets/Vegetables/wheat.png";
import potatoImg from "./../Assets/Vegetables/Potato.svg";
import cornImg from "./../Assets/Vegetables/Corn.png";
import { FaSearch } from 'react-icons/fa';

const CropPriceChart = ({ getCropData, selectedYear, onYearChange }) => {
  const [cropName, setCropName] = useState("Wheat"); // Input state
  const [cropPrices, setCropPrices] = useState([]);
  const [filterPrice, setFilterPrice] = useState([]);
  const [loading, setLoading] = useState(false);

  const predefinedCrops = [
    { name: "Wheat", image: wheatImg },
    { name: "Potato", image: potatoImg },
    { name: "Maize", image: cornImg },
    { name: "Tomato", image: tomatoImg },
  ];

  // Fetch crop prices from API
  const fetchCropPrices = async (crop) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5001/api/crops/price?crop=${crop}`
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

  // Filter prices by selected year
  const filterByYear = (data, year) => {
    const filteredPrices = data.filter((item) => item.year === year);
    setFilterPrice(filteredPrices);
    if (getCropData) {
      getCropData(filteredPrices);
    }
  };

  // Handle predefined crop button click
  const handleCropClick = (crop) => {
    setCropName(crop);
    fetchCropPrices(crop);
  };

  // Handle input change for manual crop search
  const handleInputChange = (e) => {
    setCropName(e.target.value); // Update local state without triggering fetch
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCropPrices(cropName); // Fetch data only on form submission
  };

  useEffect(() => {
    fetchCropPrices(cropName); // Fetch data on initial render
  }, []);

  useEffect(() => {
    filterByYear(cropPrices, selectedYear); // Update filtered prices when year changes
  }, [selectedYear, cropPrices]);

  return (
    <div className="container">
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
              <input
                type="text"
                value={cropName} // Controlled input
                onChange={handleInputChange}
                placeholder="Enter crop name"
                className="crop-input"
              />

              <select
                id="year-dropdown"
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
              >
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>

              <button type="submit" className="crop-submit-btn">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default CropPriceChart;
