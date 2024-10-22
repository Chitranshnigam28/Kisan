import "../css/weather.css"
import { useEffect, useState } from 'react';
import TopButtons from '../Components/weatherComponents/TopButtons';
import Inputs from '../Components/weatherComponents/Inputs';
import TimeAndLocation from '../Components/weatherComponents/TimeAndLocation';
import TemperatureAndDetails from '../Components/weatherComponents/TemperatureAndDetails';
import Forecast from '../Components/weatherComponents/Forecast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Weather() {
  const [query, setQuery] = useState({ q: "toronto" });  // Default to city name
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    try {
      setLoading(true);
      
      // Detect whether to use city name or latitude/longitude
      const isGeolocation = query.lat && query.lon;
      const queryString = isGeolocation
        ? `lat=${query.lat}&lon=${query.lon}`
        : `q=${query.q}`;
        
      const cityName = query.q ? capitalizeFirstLetter(query.q) : "current location";
      toast.info(`Fetching weather data for ${isGeolocation ? "current location" : cityName}...`);
      
      // console.log("Query being sent:", query);
      const response = await fetch(`http://localhost:5001/api/weather?${queryString}&units=${units}`);
      if (!response.ok) throw new Error("Failed to fetch weather data");

      const data = await response.json();
      // console.log("Weather data received:", data);
      if (!data.temp || !data.hourly || !data.daily) {
        throw new Error("Incomplete weather data received");
      }
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather(data);
    } catch (error) {
      toast.error(`Error fetching weather data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      getWeather();
    }, 500);  // Debounce: Wait 500ms before making API call to reduce unnecessary calls.

    return () => clearTimeout(timerId);  // Cleanup timer
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    return weather.temp <= threshold ? "from-cyan-600 to-blue-700" : "from-yellow-600 to-orange-700";
  };

  return (
    
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl max-w-full h-auto shadow-gray-400 ${formatBackground()}`} style={{ height: '60vh', overflowY: 'auto' }}>
     

      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />

      {loading ? (
        <p className="text-center text-xl text-white">Loading...</p>
      ) : (
        weather && (
          <>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />
            <Forecast key="forecast1" title="3-hour step forecast" data={weather.hourly} />
            <Forecast key="forecast2" title="daily forecast" data={weather.daily} />
          </>
        )
      )}

      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
}

export default Weather;
