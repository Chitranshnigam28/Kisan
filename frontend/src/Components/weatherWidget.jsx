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

// function WeatherWidget({ showSearch = true }) {
//     const [query, setQuery] = useState({ q: "Delhi" });
//     const [searchCity, setSearchCity] = useState("");
//     const [units, setUnits] = useState("metric");
//     const [weather, setWeather] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const fetchWeatherData = async () => {
//         try {
//             setLoading(true);
//             const queryString = query.lat && query.lon ? `lat=${query.lat}&lon=${query.lon}` : `q=${query.q}`;
//             const response = await fetch(`http://localhost:5001/api/weather?${queryString}&units=${units}`);
//             if (!response.ok) throw new Error("Failed to fetch weather data");

//             const data = await response.json();
//             setWeather({
//                 name: data.name,
//                 country: data.country,
//                 hourlyForecast: data.hourly,
//                 temp: data.temp,
//                 icon: data.icon,
//                 condition: data.condition,
//             });
//         } catch (error) {
//             toast.error(`Error fetching weather data: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchWeatherData();
//     }, [query, units]);

//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         setQuery({ q: searchCity });
//     };

//     const handleWidgetClick = () => {
//         navigate('/weather', { state: { query } });
//     };

//     const getCurrentDate = () => format(new Date(), "do MMMM yyyy, EEEE");

//     // Updated getBackgroundColor function inside the component
//     const getBackgroundColor = () => {
//         const hour = new Date().getHours();
//         const isNightTime = hour >= 18 || hour < 6; // Nighttime check

//         const isRainy = weather?.icon && weather.icon.includes('10'); // Rain
//         const isHazy = weather?.icon && weather.icon.includes('50'); // Haze, Mist, Fog
//         const isCloudy = weather?.icon && (weather.icon.includes('03') || weather.icon.includes('04')); // Cloudy
//         const isSunny = weather?.icon && weather.icon.includes('01'); // Clear skies, typically sunny

//         if (isRainy) return { backgroundColor: "#627685", color: "#FFFFFF" }; // Rainy - Dark grayish-blue
//         if (isHazy) return { backgroundColor: "#627685", color: "#FFFFFF" }; // Haze - Muted grayish-blue
//         if (isCloudy) return { backgroundColor: "#A9A9A9", color: "#FFFFFF" }; // Cloudy - Light gray
//         if (isSunny && !isNightTime) return { backgroundColor: "#84B8EA", color: "#333333" }; // Sunny - Warm gold during the day
//         if (isNightTime) return { backgroundColor: "#1E3146", color: "#FFFFFF" }; // Night - Dark blue for nighttime conditions

//         return { backgroundColor: "#FF6347", color: "#FFFFFF" }; // Default - Hot weather (Tomato color)
//     };

//     return (
//         <div>
            

