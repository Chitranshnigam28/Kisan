import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import SingleTips from "./SingleTips";
import marketInsights from "../Assets/marketinsights.svg";
import Demo from "./Demo";



const CropPriceChart = (crop) => {
  const {getCropData} = crop
  console.log(
    crop,
    "safasfssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
  );
  const [cropPrices, setCropPrices] = useState([]);
  const [cropName, setCropName] = useState("");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [loading, setLoading] = useState(true);
  const [nameCrop, setNameCrop] = useState(crop);
  const [filterPrice, setFilterPrice] = useState([]);

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
      console.log("Fetched data++++++++++++++++++++++++++++++++:", data);

      const allPrices =
        data[0]?.historical_prices.flatMap((yearData) =>
          yearData.monthly_prices.map((priceData) => ({
            month: `${priceData.month} ${yearData.year}`,
            year: yearData.year.toString(),
            price: priceData.price,
          }))
        ) || [];

      setCropPrices(allPrices);
      const filteredPrices = allPrices.filter(
        (item) => item.year === selectedYear
      );
      setFilterPrice(filteredPrices);
      // getCropData("abcdddddddddddddddd")
      console.log("Filtered Prices for year", selectedYear, filteredPrices);
    } catch (error) {
      console.error("Error fetching crop prices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCropPrices();
  }, [nameCrop]);


  
  useEffect(() => {
    // console.log(filterPrice,"---------------filter---------------")
    if (filterPrice.length > 0){
      getCropData(filterPrice)
    }
  }, [filterPrice]);

  // Filter the data based on the selected year

  // const chartData = {
  //   series: [
  //     {
  //       name: "Price",
  //       // data: filterPrice.map((item) => {console.log(item.price,"item++++++++++++")
  //       //   return item.price
  //       // }),
  //       data: [6,44,232,31,12,12,13,14]
  //     },
  //   ],
  //   options: {
  //     chart: {
  //       id: 'realtime',
  //       type: "line",
  //       height: 350,
  //       dropShadow: {
  //         enabled: true,
  //         color: "#000",
  //         top: 10,
  //         left: 0,
  //         blur: 6,
  //         opacity: 0.4,
  //       },
  //     },
  //     title: {
  //       text: `${cropName || "Wheat"} Prices in ${selectedYear}`,
  //       align: "center",
  //       style: {
  //         color: "#003300",
  //         fontWeight: "bold",
  //       },
  //     },
  //     xaxis: {
  //       categories: [
  //         "Jan",
  //         "Feb",
  //         "Mar",
  //         "Apr",
  //         "May",
  //         "Jun",
  //         "Jul",
  //         "Aug",
  //         "Sep",
  //         "Oct",
  //         "Nov",
  //         "Dec",
  //       ],
  //       labels: {
  //         style: {
  //           colors: "#003300",
  //         },
  //       },
  //     },
  //     yaxis: {
  //       labels: {
  //         style: {
  //           colors: "#003300",
  //         },
  //       },
  //     },
  //     fill: {
  //       type: "gradient",
  //       gradient: {
  //         shade: "dark",
  //         type: "vertical",
  //         shadeIntensity: 0.9,
  //         gradientToColors: ["#003300", "#001a00"], // Very dark greens for gradient contrast
  //         inverseColors: false,
  //         opacityFrom: 0.9,
  //         opacityTo: 0.5,
  //         stops: [0, 100],
  //       },
  //     },
  //     stroke: {
  //       curve: "smooth",
  //       colors: ["#004d00"], // Dark green line color
  //       width: 3,
  //     },
  //     tooltip: {
  //       theme: "dark",
  //       style: {
  //         fontSize: "13px",
  //       },
  //     },
  //   },
  // };

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
      <div className="container">
        <div className="title">
          <img
            src={marketInsights}
            alt="Market Insights"
            className="market-insights-icon"
          />{" "}
          <h1>Market Insights</h1>
          {/* <Demo /> */}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="allContainer">
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
                {/* <Chart
                  options={chartData.options}
                  series={chartData.series}
                  type="line"
                  height={350}
                /> */}
              </div>
            </div>

            <div className="content2">
              <div className="tips">

                <SingleTips cropName={cropName} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CropPriceChart;