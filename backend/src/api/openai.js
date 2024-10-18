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
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

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

// Function to fetch farm data and recommend a crop
const fetchFarmAndRecommendCrop = async (ownerId) => {
    console.log(ownerId, ">>>>>>>>");
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

        Considering all these factors, what should be the best crop to grow next? Answer in one word. Also provide these details relating to the recommended crop:. please answer in one word`;

        console.log('Prompt sent to OpenAI:', prompt);

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt },
            ],
        });

        const recommendedCrop = completion.choices[0]?.message.content.trim();

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
        const ownerId = '66f92acd44f00ac86e5adac1';
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