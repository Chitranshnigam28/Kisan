const express = require('express');
const router = express.Router();
const Tips = require('../models/tipsSchema'); 
// const Crop = require('../models/Crop'); 
// const {getCropRecommendation} = require('../api/cropRecommendation'); 


router.get("/tips", async (req, res) => {
    try {
        // Fetch all tips from the database
        const allTips = await Tips.find(); // This will return an array of all tips
        res.json(allTips); // Send the array of tips as the response
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tips" });
    }
});

module.exports = router;
