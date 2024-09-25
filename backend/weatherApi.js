import axios from 'axios';

const api_key = "6c5fd12840c747eb98e09371bafc8704"; 
const lat = 33.44; 
const lon = -94.04; 

async function getWeather() {
  try {
    const url = `https://api.weatherbit.io/v2.0/normals?lat=35.5&lon=-75.5&start_day=02-02&end_day=03-01&tp=daily&key=${api_key}`;

    const response = await axios.get(url);
    const weatherData = response.data;

    console.log(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error.response?.data || error.message);
  }
}

getWeather();