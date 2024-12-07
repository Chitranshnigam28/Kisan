require('dotenv').config({ path: './../../.env' });
const mongoose = require('mongoose');
const OpenAI = require('openai');
const farmSchema = require('../models/farmModel');

// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// MongoDB connection URI
const MONGO_URI = process.env.MONGODB_URI;
console.log('MONGO_URI:', MONGO_URI);


// Function to connect to MongoDB
const connectDB = async () => {
    try {
        

        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
};


const fetchFarmAndRecommendCrop = async (ownerId) => {
    try {
        const farm = await farmSchema.findOne({ owner: ownerId });
        if (!farm) {
            return { error: 'No farm data found for this user.' };
        }

        const { farmName, cropType, location, soilType, farmingMethod, waterSource, last_crop_sowed, soilQuality, currentSeason } = farm;

        console.log('Farm data fetched successfully:', farm);

        const prompt = `
        Based on the following farm details:
            - Farm Name: ${farmName}
            - Crop Type: ${cropType}
            - Location: ${location}
            - Soil Type: ${soilType}
            - Farming Method: ${farmingMethod}
            - Water Source: ${waterSource}
            - Last Crop Sowed: ${last_crop_sowed}
            - Soil Quality: ${soilQuality}
            - Current Season: ${currentSeason}

            Based on the farm details and considering the soil type, season, and previous crop, please recommend the best crop to grow next. (Only recommend crops from the following crops: Rice, Wheat, Maize, Barley, Millet, Jowar, Bajra, Ragi, Soybean, Cotton, Sugarcane, Tobacco, Cabbage, Onion, Garlic, Cauliflower, Spinach, Tomato, Pumpkin, Eggplant, Bitter Gourd, Potato, Peas,Tea, Coffee, Groundnut). Provide the data in the following JSON array format:

        At index 0: The recommended crop in one word.
        At index 1: The current price of the crop in the market Per kg (numerical value in INR).
        At index 2: The harvest period of the crop (monthly range or suitable format).
        At index 3: The price of the crop seed Per kg(numerical value in INR).
        Ensure that only the JSON array is returned, with no additional explanations or context.`;

        console.log('Prompt sent to OpenAI:', prompt);

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt },
            ],
        });

        const recommendedCrop = completion.choices[0]?.message.content.trim();
        console.log(recommendedCrop)
        console.log(recommendedCrop)
        return {
            farmName,
            soilType,
            waterSource,
            farmName,
            soilType,
            waterSource,
            recommendedCrop,
        };
    } catch (error) {
        console.error('Error generating crop recommendation:', error);
        return { error: 'Error generating crop recommendation' };
    }
};

module.exports = {
    fetchFarmAndRecommendCrop,
    connectDB,
};