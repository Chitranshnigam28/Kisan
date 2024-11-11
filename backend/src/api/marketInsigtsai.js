require('dotenv').config({ path: './../../.env' });
const express = require('express');
const OpenAI = require('openai');
const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.get('/get-market-insights', async (req, res) => {
    console.log('Request received');

    try {
        const prompt = `Based on random states in India, provide only the top 4 crops chosen from the following list: 'Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Barley', 'Millet', 'Tobacco', 'Cabbage', 'Onion', 'Garlic', 'Cauliflower', 'Spinach', 'Tomato', 'Pumpkin', 'Eggplant', 'Bitter Gourd', 'Tea', 'Coffee', 'Jowar', 'Bajra', 'Potato', 'Peas', 'Ragi', 'Soybean', 'Sesame', 'Groundnut'. For each crop, provide:
        - "crop_name": name of the crop
        - "state": name of the state where it is commonly grown
        - "percentage": growth suitability percentage
        - "price_trend": either "+X.XX%" or "-X.XX%" showing the price change
        - "current_price": current price per kilogram in INR

        Ensure the percentages add up close to 100% with slight variability (3-5%).

        Structure the response as follows:
        [
            { "crop_name": "Wheat", "state": "Punjab", "percentage": 40, "price_trend": "+3.98%", "current_price": "₹50 / kg" },
            { "crop_name": "Rice", "state": "West Bengal", "percentage": 30, "price_trend": "-1.50%", "current_price": "₹45 / kg" },
            { "crop_name": "Cotton", "state": "Maharashtra", "percentage": 15, "price_trend": "+2.30%", "current_price": "₹60 / kg" },
            { "crop_name": "Sugarcane", "state": "Uttar Pradesh", "percentage": 10, "price_trend": "-3.20%", "current_price": "₹35 / kg" },
            { "crop_name": "Maize", "state": "Karnataka", "percentage": 5, "price_trend": "+1.15%", "current_price": "₹40 / kg" }
        ]

        Note: Prices can be estimated and need not reflect actual market rates.`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt },
            ],
        });

        if (!completion.choices || completion.choices.length === 0) {
            console.error('OpenAI API response did not contain choices.');
            return res.status(500).json({ error: 'Failed to retrieve market insights.' });
        }

        try {
            const marketInsights = completion.choices[0].message.content.trim();
            console.log('Market Insights:', marketInsights);

            const insightsData = JSON.parse(marketInsights);
            console.log('Parsed Market Insights:', insightsData);

            res.json({ crops: insightsData });
        } catch (error) {
            console.error('Error parsing market insights:', error.message);
            res.status(500).json({ error: 'Failed to parse market insights.' });
        }

    } catch (error) {
        console.error('Error generating market insights:', error);
        res.status(500).json({ error: 'Failed to generate market insights.' });
    }
});

module.exports = router;
