
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
import { FaMapMarkerAlt } from "react-icons/fa";
import Forecast from "../Components/weatherComponents/Forecast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import axios from "axios";
import Header from './Dashboard/Header';
import { Footer } from './Dashboard/Footer';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Weather() {
  const location = useLocation();
  const [query, setQuery] = useState(() => {
    const storedCity = localStorage.getItem("searchCity") || "Delhi";
    return { q: storedCity };
  });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [translatedContent, setTranslatedContent] = useState({});

  async function translateText(text, targetLanguage) {
    try {
      const response = await axios.post('http://localhost:5001/api/translate', {
        text: text,
        targetLanguage: targetLanguage,
      });
      return response.data.translatedText;
    } catch (error) {
      console.error("Error translating text:", error);
      return text;
    }
  }

  async function translateWeatherContent(content, targetLanguage) {
    const translated = {
      tips: await Promise.all(
        content.tips.map((tip) => translateText(tip, targetLanguage))
      ),
      highlight: await translateText(content.highlight, targetLanguage),
      labels: {
        uvIndex: await translateText("UV Index", targetLanguage),
        windStatus: await translateText("Wind Status", targetLanguage),
        sunriseSunset: await translateText("Sunrise & Sunset", targetLanguage),
        humidity: await translateText("Humidity", targetLanguage),
        visibility: await translateText("Visibility", targetLanguage),
        pressure: await translateText("Pressure", targetLanguage),
        loading: await translateText("Loading...", targetLanguage),
        noTips: await translateText("No specific tips for today's weather condition.", targetLanguage),
      },
      locationLabel: await translateText("Weather", targetLanguage),
      subtitle: await translateText("Explore key market trends and insights to stay ahead.", targetLanguage),
      tipsTitle: await translateText("Today's Highlights", targetLanguage),
    };
    setTranslatedContent(translated);
  }

  useEffect(() => {
    if (weather) {
      const currentCondition = weather.details || "Unknown";
      const contentToTranslate = {
        tips: tips[currentCondition] || [],
        highlight: highlightsMessages[currentCondition] || "Check conditions before applying pesticides.",
      };
      translateWeatherContent(contentToTranslate, language);
    }
  }, [weather, language]);

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
        `Fetching weather data for ${isGeolocation ? "current location" : cityName}...`
      );

      const response = await fetch(
        `http://localhost:5001/api/weather?${queryString}&units=${units}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");

      const data = await response.json();
      if (
        !data.temp ||
        !data.hourly ||
        !data.daily ||
        !data.name ||
        !data.country
      )
        throw new Error("Incomplete weather data received");

      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather({
        ...data,
        bgColor:
          data.weather && data.weather[0]
            ? getBackgroundColor(data.weather[0].main)
            : "#FFD700",
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
      "It’s a bright sunny day! Consider providing shade for young or delicate plants to protect them from sunburn.",
    ],
    Mist: [
      "Misty weather adds moisture to the soil; adjust irrigation to avoid overwatering.",
      "Mist may promote pest activity; inspect plants regularly and consider organic pest control methods.",
      "Avoid applying pesticides during mist, as they may not adhere well; wait for clearer weather for best results."
    ],    
    Rain: [
      "Expect some rain today! Check your field’s drainage to avoid waterlogging, which can lead to root rot and fungal issues.",
      "Rain is on the way! Hold off on applying fertilizer, as it may get washed away, wasting nutrients and potentially harming nearby water sources.",
      "With wet conditions today, keep an eye out for pests that thrive in moist environments, and be ready to take action if needed.",
    ],
    Clouds: [
      "It's cloudy today! Monitor sunlight-sensitive plants and adjust light requirements if possible.",
      "Overcast weather can cool down plants; consider reducing water frequency if soil stays moist.",
      "Clouds can affect crop growth; use supplemental lighting if you have sensitive or greenhouse plants.",
    ],
    Snow: [
      "It’s snowy! Clear off snow from greenhouse roofs to maximize sunlight for your crops.",
      "Use mulch or organic covers to keep the soil insulated during snowy conditions.",
      "Check for frost protection and insulate roots with straw or other materials to avoid freezing.",
    ],
    Thunderstorm: [
      "Thunderstorms expected! Secure young plants or cover them to prevent damage.",
      "Avoid working near tall metal structures during thunderstorms and stay safe indoors.",
      "Heavy rains may accompany the storm; check drainage systems to prevent waterlogging.",
    ],
    Haze: [
      "The weather is hazy today! Limit water evaporation by watering early in the morning or late in the evening.",
      "Keep an eye on plant health as haze can limit sunlight exposure. Adjust supplementary lighting if necessary.",
      "If haze persists, check air quality as it may impact sensitive plants. Ensure good ventilation in greenhouses.",
    ],
    Fog: [
      "Foggy conditions may reduce visibility. Drive carefully.",
      "Fog can be detrimental to crop health; ensure good ventilation in greenhouses.",
      "Check for pests that thrive in humid conditions due to fog.",
    ],
  };

  const highlightsMessages = {
    Clear: "Now is a good weather for spraying pesticides.",
    Rain: "Rainy weather is ideal for root fertilization but not for pesticides.",
    Clouds: "Cloudy weather is great for some pesticide applications, check humidity levels first.",
    Snow: "Snowy conditions require caution, wait until snow clears for pesticide application.",
    Thunderstorm: "Avoid applying pesticides during thunderstorms due to strong winds and rain.",
    Haze: "Hazy weather can affect pesticide efficacy; ensure good ventilation.",
    Fog: "Foggy conditions are not ideal for spraying pesticides; wait until it clears.",
    Mist: "Mist provides natural moisture; monitor plants for fungal growth and pests."
  };

  const currentCondition = weather?.details || "Unknown";
  const displayTips = translatedContent.tips || [];
  const tipToDisplay = Math.floor(Math.random() * displayTips.length);
  const highlightsMessage = translatedContent.highlight || "Check conditions before applying pesticides.";

  const getCurrentDate = () => {
    return format(new Date(), "do MMMM yyyy, EEEE");
  };

  return (
    <>
      <Header />
      <Footer />
      <div className="weather-details-container">
        <div className="weatherHeader">
          <img src="./weatherlogo.png" alt="weather logo" />
          <div className="weatherTitleWrapper">
            <h2>{translatedContent.locationLabel || "Weather"}</h2>
            <p>{translatedContent.subtitle || "Explore key market trends and insights to stay ahead."}</p>
          </div>
        </div>

        {loading ? (
          <p className="loading-text">{translatedContent.labels?.loading || "Loading..."}</p>
        ) : (
          weather && (
            <div className="weather-main">
              <div
                className="weather-visualization"
                style={{ backgroundColor: weather.bgColor }}
              >
                <div className="location">
                  <FaMapMarkerAlt size={18} color="#fff" />
                  <span>{`${weather.name}, ${weather.country}`}</span>
                </div>
                <div className="dateWeatherIconWrapper">
                  <p className="date">{getCurrentDate()}</p>
                  {getWeatherIcon()}
                </div>
                <div className="temperature-display">
                  <p className="temperature">{`${weather.temp.toFixed()}°C`}</p>
                </div>

                <Forecast title="Hourly Forecast" data={weather.hourly} />
              </div>

              <div className="weather-info">
                <div className="tipWrapper">
                  <h3 className="highlights-title">{highlightsMessage}</h3>
                  <div className="weather-tip">
                    <div className="imgTipWrapper">
                      <img src="./Light.svg" alt="light" />
                      {displayTips.length > 0 ? (
                        <p>{displayTips[tipToDisplay]}</p>
                      ) : (
                        <p>{translatedContent.labels?.noTips || "No specific tips for today's weather condition."}</p>
                      )}
                    </div>
                  </div>
                </div>

                <h3>{translatedContent.tipsTitle || "Today's Highlights"}</h3>
                <div className="weather-highlights">
                  <div className="highlight-box">
                    <p>{translatedContent.labels?.uvIndex || "UV Index"}</p>
                    <p>{weather.uvi}</p>
                  </div>
                  <div className="highlight-box">
                    <p>{translatedContent.labels?.windStatus || "Wind Status"}</p>
                    <p>{weather.speed} m/s</p>
                  </div>
                  <div className="highlight-box">
                    <p>{translatedContent.labels?.sunriseSunset || "Sunrise & Sunset"}</p>
                    <p>{`${weather.sunrise} / ${weather.sunset}`}</p>
                  </div>
                  <div className="highlight-box">
                    <p>{translatedContent.labels?.humidity || "Humidity"}</p>
                    <p>{weather.humidity}%</p>
                  </div>
                  <div className="highlight-box">
                    <p>{translatedContent.labels?.visibility || "Visibility"}</p>
                    <p>{weather.visibility} km</p>
                  </div>
                  <div className="highlight-box">
                    <p>{translatedContent.labels?.aqi || "Air Quality"}</p>
                    <p>{weather.aqi}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        <ToastContainer autoClose={3000} />
      </div>
    </>
  );
}

export default Weather;
