import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "../css/weatherWidget.css";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import axios from "axios";
import SimpleLoader from "./SimpleLoader";
import Day from './../Assets/Weather/Day.svg'

const getCurrentDate = () => format(new Date(), "do MMMM yyyy, EEEE");

function WeatherWidget({ showSearch = true }) {
  const [query, setQuery] = useState({ q: localStorage.getItem("searchCity") || "Delhi" });
  const [searchCity, setSearchCity] = useState(localStorage.getItem("searchCity") || "Delhi");
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [translatedLocation, setTranslatedLocation] = useState("Delhi");
  const [translatedDate, setTranslatedDate] = useState(getCurrentDate());
  const [translatedLabels, setTranslatedLabels] = useState({
    searchPlaceholder: "Search city",
    hourlyForecastLabel: "Hourly Forecast",
    noData: "No hourly forecast data available",
  });

  const navigate = useNavigate();

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const queryString = query.lat && query.lon ? `lat=${query.lat}&lon=${query.lon}` : `q=${query.q}`;
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/weather?${queryString}&units=${units}`);
      if (!response.ok) throw new Error("Failed to fetch weather data");

      const data = await response.json();
      setWeather({
        name: data.name,
        country: data.country,
        hourlyForecast: data.hourly,
        temp: data.temp,
        icon: data.icon,
        condition: data.condition,
      });

      // Translate location and date once weather data is available
      translateText(`${data.name}, ${data.country}`, language).then(setTranslatedLocation);
      translateText(getCurrentDate(), language).then(setTranslatedDate);
    } catch (error) {
      toast.error(`Error fetching weather data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const translateText = async (text, targetLanguage) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/translate`, {
        text,
        targetLanguage,
      });
      return response.data.translatedText;
    } catch (error) {
      console.error("Error translating text:", error);
      return text; // Fallback to original text in case of error
    }
  };

  useEffect(() => {
    fetchWeatherData();
    const translateLabels = async () => {
      const labels = {
        searchPlaceholder: await translateText("Search city", language),
        hourlyForecastLabel: await translateText("Hourly Forecast", language),
        noData: await translateText("No hourly forecast data available", language),
      };
      setTranslatedLabels(labels); // Update translated labels state
    };
    translateLabels(); // Call to update labels
  }, [query, units, language]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setQuery({ q: searchCity.trim() });
      localStorage.setItem("searchCity", searchCity.trim()); // Store city in localStorage
    } else {
      setQuery({ q: "Delhi" });
      localStorage.removeItem("searchCity"); // Clear localStorage if no search is entered
    }
  };

  const getBackgroundColor = () => {
    const hour = new Date().getHours();
    const isNightTime = hour >= 18 || hour < 6;

    const isRainy = weather?.icon && weather.icon.includes("10");
    const isHazy = weather?.icon && weather.icon.includes("50");
    const isCloudy = weather?.icon && (weather.icon.includes("03") || weather.icon.includes("04"));
    const isSunny = weather?.icon && weather.icon.includes("01");

    if (isRainy) return { backgroundColor: "#84B8EA", color: "#FFFFFF" };
    if (isHazy) return { backgroundColor: "#84B8EA", color: "#FFFFFF" };
    if (isCloudy) return { backgroundColor: "#84B8EA", color: "#FFFFFF" };
    if (isSunny && !isNightTime) return { backgroundColor: "#84B8EA", color: "#333333" };
    if (isNightTime) return { backgroundColor: "#84B8EA", color: "#FFFFFF" };

    return { backgroundColor: "#84B8EA", color: "#FFFFFF" };
  };

  return (
    <div>
      <div
        className={`weather-widget ${weather?.condition}`}
        style={weather ? getBackgroundColor() : { backgroundColor: "#87CEFA", color: "#FFFFFF" }}
        onClick={() => navigate("/weather")}
      >
        {loading ? (
          <SimpleLoader />
) : (
          weather && (
            <div className="widget-content">
              <div className="locationSearchWrapper">
                <div className="widgetLocationWrapper">
                  <FaMapMarkerAlt />
                  <p className="location">{translatedLocation}</p>
                </div>
                
              </div>
              <div className="widgetDateWeatherIconWrapper">
                <p className="date">{translatedDate}</p>
                <img src={Day} alt="weather-icon" className="weather-icon" />
                {/* <img src={weather.icon} alt="weather-icon" className="weather-icon" /> */}
              </div>
              <div className="temp-icon">
                <p className="widgetTemperature">{`+${Math.round(weather.temp)}°`}</p>
              </div>
              <div className="hourly-forecast">
                {weather.hourlyForecast ? (
                  <>
                    {weather.hourlyForecast.map((hour, index) => (
                      <div key={index} className="hour">
                        <p>{hour.title}</p>
                        <img src={hour.icon} alt="hourly-icon" />
                        <p>{`${Math.round(hour.temp)}°`}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>{translatedLabels.noData}</p>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default WeatherWidget;

