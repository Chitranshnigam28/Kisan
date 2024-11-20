import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import CropLoader from "./CropLoader";
import { useLocation } from "react-router-dom";
import "../css/topCropChart.css";
import starIcon from "../Assets/TopCrop.svg";
import { IoLocationSharp } from "react-icons/io5";

const TopCropsChart = ({ onLocationChange }) => {
  const [location, setLocation] = useState("Delhi");
  const [topCrops, setTopCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  ); // Track the selected language
  const [translatedData, setTranslatedData] = useState(null);
  const [translatedLocationHeading, setTranslatedLocationHeading] =
    useState("");
  const [translatedStates, setTranslatedStates] = useState({});
  const currentLocation = useLocation();

  useEffect(() => {
    console.log("TioCRopChart running ");
    const fetchTopCrops = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5001/api/recommend-crop/`,
          {
            params: { location },
          }
        );
        console.log("API response from topCrop file to test:", response.data);
        if (Array.isArray(response.data.crops)) {
          setTopCrops(response.data.crops);
          //  onLoaded("working"); // Ensure onLoaded is called after data is successfully fetched
        } else {
          console.error("Unexpected response format:", response.data);
          setTopCrops([]);
          // onLoaded("working"); // Still call onLoaded even in case of error (optional)
        }
      } catch (error) {
        console.error(
          "Error fetching top crops:",
          error.response ? error.response.data : error.message
        );
        setTopCrops([]); // Set to empty on error
        // onLoaded("working"); // Ensure onLoaded is called after error
      } finally {
        setLoading(false);
      }
    };

    fetchTopCrops();
  }, [location]);

  useEffect(() => {
    const translateChartData = async () => {
      if (topCrops.length === 0) return; // Avoid translation if there's no data

      try {
        const cropNames = topCrops.map((crop) => crop?.crop_name ?? "Unknown");
        const translatedNames = await Promise.all(
          cropNames.map((name) => translateText(name, language))
        );

        const titleTranslation = await translateText(
          `Top Selling Crops in ${location}`,
          language
        );

        // Set translated data
        setTranslatedData({
          cropNames: translatedNames,
          title: titleTranslation,
        });
        // Onload for the laoder
        // onLoaded && onLoaded();
      } catch (error) {
        console.error("Error translating chart data:", error);
      }
    };

    translateChartData();
  }, [topCrops, location, language]);

  useEffect(() => {
    const translateLocationHeading = async () => {
      const headingTranslation = await translateText(
        "Select Location",
        language
      );
      setTranslatedLocationHeading(headingTranslation);
    };

    const translateStates = async () => {
      const states = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Lakshadweep",
        "Delhi",
        "Puducherry",
        "Jammu and Kashmir",
        "Ladakh",
      ];

      try {
        const translatedStatesObj = await Promise.all(
          states.map(async (state) => {
            const translatedState = await translateText(state, language);
            return { [state]: translatedState };
          })
        );

        // Convert array of objects into a single object
        const translatedStatesMap = Object.assign({}, ...translatedStatesObj);
        setTranslatedStates(translatedStatesMap);
      } catch (error) {
        console.error("Error translating states:", error);
      }
    };

    translateLocationHeading();
    translateStates();
  }, [language]);

  const translateText = async (text, targetLanguage) => {
    try {
      const response = await axios.post("http://localhost:5001/api/translate", {
        text: text,
        targetLanguage: targetLanguage,
      });

      return response.data.translatedText;
    } catch (error) {
      console.error("Error translating text:", error);
      return text; // Fallback to original text in case of error
    }
  };

  // Default crops data for "Delhi" if no data is available
  const defaultCrops = [
    { crop_name: "Wheat", percentage: 40 },
    { crop_name: "Rice", percentage: 30 },
    { crop_name: "Pulses", percentage: 20 },
    { crop_name: "Sugarcane", percentage: 5 },
    { crop_name: "Cotton", percentage: 5 },
  ];

  const chartData =
    topCrops.length > 0
      ? {
        series: topCrops.map((crop) => crop?.percentage ?? 0),
        options: {
          chart: {
            type: "donut",
            height: 350,
          },
          // title: {
          //   text: translatedData ? translatedData.title : `Top Selling Crops in ${location}`,
          //   align: 'center',
          // },
          labels: translatedData
            ? translatedData.cropNames
            : topCrops.map((crop) => crop?.crop_name ?? "Unknown"),
          legend: { position: "bottom" },
          plotOptions: {
            pie: {
              expandOnClick: true,
              customScale: 1,
              donut: {
                size: "70%",
                labels: {
                  show: true,
                  name: {
                    show: true,
                    fontSize: "22px",
                    color: undefined,
                    offsetY: 5,
                  },
                  value: {
                    show: false,
                  },
                },
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "light",
              type: "vertical",
              shadeIntensity: 0.5,
              gradientToColors: [
                "#1B5E20",
                "#2E7D32",
                "#43A047",
                "#66BB6A",
                "#81C784",
              ],
              stops: [0, 100, 100, 100, 100],
            },
          },
          colors: ["#1B5E20", "#2E7D32", "#43A047", "#66BB6A", "#81C784"],
        },
      }
      : {
        series: defaultCrops.map((crop) => crop.percentage),
        options: {
          labels: defaultCrops.map((crop) => crop.crop_name),
          chart: {
            type: "donut",
            height: 350,
          },

          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "vertical",
              shadeIntensity: 0.5,
              gradientToColors: [
                "#1B5E20",
                "#2E7D32",
                "#43A047",
                "#66BB6A",
                "#81C784",
              ],
              stops: [0, 100, 100, 100, 100],
            },
          },
          colors: ["#1B5E20", "#2E7D32", "#43A047", "#66BB6A", "#81C784"],
        },
      };

  return (
    <div className="top-crop-container">
      <div className="top-crop-title-container">
        <img
          src={starIcon}
          alt="Top crop"
          className="top-crop-icon"
        />
        <br />
        <h4 className="top-crop-title">
          {translatedData
            ? translatedData.title
            : `Top Selling Crops in ${location}`}
        </h4>
      </div>

      {currentLocation.pathname === "/charts" && (
        <div className="location-topCrop">
          {/* <label htmlFor="state-dropdown">
            {translatedLocationHeading || "Select Location"}:{" "}
          </label> */}
          <IoLocationSharp
            style={{ fontSize: "20px", color: "red", cursor: "pointer" }}
          />
          <select
            id="state-dropdown"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            {Object.entries(translatedStates).map(
              ([originalState, translatedState]) => (
                <option key={originalState} value={originalState}>
                  {translatedState || originalState}{" "}

                </option>
              )
            )}
          </select>
        </div>
      )}

      {loading ? (
        <CropLoader />
      ) : topCrops.length > 0 ? (
        <>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            height={350}
          />
          {console.log("Chart data series:", chartData.series)}
          {console.log("Chart data labels:", chartData.options.labels)}
        </>
      ) : (
        <p className="top-crop-no-data">No data available for the selected location.</p>
      )}
    </div>
  );
};

export default TopCropsChart;
