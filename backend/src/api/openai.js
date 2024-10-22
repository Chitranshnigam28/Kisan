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

        const { farmName, cropType, location, soilType, farmingMethod, waterSource, last_crop_sowed, soilQuality, currentSeason, dateOfPlanting } = farm;

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
            - Date of Planting: ${dateOfPlanting}

        Based on the farm details and considering the soil type, season, and previous crop, please recommend the best crop to grow next. Provide the data in the following JSON array format:

        At index 0: The recommended crop in one word.
        At index 1: The current price of the crop in the market per Kg (numerical value in INR).
        At index 2: The harvest period of the crop (monthly range or suitable format).
        At index 3: The price of the crop seed per Kg(numerical value in INR).
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
        return {
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

// Connect to the database and fetch farm data (optional for initial testing)
const main = async () => {
    try {
        await connectDB();
        const ownerId = '67108f8d06fdf532952b1baa';
        await fetchFarmAndRecommendCrop(ownerId);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Uncomment for initial testing
// main();

module.exports = {
    fetchFarmAndRecommendCrop,
    connectDB,
};