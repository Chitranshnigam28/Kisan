require('dotenv').config({ path: './../../.env' });
const express = require('express');
const OpenAI = require('openai');
const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.get('/recommend-crop', async (req, res) => {
    console.log('Request received:', req.query);
    const { location } = req.query;
    console.log('Location:', location);
    console.log('Is location falsy?', !location);

    if (!location || !location.trim()) {
        console.log('No location provided');
        return res.status(400).json({ message: "Location is required!" });
    }

    try {
        const prompt = `Based on the state "${location}" in India, provide the top 5 crops with their approximate growth suitability percentages as a JSON array. Ensure the percentages add up close to 100%, allowing for slight variability between 3-5%. The response should ONLY contain a JSON array. Example format:
        [
            { "crop_name": "Wheat", "percentage": 40 },
            { "crop_name": "Rice", "percentage": 30 },
            { "crop_name": "Cotton", "percentage": 15 },
            { "crop_name": "Sugarcane", "percentage": 10 },
            { "crop_name": "Jowar", "percentage": 5 }
        ]
        Note: Slight variation in percentages is expected due to factors like seasonal changes, soil type, and crop demand.`;
        
        
        
        
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt },
            ],
        });

        if (!completion.choices || completion.choices.length === 0) {
            console.error('OpenAI API response did not contain choices.');
            return res.status(500).json({ error: 'Failed to retrieve crop recommendation.' });
        }

        try {
            const recommendedCrop = completion.choices[0].message.content.trim();
            console.log('Recommended Crop:', recommendedCrop);

            const cropData = JSON.parse(recommendedCrop);
            console.log('Parsed Crop Data:', cropData);

            res.json({ crops: cropData });
        } catch (error) {
            console.error('Error parsing crop recommendation:', error.message);
            res.status(500).json({ error: 'Failed to parse crop recommendation.' });
        }

    } catch (error) {
        console.error('Error generating crop recommendation:', error);
        res.status(500).json({ error: 'Failed to generate crop recommendation.' });
    }
});

module.exports = router;




// router.get('/recommend-crop/:location', async (req, res) => {
//   const location = req.params.location;

//   try {
//     // Use a separate filter only for location (no ObjectId in this query)
//     let recommendation = await CropRecommendation.findOne({ location });

//     if (!recommendation) {
//       // Generate recommendation if not found
//       const prompt = `Based on the state "${location}" in India, provide the top 5 crops with their growth suitability percentage. Structure the response as follows:
//       [
//         { "crop_name": "Wheat", "percentage": 40 },
//         { "crop_name": "Rice", "percentage": 25.03 },
//         { "crop_name": "Maize", "percentage": 15.5 },
//         { "crop_name": "Barley", "percentage": 10.2 },
//         { "crop_name": "Sorghum", "percentage": 9.27 }
//       ]
//       Ensure the response is a JSON array only, without extra text or explanation.`;

//       const response = await openai.chat.completions.create({
//         model: 'gpt-4',
//         messages: [
//           { role: 'system', content: 'You are a helpful assistant.' },
//           { role: 'user', content: prompt },
//         ],
//       });

//       const cropData = JSON.parse(response.choices[0]?.message.content.trim());
//       recommendation = await CropRecommendation.create({ location, crops: cropData });
//     }

//     res.json(recommendation.crops);
//   } catch (error) {
//     console.error('Error generating crop recommendation:', error);
//     res.status(500).json({ error: 'Failed to generate crop recommendation' });
//   }
// });


// module.exports = router;
