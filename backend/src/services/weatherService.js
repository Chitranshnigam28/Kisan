const { DateTime } = require('luxon');

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);

    if (searchParams.q) {
        url.search = new URLSearchParams({ q: searchParams.q, units: searchParams.units, appid: API_KEY });
    } else if (searchParams.lat && searchParams.lon) {
        url.search = new URLSearchParams({ lat: searchParams.lat, lon: searchParams.lon, units: searchParams.units, appid: API_KEY });
    } else {
        throw new Error('Invalid search parameters: Either city (q) or lat/lon must be provided.');
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return await response.json();
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
        return {};
    }

    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        visibility,
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
        visibility: visibility / 1000, // Convert meters to kilometers
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
        .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
        .map((f) => ({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, "ccc"),
            icon: iconUrlFromCode(f.weather[0].icon),
            date: f.dt_txt
        }));

    return { hourly, daily };
};

const getAirQuality = async (lat, lon) => {
    const url = `${BASE_URL}air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch air quality data');
        }
        const data = await response.json();
        return data.list[0].main.aqi; // AQI level
    } catch (error) {
        console.error('Error fetching AQI data:', error);
        return null;
    }
};

const getUVIndex = async (lat, lon) => {
    const url = `${BASE_URL}uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch UV index data');
        }
        const data = await response.json();
        return data.value; // UV index level
    } catch (error) {
        console.error('Error fetching UV index data:', error);
        return null;
    }
};


const getFormattedWeatherData = async (searchParams) => {
    const currentWeatherData = await getWeatherData('weather', searchParams);
    if (!currentWeatherData) {
        return {};
    }

    const { dt, coord: { lat, lon }, timezone } = currentWeatherData;

    // Fetch forecast weather data
    const forecastData = await getWeatherData('forecast', {
        lat,
        lon,
        units: searchParams.units,
    });

    if (!forecastData || !forecastData.list) {
        return {};
    }

    // Fetch AQI data
    const aqi = await getAirQuality(lat, lon);
    const uvi = await getUVIndex(lat, lon);

    const formattedForecastWeather = formatForecastWeather(dt, timezone, forecastData.list);

    // Return combined weather, forecast, and AQI data
    return {
        ...formatCurrent(currentWeatherData),
        ...formattedForecastWeather,
        aqi,
        uvi
    };
};

module.exports = { getFormattedWeatherData };
