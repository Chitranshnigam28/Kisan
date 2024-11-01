import "../css/weatherPage.css";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { FaMapMarkerAlt } from 'react-icons/fa';
import Forecast from '../Components/weatherComponents/Forecast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopCropsChart from "./TopCropChart"; //Matching the location for both weather and

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Weather() {
  const location = useLocation();
  const [query, setQuery] = useState(location.state?.query || { q: "Delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  function getWeatherIcon(condition) {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny size={64} color="#FFD700" />;
      case 'Clouds':
        return <WiCloud size={64} color="#A9A9A9" />;
      case 'Rain':
        return <WiRain size={64} color="#1E90FF" />;
      case 'Snow':
        return <WiSnow size={64} color="#ADD8E6" />;
      case 'Thunderstorm':
        return <WiThunderstorm size={64} color="#00008B" />;
      default:
        return <WiCloud size={64} color="#A9A9A9" />;
    }
  }

  const getWeather = async () => {
    try {
      setLoading(true);
      const isGeolocation = query.lat && query.lon;
      const queryString = isGeolocation ? `lat=${query.lat}&lon=${query.lon}` : `q=${query.q}`;
      const cityName = query.q ? capitalizeFirstLetter(query.q) : "current location";
      toast.info(`Fetching weather data for ${isGeolocation ? "current location" : cityName}...`);

      const response = await fetch(`http://localhost:5001/api/weather?${queryString}&units=${units}`);
      if (!response.ok) throw new Error("Failed to fetch weather data");

      const data = await response.json();
      if (!data.temp || !data.hourly || !data.daily || !data.name || !data.country) throw new Error("Incomplete weather data received");

      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather({
        ...data,
        bgColor: data.weather && data.weather[0] ? getBackgroundColor(data.weather[0].main) : "#FFD700",
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

  return (
    <div className="weather-details-container">
      <div className="weather-tip">
        Today’s weather is sunny! Make sure to irrigate your crops early in the morning or late in the evening to prevent excessive water evaporation during peak sunlight.
      </div>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        weather && (
          <div className="weather-main">
            <div className="weather-visualization" style={{ backgroundColor: weather.bgColor }}>
              <div className="temperature-display">
                {getWeatherIcon()}
                <p className="temperature">{`${weather.temp.toFixed()}°C`}</p>
              </div>
              <div className="location">
                <FaMapMarkerAlt size={18} color="#fff" />
                <span>{`${weather.name}, ${weather.country}`}</span>
              </div>
              <Forecast title="Hourly Forecast" data={weather.hourly} />
            </div>

            <div className="weather-info">
              <h3 className="highlights-title">Today's Highlights</h3>
              <div className="highlights-grid">
                <div className="highlight-box">
                  <p>UV Index</p>
                  <p>{weather.uvi}</p>
                </div>
                <div className="highlight-box">
                  <p>Wind Status</p>
                  <p>{weather.speed} Km/hr</p>
                </div>
                <div className="highlight-box">
                  <p>Sunrise & Sunset</p>
                  <p><BsFillSunriseFill /> {weather.sunrise} / <BsFillSunsetFill /> {weather.sunset}</p>
                </div>
                <div className="highlight-box">
                  <p>Humidity</p>
                  <p>{weather.humidity}%</p>
                </div>
                <div className="highlight-box">
                  <p>Visibility</p>
                  <p>{weather.visibility} Km</p>
                </div>
                <div className="highlight-box">
                  <p>Air Quality</p>
                  <p>{weather.aqi || 'N/A'}</p>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center vh-50">
                <Link to="/" className="btn btn-dark btn-lg rounded-pill mt-3">
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        )
      )}

      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
}

export default Weather;
