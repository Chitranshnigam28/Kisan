import "../css/weatherPage.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { FaMapMarkerAlt } from 'react-icons/fa';
import Forecast from '../Components/weatherComponents/Forecast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopCropsChart from "./TopCropChart"; //Matching the location for both weather and
import { format } from 'date-fns'; 
import WeatherWidget from "./weatherWidget";
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getWeatherTip(condition) {
  switch (condition) {
    case "Clear":
      return "Today’s weather is sunny! Irrigate crops early or late to avoid water loss from evaporation.";
    case "Clouds":
      return "Cloudy skies today. Moderate irrigation is sufficient as sunlight is reduced.";
    case "Rain":
      return "Rain expected! Take advantage of rainfall to irrigate less and save water.";
    case "Snow":
      return "Snowfall is predicted. Consider crop protection measures if temperatures drop further.";
    case "Thunderstorm":
      return "Stormy weather ahead. Secure crops and avoid field work until conditions improve.";
    default:
      return "Weather data is loading. Please wait...";
  }
}

function getWeatherIcon(condition) {
  switch (condition) {
    case "Clear":
      return <WiDaySunny size={64} color="#FFD700" />;
    case "Clouds":
      return <WiCloud size={64} color="#A9A9A9" />;
    case "Rain":
      return <WiRain size={64} color="#1E90FF" />;
    case "Snow":
      return <WiSnow size={64} color="#ADD8E6" />;
    case "Thunderstorm":
      return <WiThunderstorm size={64} color="#00008B" />;
    default:
      return <WiCloud size={64} color="#A9A9A9" />;
  }
}

const getBackgroundColor = (temp, condition) => {
  if (condition === "Rain" || condition === "Thunderstorm") return "#627685"; // Rain/Thunderstorm - Dark grayish-blue
  if (condition === "Clear") return "#84B8EA"; // Sunny - Light blue

  const hour = new Date().getHours();
  if (hour >= 18 || hour < 6) return "#1E3146"; // Night - Dark blue (6 PM to 6 AM)
  if (hour >= 16 && hour < 18) return "#FFD89E"; // Evening - Soft gold (4 PM to 6 PM)

  // Default colors based on temperature ranges
  if (temp <= 0) return "#627685"; // Cold - Grayish for very low temperatures
  if (temp > 0 && temp <= 15) return "#84B8EA"; // Cool - Light blue for mild temperatures
  if (temp > 15 && temp <= 30) return "#FFD89E"; // Warm - Soft gold for warm temperatures
  return "#1E3146"; // Hot - Dark blue for very high temperatures
};

