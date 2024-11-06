import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import '../css/weatherWidget.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { BiRightTopArrowCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

function WeatherWidget({ showSearch = true }) {
    const [query, setQuery] = useState({ q: "Delhi" });
    const [searchCity, setSearchCity] = useState("");
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
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
        } catch (error) {
            toast.error(`Error fetching weather data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, [query, units]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setQuery({ q: searchCity });
    };

    const getCurrentDate = () => format(new Date(), "do MMMM yyyy, EEEE");

    // Background color based on weather condition
    const getBackgroundColor = () => {
        const hour = new Date().getHours();
        const isNightTime = hour >= 18 || hour < 6;

        const isRainy = weather?.icon && weather.icon.includes('10');
        const isHazy = weather?.icon && weather.icon.includes('50');
        const isCloudy = weather?.icon && (weather.icon.includes('03') || weather.icon.includes('04'));
        const isSunny = weather?.icon && weather.icon.includes('01');

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
                style={weather ? getBackgroundColor() : { backgroundColor: '#87CEFA', color: '#FFFFFF' }}
            >
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    weather && (
                        <div className="widget-content">
                            <div className="locationSearchWrapper">
                                <div className="widgetLocationWrapper">
                                    <FaMapMarkerAlt />
                                    <p className="location">
                                        {`${weather.name}, ${weather.country}`}
                                    </p>
                                </div>
                                {showSearch && (
                                    <form onSubmit={handleSearchSubmit} className="search-form">
                                        <input
                                            type="text"
                                            placeholder="Search city"
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
                                <p className="date">{getCurrentDate()}</p>
                                <img src={weather.icon} alt="weather-icon" className="weather-icon" />
                            </div>
                            <div className="temp-icon">
                                <p className="widgetTemperature">{`+${Math.round(weather.temp)}°`}</p>
                            </div>
                            <div className="hourly-forecast">
                                {weather.hourlyForecast ? (
                                    weather.hourlyForecast.map((hour, index) => (
                                        <div key={index} className="hour">
                                            <p>{hour.title}</p>
                                            <img src={hour.icon} alt="hourly-icon" />
                                            <p>{`${Math.round(hour.temp)}°`}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No hourly forecast data available</p>
                                )}
                            </div>
                        </div>
                    )
                )}
                <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
            </div>
            {/* New button to navigate to weather page */}
            {/* <button onClick={() => navigate('/weather')} className="go-to-weather-button">
            <Link to="/weather">
                <BiRightTopArrowCircle style={{ fontSize: "30px", color: "grey" }} />
            </Link>
            </button> */}
        </div>
    );
}

export default WeatherWidget;

// import React, { useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { format } from 'date-fns';
// import '../css/weatherWidget.css';
// import { FaMapMarkerAlt } from 'react-icons/fa';
// import { FaSearch } from 'react-icons/fa';
// import { BiRightTopArrowCircle } from "react-icons/bi";
// import { Link } from "react-router-dom";

// // Language data
// const translations = {
//   en: {
//     searchPlaceholder: "Search city",
//     hourlyForecastLabel: "Hourly Forecast",
//     noData: "No hourly forecast data available",
//     weatherConditions: {
//       clear: "Clear",
//       cloudy: "Cloudy",
//       rainy: "Rainy",
//       sunny: "Sunny",
//       stormy: "Stormy",
//     },
//   },
//   hi: {
//     searchPlaceholder: "शहर खोजें",
//     hourlyForecastLabel: "घंटेवार पूर्वानुमान",
//     noData: "कोई घंटेवार पूर्वानुमान डेटा उपलब्ध नहीं है",
//     weatherConditions: {
//       clear: "साफ",
//       cloudy: "बादल",
//       rainy: "बारिश",
//       sunny: "धूप",
//       stormy: "आंधी",
//     },
//   },
//   pa: {
//     searchPlaceholder: "ਸ਼ਹਿਰ ਖੋਜੋ",
//     hourlyForecastLabel: "ਘੰਟੇਵਾਰ ਮੌਸਮ ਪੇਸ਼ਗੋਈ",
//     noData: "ਘੰਟੇਵਾਰ ਮੌਸਮ ਪੇਸ਼ਗੋਈ ਦਾ ਡਾਟਾ ਉਪਲਬਧ ਨਹੀਂ ਹੈ",
//     weatherConditions: {
//       clear: "ਸਾਫ",
//       cloudy: "ਬਦਲ",
//       rainy: "ਮੀਂਹ",
//       sunny: "ਧੂਪ",
//       stormy: "ਤੂਫਾਨ",
//     },
//   },
// };

// function WeatherWidget({ showSearch = true }) {
//   const [query, setQuery] = useState({ q: "Delhi" });
//   const [searchCity, setSearchCity] = useState("");
//   const [units, setUnits] = useState("metric");
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [language, setLanguage] = useState(localStorage.getItem("language") || "en"); // Retrieve language from localStorage
//   const navigate = useNavigate();

//   // Function to fetch weather data
//   const fetchWeatherData = async () => {
//     try {
//       setLoading(true);
//       const queryString = query.lat && query.lon ? `lat=${query.lat}&lon=${query.lon}` : `q=${query.q}`;
//       const response = await fetch(`http://localhost:5001/api/weather?${queryString}&units=${units}`);
//       if (!response.ok) throw new Error("Failed to fetch weather data");

//       const data = await response.json();
//       setWeather({
//         name: data.name,
//         country: data.country,
//         hourlyForecast: data.hourly,
//         temp: data.temp,
//         icon: data.icon,
//         condition: data.condition,
//       });
//     } catch (error) {
//       toast.error(`Error fetching weather data: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWeatherData();
//   }, [query, units]);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     setQuery({ q: searchCity });
//   };

//   const getCurrentDate = () => format(new Date(), "do MMMM yyyy, EEEE");

//   const getBackgroundColor = () => {
//     const hour = new Date().getHours();
//     const isNightTime = hour >= 18 || hour < 6;

//     const isRainy = weather?.icon && weather.icon.includes('10');
//     const isHazy = weather?.icon && weather.icon.includes('50');
//     const isCloudy = weather?.icon && (weather.icon.includes('03') || weather.icon.includes('04'));
//     const isSunny = weather?.icon && weather.icon.includes('01');

//     if (isRainy) return { backgroundColor: "#627685", color: "#FFFFFF" };
//     if (isHazy) return { backgroundColor: "#627685", color: "#FFFFFF" };
//     if (isCloudy) return { backgroundColor: "#A9A9A9", color: "#FFFFFF" };
//     if (isSunny && !isNightTime) return { backgroundColor: "#84B8EA", color: "#333333" };
//     if (isNightTime) return { backgroundColor: "#1E3146", color: "#FFFFFF" };

//     return { backgroundColor: "#FF6347", color: "#FFFFFF" };
//   };

//   // Translate weather condition based on selected language
//   const translateCondition = (condition) => {
//     const weatherTranslations = translations[language]?.weatherConditions;
//     return weatherTranslations?.[condition] || condition;
//   };

//   return (
//     <div>
//       <div
//         className={`weather-widget ${weather?.condition}`}
//         style={weather ? getBackgroundColor() : { backgroundColor: '#87CEFA', color: '#FFFFFF' }}
//       >
//         {loading ? (
//           <p>{translations[language].noData}</p>
//         ) : (
//           weather && (
//             <div className="widget-content">
//               <div className="locationSearchWrapper">
//                 <div className="widgetLocationWrapper">
//                   <FaMapMarkerAlt />
//                   <p className="location">
//                     {`${weather.name}, ${weather.country}`}
//                   </p>
//                 </div>
//                 {showSearch && (
//                   <form onSubmit={handleSearchSubmit} className="search-form">
//                     <input
//                       type="text"
//                       placeholder={translations[language].searchPlaceholder}
//                       value={searchCity}
//                       onChange={(e) => setSearchCity(e.target.value)}
//                       className="search-input"
//                     />
//                     <button type="submit" className="search-button">
//                       <FaSearch />
//                     </button>
//                   </form>
//                 )}
//               </div>
//               <div className="widgetDateWeatherIconWrapper">
//                 <p className="date">{getCurrentDate()}</p>
//                 <img src={weather.icon} alt="weather-icon" className="weather-icon" />
//               </div>
//               <div className="temp-icon">
//                 <p className="widgetTemperature">{`+${Math.round(weather.temp)}°`}</p>
//               </div>
//               <div className="hourly-forecast">
//                 <p>{translations[language].hourlyForecastLabel}</p>
//                 {weather.hourlyForecast ? (
//                   weather.hourlyForecast.map((hour, index) => (
//                     <div key={index} className="hour">
//                       <p>{hour.title}</p>
//                       <img src={hour.icon} alt="hourly-icon" />
//                       <p>{`${Math.round(hour.temp)}°`}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p>{translations[language].noData}</p>
//                 )}
//               </div>
//             </div>
//           )
//         )}
//         <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
//       </div>
//     </div>
//   );
// }

// export default WeatherWidget;
