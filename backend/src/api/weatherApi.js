import axios from 'axios';
require('dotenv').config();

const api_key = process.env.WEATHER_API_KEY;

async function getWeather(lat, lon) {
    try {
        const url = `https://api.weatherbit.io/v2.0/normals?lat=${lat}&lon=${lon}&start_day=02-02&end_day=03-01&tp=daily&key=${api_key}`;

        const response = await axios.get(url);
        const weatherData = response.data;

        console.log(weatherData);
    } catch (error) {
        console.error("Error fetching weather data:", error.response?.data || error.message);
    }
}

function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ lat: latitude, lon: longitude });
                },
                (error) => {
                    reject(error.message);
                }
            );
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
}

async function fetchWeather() {
    try {
        const { lat, lon } = await getUserLocation();
        await getWeather(lat, lon);
    } catch (error) {
        console.error("Error getting user location:", error);
    }
}

fetchWeather();