const { DateTime } = require('luxon');

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    
    // Handle city or geolocation (lat/lon) parameters
    if (searchParams.q) {
        url.search = new URLSearchParams({ q: searchParams.q, units: searchParams.units, appid: API_KEY });
    } else if (searchParams.lat && searchParams.lon) {
        url.search = new URLSearchParams({ lat: searchParams.lat, lon: searchParams.lon, units: searchParams.units, appid: API_KEY });
    } else {
        throw new Error('Invalid search parameters: Either city (q) or lat/lon must be provided.');
    }
    
    console.log("Requesting weather data from:", url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};

const formatToLocalTime = (secs, timezoneOffset, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => {
    return DateTime.fromSeconds(secs + timezoneOffset, { zone: "utc" }).toFormat(format);
};

const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatCurrent = (data) => {
    if (!data || !data.main || !data.weather || !data.sys || !data.wind) {
        console.error('Invalid data structure:', data);
        return {}; // Return an empty object if data is invalid
    }

    const {
        coord: { lat, lon }, // Fixed lat/lon destructuring
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
        timezone,
    } = data;

    const { main: details, icon } = weather[0];
    const formattedLocalTime = formatToLocalTime(dt, timezone);

    return {
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        speed,
        details,
        icon: iconUrlFromCode(icon),
        formattedLocalTime,
        dt,
        timezone,
        lat,
        lon
    };
};

const formatForecastWeather = (secs, offset, data) => {
    console.log("data", JSON.stringify(data, null, 2)); 

    const hourly = data
        .filter((f) => f.dt > secs)
        .slice(0, 5)
        .map((f) => ({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, "hh:mm a"),
            icon: iconUrlFromCode(f.weather[0].icon),
            date: f.dt_txt,
        }));

    const daily = data
        .filter((f) => f.dt_txt.slice(-8) === "00:00:00") // Fixed the string slicing issue for daily filtering
        .map((f) => ({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, "ccc"),
            icon: iconUrlFromCode(f.weather[0].icon),
            date: f.dt_txt
        }));

    return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {
    // Fetch current weather data
    const currentWeatherData = await getWeatherData('weather', searchParams);
    console.log("currentWeatherData", JSON.stringify(currentWeatherData));

    if (!currentWeatherData) {
        return {}; // Return empty if API call fails
    }

    const { dt, coord: { lat, lon }, timezone } = currentWeatherData; // Ensure coord is properly destructured
    
    // Fetch forecast weather data using lat/lon from current weather
    const forecastData = await getWeatherData('forecast', {
        lat,
        lon,
        units: searchParams.units, // Pass units to forecast API call
    });

    if (!forecastData || !forecastData.list) {
        console.error('Invalid forecast data structure:', forecastData);
        return {}; // Return empty if forecast API call fails
    }

    const formattedForecastWeather = formatForecastWeather(dt, timezone, forecastData.list);

    // Return combined current and forecast weather data
    return { ...formatCurrent(currentWeatherData), ...formattedForecastWeather };
};

module.exports = { getFormattedWeatherData };


// const { DateTime } =require('luxon');

// const API_KEY = process.env.WEATHER_API_KEY;
// const BASE_URL = "https://api.openweathermap.org/data/2.5/";

// const getWeatherData = async (infoType, searchParams) => {
//     const url = new URL(BASE_URL + infoType);
//     url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
//     console.log("From weatherservice "+url);
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Failed to fetch weather data');
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//         return null;
//     }
// };

// const formatToLocalTime = (secs, timezoneOffset, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => {
//     return DateTime.fromSeconds(secs + timezoneOffset, { zone: "utc" }).toFormat(format);
// };

// const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

// const formatCurrent = (data) => {
//     if (!data || !data.main || !data.weather || !data.sys || !data.wind) {
//         console.error('Invalid data structure:', data);
//         return {}; // Return an empty object if data is invalid
//     }

//     const {
//         coord: { lat, lon }, // Fixed lat/lon destructuring
//         main: { temp, feels_like, temp_min, temp_max, humidity },
//         name,
//         dt,
//         sys: { country, sunrise, sunset },
//         weather,
//         wind: { speed },
//         timezone,
//     } = data;

//     const { main: details, icon } = weather[0];
//     const formattedLocalTime = formatToLocalTime(dt, timezone);

//     return {
//         temp,
//         feels_like,
//         temp_min,
//         temp_max,
//         humidity,
//         name,
//         country,
//         sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
//         sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
//         speed,
//         details,
//         icon: iconUrlFromCode(icon),
//         formattedLocalTime,
//         dt,
//         timezone,
//         lat,
//         lon
//     };
// };

// const formatForecastWeather = (secs, offset, data) => {
//     // Ensure proper slicing and filtering for hourly and daily forecasts

//     console.log("data", JSON.stringify(data, null, 2)); 

//     const hourly = data
//         .filter((f) => f.dt > secs)
//         .slice(0, 5)
//         .map((f) => ({
//             temp: f.main.temp,
//             title: formatToLocalTime(f.dt, offset, "hh:mm a"),
//             icon: iconUrlFromCode(f.weather[0].icon),
//             date: f.dt_txt,
//         }));

//     const daily = data
//         .filter((f) => f.dt_txt.slice(-8) === "00:00:00") // Fixed the string slicing issue for daily filtering
//         .map((f) => ({
//             temp: f.main.temp,
//             title: formatToLocalTime(f.dt, offset, "ccc"),
//             icon: iconUrlFromCode(f.weather[0].icon),
//             date: f.dt_txt
//         }));

//     return { hourly, daily };
// };

// const getFormattedWeatherData = async (searchParams) => {
//     const currentWeatherData = await getWeatherData('weather', searchParams);
//     console.log("currentWeatherData"+JSON.stringify(currentWeatherData));
//     if (!currentWeatherData) {
//       return {}; // Return empty if API call fails
//     }
  
//     const { dt, coord: { lat, lon }, timezone } = currentWeatherData; // Ensure coord is properly destructured
//     const formattedForecastWeather = await getWeatherData("forecast", {
//       lat,
//       lon,
//       units: searchParams.units, // Ensure units are passed correctly
//     }).then((d) => formatForecastWeather(dt, timezone, d.list));
  
//     return { ...formatCurrent(currentWeatherData), ...formattedForecastWeather };
//   };
  
// module.exports= {getFormattedWeatherData};
