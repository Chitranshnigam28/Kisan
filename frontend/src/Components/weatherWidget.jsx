// WeatherWidget.js
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import '../css/weatherWidget.css';

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

    const handleWidgetClick = () => {
        navigate('/weather', { state: { query } });
    };

    const getCurrentDate = () => format(new Date(), "do MMMM yyyy, EEEE");

    const getBackgroundColor = (temp) => {
        if (temp <= 0) return "#00BFFF"; // Cold - Sky blue
        if (temp > 0 && temp <= 15) return "#ADD8E6"; // Cool - Light blue
        if (temp > 15 && temp <= 30) return "#FFD700"; // Warm - Gold
        return "#FF6347"; // Hot - Tomato color
    };

    return (
        <div>
            {showSearch && (
                <form onSubmit={handleSearchSubmit} className="search-form">
                    <input
                        type="text"
                        placeholder="Search city"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            )}

            <div
                className={`weather-widget ${weather?.condition}`}
                onClick={handleWidgetClick}
                style={{ backgroundColor: weather ? getBackgroundColor(weather.temp) : '#87CEFA' }}
            >
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    weather && (
                        <div className="widget-content">
                            <div className="location-date">
                                <p className="location">
                                    {`${weather.name}, ${weather.country}`}
                                </p>
                                <p className="date">{getCurrentDate()}</p>
                            </div>
                            <div className="temp-icon">
                                <p className="temperature">{`+${Math.round(weather.temp)}°`}</p>
                                <img src={weather.icon} alt="weather-icon" className="weather-icon" />
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

// function WeatherWidget() {
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

//     const getCurrentDate = () => {
//         return format(new Date(), "do MMMM yyyy, EEEE"); 
//     };

//     // Determine background color based on temperature
//     const getBackgroundColor = (temp) => {
//         if (temp <= 0) return "#00BFFF"; // Cold - Sky blue
//         if (temp > 0 && temp <= 15) return "#ADD8E6"; // Cool - Light blue
//         if (temp > 15 && temp <= 30) return "#FFD700"; // Warm - Gold
//         return "#FF6347"; // Hot - Tomato color
//     };

//     return (
//         <div>
//             <form onSubmit={handleSearchSubmit} className="search-form">
//                 <input
//                     type="text"
//                     placeholder="Search city"
//                     value={searchCity}
//                     onChange={(e) => setSearchCity(e.target.value)}
//                     className="search-input"
//                 />
//                 <button type="submit" className="search-button">Search</button>
//             </form>
            
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
//                             <div className="location-date">
//                                 <p className="location">
//                                     {`${weather.name}, ${weather.country}`}
//                                 </p>
//                                 <p className="date">{getCurrentDate()}</p>
//                             </div>
//                             <div className="temp-icon">
//                                 <p className="temperature">{`+${Math.round(weather.temp)}°`}</p>
//                                 <img src={weather.icon} alt="weather-icon" className="weather-icon" />
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