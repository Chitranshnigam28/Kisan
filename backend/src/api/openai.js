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

// Function to fetch farm data and recommend a crop
const fetchFarmAndRecommendCrop = async (ownerId) => {
    try {
        const farm = await farmSchema.findOne({ owner: ownerId });
        if (!farm) {
            return { error: 'No farm data found for this user.' };
        }

        const { farmName, soilType, waterSource } = farm;

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

At index 0: The recommended crop in one word and why should we plant it.
Ensure that only the JSON array is returned, with no additional explanations or context.`;

        console.log('Prompt sent to OpenAI:', prompt);

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt },
            ],
        });


        // Log the full response
        console.log('OpenAI API Response:', completion.choices);

        const rawContent = completion.choices[0]?.message?.content?.trim();
        if (!rawContent) {
            throw new Error('Invalid response from OpenAI API');
        }

        // Parse the string to get the JSON array
        let recommendedCropData;
        try {
            recommendedCropData = JSON.parse(rawContent);
        } catch (parseError) {
            throw new Error('Error parsing OpenAI response as JSON');
        }

        // Handle cases where field names differ from expectation
        const recommendedCrop = recommendedCropData[0];
        if (!recommendedCrop || !recommendedCrop.RecommendedCrop || !recommendedCrop.Reason) {
            throw new Error('Recommended crop data is missing or incomplete');
        }

        // Construct the recommendation sentence using the correct field names
        const recommendationSentence = `The recommended crop is ${recommendedCrop.RecommendedCrop} because ${recommendedCrop.Reason.toLowerCase()}.`;

        return {
            farmName,
            soilType,
            waterSource,
            recommendedCrop: recommendationSentence, // Return a sentence instead of array
        };
    } catch (error) {
        console.error('Error generating crop recommendation:', error);
        return { error: error.message || 'Error generating crop recommendation' };
    }
};

// Export the function
module.exports = {
    fetchFarmAndRecommendCrop,
    connectDB,
};
