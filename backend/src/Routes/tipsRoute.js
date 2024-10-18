const express = require('express');
const router = express.Router();
const Tips = require('../models/tipsSchema'); 
const Crop = require('../models/Crop'); 
const {getCropRecommendation} = require('../api/cropRecommendation'); 


router.post('/recommended', async (req, res) => {
    try {
        const { state, temperature, humidity, rainfall, soilType, previousCrop } = req.body;

        // Fetch the recommended crop logic here
        const recommendedCrop = await getCropRecommendation(state, temperature, humidity, rainfall, soilType, previousCrop);

        // Fetch the tips related to the recommended crop
        const cropTips = await Tips.findOne({ crop_name: recommendedCrop.name });

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
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch the crop recommendation and tips.' });
    }
});

module.exports = router;
