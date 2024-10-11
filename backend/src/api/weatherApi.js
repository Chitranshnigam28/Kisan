require('dotenv').config();
const axios =require('axios');
const express=require('express');
const app=express();
const cors=require('cors');
const api_key = process.env.WEATHER_API_KEY;

console.log("api_key"+api_key);
app.use(express.json());
app.use(cors());
async function getWeather(lat, lon) {
    try {
        const url = `https://api.weatherbit.io/v2.0/normals?lat=${lat}&lon=${lon}&start_day=02-02&end_day=03-01&tp=daily&key=8350ea53bc69499abf34ff188d54e5d2`;

        const response = await axios.get(url);
        const weatherData = response.data;

        console.log(weatherData);
        return weatherData;
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
    
}


fetchWeather();

app.post('/weather',async (req,res)=>{
    const {lat,lon}=req.body;
    try {
        // const { lat, lon } = await getUserLocation();
      const weather=  await getWeather(lat, lon);
      res.json(weather);
    } catch (error) {
        console.error("Error getting user location:", error);
    }
});

app.listen(5005,()=>{
    console.log("server is running at port 5005");
})