function Weather() {
  const location = useLocation();
  const [query, setQuery] = useState(location.state?.query || { q: "Delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weatherTip, setWeatherTip] = useState("Loading tips...");

  const getWeather = async () => {
    try {
      setLoading(true);
      const isGeolocation = query.lat && query.lon;
      const queryString = isGeolocation
        ? `lat=${query.lat}&lon=${query.lon}`
        : `q=${query.q}`;
      const cityName = query.q
        ? capitalizeFirstLetter(query.q)
        : "current location";
      toast.info(
        `Fetching weather data for ${
          isGeolocation ? "current location" : cityName
        }...`
      );

      const response = await fetch(
        `http://localhost:5001/api/weather?${queryString}&units=${units}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");

      const data = await response.json();
      console.log("Data 52 " + JSON.stringify(data));
      if (!data.temp || !data.hourly || !data.daily || !data.name || !data.country) throw new Error("Incomplete weather data received");

      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather({
        ...data,
        bgColor: getBackgroundColor(
          data.temp,
          data.weather && data.weather[0]?.main
        ),
      });
    } catch (error) {
      toast.error(`Error fetching weather data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);
  const tips = {
    Clear: [
      "Today’s weather is sunny! Make sure to irrigate your crops early in the morning or late in the evening to prevent excessive water evaporation during peak sunlight.",
      "With clear skies today, apply a layer of mulch around your plants. This will help lock in soil moisture and keep roots cool.",
      "It’s a bright sunny day! Consider providing shade for young or delicate plants to protect them from sunburn."
    ],
    Rain: [
      "Expect some rain today! Check your field’s drainage to avoid waterlogging, which can lead to root rot and fungal issues.",
      "Rain is on the way! Hold off on applying fertilizer, as it may get washed away, wasting nutrients and potentially harming nearby water sources.",
      "With wet conditions today, keep an eye out for pests that thrive in moist environments, and be ready to take action if needed."
    ],
    Clouds: [
      "It's cloudy today! Monitor sunlight-sensitive plants and adjust light requirements if possible.",
      "Overcast weather can cool down plants; consider reducing water frequency if soil stays moist.",
      "Clouds can affect crop growth; use supplemental lighting if you have sensitive or greenhouse plants."
    ],
    Snow: [
      "It’s snowy! Clear off snow from greenhouse roofs to maximize sunlight for your crops.",
      "Use mulch or organic covers to keep the soil insulated during snowy conditions.",
      "Check for frost protection and insulate roots with straw or other materials to avoid freezing."
    ],
    Thunderstorm: [
      "Thunderstorms expected! Secure young plants or cover them to prevent damage.",
      "Avoid working near tall metal structures during thunderstorms and stay safe indoors.",
      "Heavy rains may accompany the storm; check drainage systems to prevent waterlogging."
    ],
    Haze: [
      "The weather is hazy today! Limit water evaporation by watering early in the morning or late in the evening.",
      "Keep an eye on plant health as haze can limit sunlight exposure. Adjust supplementary lighting if necessary.",
      "If haze persists, check air quality as it may impact sensitive plants. Ensure good ventilation in greenhouses."
    ]
  };

  const currentCondition = weather?.details || "Unknown";
  console.log(currentCondition);
  console.log("tips[currentCondition] " + tips[currentCondition]);
  const displayTips = tips[currentCondition] || [];
  const tipToDisplay = Math.floor(Math.random() * 3);
  console.log("tipToDisplay " + tipToDisplay);
  console.log("displayTips " + displayTips[tipToDisplay]);


  const getCurrentDate = () => {
    return format(new Date(), "do MMMM yyyy, EEEE"); 
  };
  return (
    <div className="weather-details-container">
      <div className="weatherHeader">
        <img src="./weatherlogo.png" alt="weather logo" />
        <div className="weatherTitleWrapper">
          <h2>Weather</h2>
          <p>Explore key market trends and insights to stay ahead.</p>
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        weather && (
          <div className="weather-main">
            {/* <div className="weather-visualization" style={{ backgroundColor: weather.bgColor }}>
              <div className="location">
                <FaMapMarkerAlt size={18} color="#fff" />
                <span>{`${weather.name}, ${weather.country}`}</span>
              </div>
              <p className="date">{getCurrentDate()}</p>
              <div className="temperature-display">
                {getWeatherIcon()}
                <p className="temperature">{`${weather.temp.toFixed()}°C`}</p>
              </div>

              <Forecast title="Hourly Forecast" data={weather.hourly} />
            </div> */}
            <WeatherWidget showSearch={false} />

            <div className="weather-info">
              <div className="tipWrapper">
                <h3 className="highlights-title">Now is a good weather
                  for spraying pesticides.</h3>
                <div className="weather-tip">
                  {/* Today’s weather is sunny! Make sure to irrigate your crops early in the morning or late in the evening to prevent excessive water evaporation during peak sunlight. */}
                  <div className="imgTipWrapper">
                    <img src="./Light.svg" alt="" />
                    {displayTips.length > 0 ? (
                      <p>{displayTips[tipToDisplay]}</p>
                    ) : (
                      <p>No specific tips for today's weather condition.</p>
                    )}
                  </div>
                </div>
              </div>
              <h3 className="highlights-title">Today's Highlights</h3>
              <div className="highlights-grid">
                <div className="highlight-box">
                  <p>UV Index</p>
                  <p>{weather.uvi || "N/A"}</p>
                </div>
                <div className="highlight-box">
                  <p>Wind Status</p>
                  <p>{weather.speed} Km/hr</p>
                </div>
                <div className="highlight-box">
                  <p>Sunrise & Sunset</p>
                  <p style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                    <div className="ssIconTextWrapper">
                      <BsFillSunriseFill /> {weather.sunrise}
                    </div>
                    <div className="ssIconTextWrapper"> <BsFillSunsetFill /> {weather.sunset}</div></p>
                </div>
                <div className="highlight-box">
                  <p>Humidity</p>
                  <p>{weather.humidity || "N/A"}%</p>
                </div>
                <div className="highlight-box">
                  <p>Visibility</p>
                  <p>{weather.visibility || "N/A"} Km</p>
                </div>
                <div className="highlight-box">
                  <p>Air Quality</p>
                  <p>{weather.aqi || "N/A"}</p>
                </div>
              </div>

            </div>

          </div>

        )
      )}
      <div className="d-flex justify-content-center align-items-center vh-50">
        <Link to="/" className="btn btn-dark btn-lg rounded-pill mt-3">
          Go Back
        </Link>
      </div>

      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
}

export default Weather;
