require('dotenv').config({ path: './../../.env' });
const mongoose = require('mongoose');
const OpenAI = require('openai');
const farmSchema = require('./models/farmModel');

// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Function to fetch farm data and recommend a crop
const fetchFarmAndRecommendCrop = async (ownerId) => {
    try {
        const farm = await farmSchema.findOne({ owner: ownerId });
        if (!farm) {
            return { error: 'No farm data found for this user.' };
        }

        const { soilType, state, last_crop_sowed, currentSeason, soilQuality } = farm;

        const prompt = `
            Based on the following farm details:
            - State: ${state}
            - Soil Type: ${soilType}
            - Last Crop Sowed: ${last_crop_sowed}
            - Current Season: ${currentSeason}
            - Soil Quality: ${soilQuality}

            What should be the best crop to grow next. Answer in one word?
        `;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt },
            ],
        });

        const recommendedCrop = completion.choices[0]?.message.content.trim();

        return {
            farmName: farm.farmName,
            soilType: farm.soilType,
            waterSource: farm.waterSource,
            recommendedCrop,
        };
    } catch (error) {
        console.error('Error generating crop recommendation:', error);
        return { error: 'Error generating crop recommendation' };
    }
};

// Add this route to your existing Express app
module.exports = (app) => {
    app.get('/api/recommend-crop/:ownerId', async (req, res) => {
        const { ownerId } = req.params;
        const result = await fetchFarmAndRecommendCrop(ownerId);
        
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.json(result);
    });
};

