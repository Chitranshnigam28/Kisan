const { getFormattedWeatherData } = require('../services/weatherService');

const fetchWeather = async (req, res) => {
    const query = req.query.q || "vancouver"; // Default city
    const units = req.query.units || "metric"; // Default to metric units
    // console.log("query from weather controller "+query);
    try {
        const data = await getFormattedWeatherData({ q: query, units });

        if (!data || Object.keys(data).length === 0) {
            return res.status(404).json({ error: "Weather data not found or incomplete" });
        }

        // console.log("Weather data from controller:", data);
        res.status(200).json(data); // Success response with data

    } catch (error) {
        // console.error('Error in fetchWeather:', error);
        res.status(500).json({ error: "Unable to fetch weather data" });
    }
};

module.exports = { fetchWeather };


// const { getFormattedWeatherData } = require('../services/weatherService');

// const fetchWeather = async (req, res) => {
//     const query = req.query.q || "vancouver";
//     const units = req.query.units || "metric";

//     try {
//         const data = await getFormattedWeatherData({ q: query, units });
//         console.log("from weatherController "+data);
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ error: "Unable to fetch weather data" });
//     }
// };

// module.exports = { fetchWeather };