//             <div
//                 className={`weather-widget ${weather?.condition}`}
//                 onClick={handleWidgetClick}
//                 style={weather ? getBackgroundColor() : { backgroundColor: '#87CEFA', color: '#FFFFFF' }}
//             >
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     weather && (
//                         <div className="widget-content">
//                                 <div className="locationSearchWrapper">
//                                     <div className="widgetLocationWrapper">
//                                     <FaMapMarkerAlt/>
//                                         <p className="location">
//                                             {`${weather.name}, ${weather.country}`}
//                                         </p>
//                                     </div>
//                                     {showSearch && (
//                                                     <form onSubmit={handleSearchSubmit} className="search-form">
//                                                         <input
//                                                             type="text"
//                                                             placeholder="Search city"
//                                                             value={searchCity}
//                                                             onChange={(e) => setSearchCity(e.target.value)}
//                                                             className="search-input"
//                                                         />
//                                                         <button type="submit" className="search-button"><FaSearch/></button>
//                                                     </form>
//                                                 )}
//                                 </div>
//                             <div className="widgetDateWeatherIconWrapper">
//                                 <p className="date">{getCurrentDate()}</p>
//                                 <img src={weather.icon} alt="weather-icon" className="weather-icon" />
//                             </div>
//                             <div className="temp-icon">
//                                 <p className="temperature">{`+${Math.round(weather.temp)}°`}</p>
//                             </div>
//                             <div className="hourly-forecast">
//                                 {weather.hourlyForecast ? (
//                                     weather.hourlyForecast.map((hour, index) => (
//                                         <div key={index} className="hour">
//                                             <p>{hour.title}</p>
//                                             <img src={hour.icon} alt="hourly-icon" />
//                                             <p>{`${Math.round(hour.temp)}°`}</p>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p>No hourly forecast data available</p>
//                                 )}
//                             </div>
//                         </div>
//                     )
//                 )}
//                 <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
//             </div>
//         </div>
//     );
// }

// export default WeatherWidget;

// import React, { useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { format } from 'date-fns';
// import '../css/weatherWidget.css';
// import { FaMapMarkerAlt } from 'react-icons/fa';

// function WeatherWidget({ showSearch = true }) {
//     const [query, setQuery] = useState({ q: "Delhi" });
//     const [searchCity, setSearchCity] = useState("");
//     const [units, setUnits] = useState("metric");
//     const [weather, setWeather] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const fetchWeatherData = async () => {
//         try {
//             setLoading(true);
//             const queryString = query.lat && query.lon ? `lat=${query.lat}&lon=${query.lon}` : `q=${query.q}`;
//             const response = await fetch(`http://localhost:5001/api/weather?${queryString}&units=${units}`);
//             if (!response.ok) throw new Error("Failed to fetch weather data");

//             const data = await response.json();
//             setWeather({
//                 name: data.name,
//                 country: data.country,
//                 hourlyForecast: data.hourly,
//                 temp: data.temp,
//                 icon: data.icon,
//                 condition: data.condition,
//             });
//         } catch (error) {
//             toast.error(`Error fetching weather data: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchWeatherData();
//     }, [query, units]);

//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         setQuery({ q: searchCity });
//     };

//     const handleWidgetClick = () => {
//         navigate('/weather', { state: { query } });
//     };

//     const getCurrentDate = () => format(new Date(), "do MMMM yyyy, EEEE");
//     const getBackgroundColor = (temp) => {
//         const hour = new Date().getHours();
//         const isNightTime = hour >= 18 || hour < 6; // Nighttime: 6 PM to 6 AM
    
//         // Check if the icon URL hints at specific weather conditions
//         const isRainy = weather?.icon && weather.icon.includes('10'); // Rain
//         const isHazy = weather?.icon && weather.icon.includes('50'); // Haze, Mist, Fog
//         const isCloudy = weather?.icon && (weather.icon.includes('03') || weather.icon.includes('04')); // Cloudy
//         const isSunny = weather?.icon && weather.icon.includes('01'); // Clear skies, typically sunny
    
//         if (isRainy) return "#627685"; // Rainy - Dark grayish-blue
//         if (isHazy) return "#B0A7A1"; // Haze - Muted grayish-blue
//         if (isCloudy) return "#A9A9A9"; // Cloudy - Light gray
//         if (isSunny && !isNightTime) return "#FFD89E"; // Sunny - Warm gold during the day
//         if (isNightTime) return "#1E3146"; // Night - Dark blue for nighttime conditions
    
//         // if (temp <= 0) return "#00BFFF"; // Cold - Sky blue
//         // if (temp > 0 && temp <= 15) return "#84B8EA"; // Cool - Light blue
//         // if (temp > 15 && temp <= 30) return "#FFD89E"; // Warm - Gold (for warm but not specifically sunny days)
//         return "#FF6347"; // Hot - Tomato color
//     };
//     return (
//         <div>
//             {showSearch && (
//                 <form onSubmit={handleSearchSubmit} className="search-form">
//                     <input
//                         type="text"
//                         placeholder="Search city"
//                         value={searchCity}
//                         onChange={(e) => setSearchCity(e.target.value)}
//                         className="search-input"
//                     />
//                     <button type="submit" className="search-button">Search</button>
//                 </form>
//             )}

//             <div
//                 className={`weather-widget ${weather?.condition}`}
//                 onClick={handleWidgetClick}
//                 style={{ backgroundColor: weather ? getBackgroundColor(weather.temp) : '#87CEFA' }}
//             >
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     weather && (
//                         <div className="widget-content">
//                                 <div className="widgetLocationWrapper">
//                                 <FaMapMarkerAlt/>
//                                     <p className="location">
//                                         {`${weather.name}, ${weather.country}`}
//                                     </p>
//                                 </div>
//                             <div className="widgetDateWeatherIconWrapper">
//                                 <p className="date">{getCurrentDate()}</p>
//                                 <img src={weather.icon} alt="weather-icon" className="weather-icon" />
//                             </div>
//                             <div className="temp-icon">
//                                 <p className="temperature">{`+${Math.round(weather.temp)}°`}</p>
//                             </div>
//                             <div className="hourly-forecast">
//                                 {weather.hourlyForecast ? (
//                                     weather.hourlyForecast.map((hour, index) => (
//                                         <div key={index} className="hour">
//                                             <p>{hour.title}</p>
//                                             <img src={hour.icon} alt="hourly-icon" />
//                                             <p>{`${Math.round(hour.temp)}°`}</p>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p>No hourly forecast data available</p>
//                                 )}
//                             </div>
//                         </div>
//                     )
//                 )}
//                 <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
//             </div>
//         </div>
//     );
// }

// export default WeatherWidget;

// // import React, { useEffect, useState } from 'react';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { useNavigate } from 'react-router-dom';
// // import { format } from 'date-fns'; 
// // import '../css/weatherWidget.css';

// // function WeatherWidget() {
// //     const [query, setQuery] = useState({ q: "Delhi" });
// //     const [searchCity, setSearchCity] = useState("");
// //     const [units, setUnits] = useState("metric");
// //     const [weather, setWeather] = useState(null);
// //     const [loading, setLoading] = useState(false);
// //     const navigate = useNavigate();

// //     const fetchWeatherData = async () => {
// //         try {
// //             setLoading(true);
// //             const queryString = query.lat && query.lon ? `lat=${query.lat}&lon=${query.lon}` : `q=${query.q}`;
// //             const response = await fetch(`http://localhost:5001/api/weather?${queryString}&units=${units}`);
// //             if (!response.ok) throw new Error("Failed to fetch weather data");

// //             const data = await response.json();
// //             setWeather({
// //                 name: data.name,
// //                 country: data.country,
// //                 hourlyForecast: data.hourly,
// //                 temp: data.temp,
// //                 icon: data.icon,
// //                 condition: data.condition,
// //             });
// //         } catch (error) {
// //             toast.error(`Error fetching weather data: ${error.message}`);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchWeatherData();
// //     }, [query, units]);

// //     const handleSearchSubmit = (e) => {
// //         e.preventDefault();
// //         setQuery({ q: searchCity });
// //     };

// //     const handleWidgetClick = () => {
// //         navigate('/weather', { state: { query } });
// //     };

// //     const getCurrentDate = () => {
// //         return format(new Date(), "do MMMM yyyy, EEEE"); 
// //     };

// //     // Determine background color based on temperature
// //     const getBackgroundColor = (temp) => {
// //         if (temp <= 0) return "#00BFFF"; // Cold - Sky blue
// //         if (temp > 0 && temp <= 15) return "#ADD8E6"; // Cool - Light blue
// //         if (temp > 15 && temp <= 30) return "#FFD700"; // Warm - Gold
// //         return "#FF6347"; // Hot - Tomato color
// //     };

// //     return (
// //         <div>
// //             <form onSubmit={handleSearchSubmit} className="search-form">
// //                 <input
// //                     type="text"
// //                     placeholder="Search city"
// //                     value={searchCity}
// //                     onChange={(e) => setSearchCity(e.target.value)}
// //                     className="search-input"
// //                 />
// //                 <button type="submit" className="search-button">Search</button>
// //             </form>
            
// //             <div
// //                 className={`weather-widget ${weather?.condition}`}
// //                 onClick={handleWidgetClick}
// //                 style={{ backgroundColor: weather ? getBackgroundColor(weather.temp) : '#87CEFA' }}
// //             >
// //                 {loading ? (
// //                     <p>Loading...</p>
// //                 ) : (
// //                     weather && (
// //                         <div className="widget-content">
// //                             <div className="location-date">
// //                                 <p className="location">
// //                                     {`${weather.name}, ${weather.country}`}
// //                                 </p>
// //                                 <p className="date">{getCurrentDate()}</p>
// //                             </div>
// //                             <div className="temp-icon">
// //                                 <p className="temperature">{`+${Math.round(weather.temp)}°`}</p>
// //                                 <img src={weather.icon} alt="weather-icon" className="weather-icon" />
// //                             </div>
// //                             <div className="hourly-forecast">
// //                                 {weather.hourlyForecast ? (
// //                                     weather.hourlyForecast.map((hour, index) => (
// //                                         <div key={index} className="hour">
// //                                             <p>{hour.title}</p>
// //                                             <img src={hour.icon} alt="hourly-icon" />
// //                                             <p>{`${Math.round(hour.temp)}°`}</p>
// //                                         </div>
// //                                     ))
// //                                 ) : (
// //                                     <p>No hourly forecast data available</p>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     )
// //                 )}
// //                 {/* <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" /> */}
// //             </div>
// //         </div>
// //     );
// // }

// // export default WeatherWidget;