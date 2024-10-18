// app.js
const express = require('express');
const connectDB = require('../utils/db');
const Crop = require('../models/Crop');
const Tips = require('../models/tipsSchema')
const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

// Test route to fetch data and check if it's coming from the crops collection
app.get('/getCrops', async (req, res) => {
  try {
    const crops = await Crop.find(); // This should fetch all crops
    res.json(crops); // Return crops in the response to verify it's working
  } catch (err) {
    console.error('Error fetching crops:', err.message);
    res.status(500).json({ message: 'Failed to fetch crops' });
  }
});


// Function to get crop recommendation
async function getCropRecommendation(state, temperature, humidity, rainfall, soilType, previousCrop) {
  try {
    // Fetch crops from MongoDB
    const crops = await Crop.find();
    let recommendedCrop = null;
    let maxScore = -Infinity;

    // Helper function to calculate score for a crop
    const calculateScore = (crop) => {
      let score = 0;

      // Check ideal conditions
      const { temperature_range, humidity: idealHumidity, rainfall: idealRainfall, soil_type } = crop.ideal_conditions;
      const [tempMin, tempMax] = temperature_range.replace('°C', '').split('-').map(Number);
      const [humidityMin, humidityMax] = idealHumidity.replace('%', '').split('-').map(Number);
      const [rainfallMin, rainfallMax] = idealRainfall.replace('mm', '').split('-').map(Number);

      if (temperature >= tempMin && temperature <= tempMax) score += 1;
      if (humidity >= humidityMin && humidity <= humidityMax) score += 1;
      if (rainfall >= rainfallMin && rainfall <= rainfallMax) score += 1;
      if (soilType === soil_type) score += 1;

      // Consider soil quality
      const { pH, nutrient_content } = crop.soil_quality;
      const [soilPHMin, soilPHMax] = pH.split('-').map(Number);

      if (soilType && (soilType === crop.ideal_conditions.soil_type)) score += 1;

      // Check if soil pH and nutrient content match
      const soilPH = Number(soilType.pH); // Assuming soilType has a pH property
      if (soilPH >= soilPHMin && soilPH <= soilPHMax) score += 1;

      // Check nutrient content
      const nutrients = crop.soil_quality.nutrient_content;
      if (nutrients.nitrogen === 'high') score += 1;
      if (nutrients.phosphorus === 'high') score += 1;
      if (nutrients.potassium === 'high') score += 1;

      // Consider previous crop impact if available
      if (previousCrop) {
        const previousCropData = crops.find(crop => crop.name === previousCrop);
        if (previousCropData) {
          const { soil_impact } = previousCropData;
          const recommendedNextCrops = soil_impact.recommended_next_crop;
          if (recommendedNextCrops.includes(crop.name)) score += 2; // Increase score if crop is recommended for soil recovery
        }
      }

      return score;
    };

    // Iterate through crops and calculate scores
    for (const crop of crops) {
      const score = calculateScore(crop);

      if (score > maxScore) {
        maxScore = score;
        recommendedCrop = crop;
      }
    }

    // Return the result
    if (recommendedCrop) {
      return { recommendedCrop };
    } else {
      return { message: 'No suitable crop found based on the provided data.' };
    }
  } catch (err) {
    console.error('Error fetching data from MongoDB:', err);
    throw new Error('Database error');
  }
}

// POST route for crop recommendation
app.post('/recommendCrop', async (req, res) => {
  try {
    const { state, temperature, humidity, rainfall, soilType, previousCrop } = req.body;

    // Parse numeric values to numbers
    const temp = Number(temperature);
    const humid = Number(humidity);
    const rain = Number(rainfall);

    if (!state || !temp || !humid || !rain || !soilType) {
      return res.status(400).json({ message: 'Missing required data' });
    }

    const { recommendedCrop } = await getCropRecommendation(state, temp, humid, rain, soilType, previousCrop);

    if (recommendedCrop) {
      const cropTips = await Tips.findOne({ crop_name: recommendedCrop.name }); // Compare the name directly
      if (cropTips) {
        res.json({
          message: `Recommended crop for ${state} is ${recommendedCrop.name}`,
          crop: recommendedCrop,
          tips: cropTips.tips // Include the specific tips related to the recommended crop
        });
      } else {
        // If no specific tips for the recommended crop, fetch a random crop's tips
        const randomTips = await Tips.aggregate([{ $sample: { size: 1 } }]); // Get one random tip
        res.json({
          message: `Recommended crop for ${state} is ${recommendedCrop.name}, but no specific tips available. Here's a random tip for ${randomTips[0].crop_name}:`,
          crop: recommendedCrop,
          tips: randomTips[0].tips // Return the random crop's tips
        });
      }
    } else {
      res.status(404).json({ message: 'No crop recommendation found for the provided data.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Internal Server Error: ${err.message}` });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = getCropRecommendation;
