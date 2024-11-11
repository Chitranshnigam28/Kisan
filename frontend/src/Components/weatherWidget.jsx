import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "../css/weatherWidget.css";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import axios from "axios";

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
      const response = await fetch(`http://localhost:5001/api/weather?${queryString}&units=${units}`);
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
      const response = await axios.post("http://localhost:5001/api/translate", {
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

    if (isRainy) return { backgroundColor: "#627685", color: "#FFFFFF" };
    if (isHazy) return { backgroundColor: "#627685", color: "#FFFFFF" };
    if (isCloudy) return { backgroundColor: "#A9A9A9", color: "#FFFFFF" };
    if (isSunny && !isNightTime) return { backgroundColor: "#84B8EA", color: "#333333" };
    if (isNightTime) return { backgroundColor: "#1E3146", color: "#FFFFFF" };

    return { backgroundColor: "#FF6347", color: "#FFFFFF" };
  };

  return (
    <div>
      <div
        className={`weather-widget ${weather?.condition}`}
        style={weather ? getBackgroundColor() : { backgroundColor: "#87CEFA", color: "#FFFFFF" }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          weather && (
            <div className="widget-content">
              <div className="locationSearchWrapper">
                <div className="widgetLocationWrapper">
                  <FaMapMarkerAlt />
                  <p className="location">{translatedLocation}</p>
                </div>
                {showSearch && (
                  <form onSubmit={handleSearchSubmit} className="search-form">
                    <input
                      type="text"
                      placeholder={translatedLabels.searchPlaceholder}
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="search-input"
                    />
                    <button type="submit" className="search-button">
                      <FaSearch />
                    </button>
                  </form>
                )}
              </div>
              <div className="widgetDateWeatherIconWrapper">
                <p className="date">{translatedDate}</p>
                <img src={weather.icon} alt="weather-icon" className="weather-icon" />
              </div>
              <div className="temp-icon">
                <p className="widgetTemperature">{`+${Math.round(weather.temp)}°`}</p>
              </div>
              <div className="hourly-forecast">
                {weather.hourlyForecast ? (
                  <>
                    <h3>{translatedLabels.hourlyForecastLabel || "Hourly Forecast"}</h3>
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
        {/* <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" /> */}
      </div>
    </div>
  );
}

export default WeatherWidget;
