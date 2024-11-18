const express = require('express');
const router = express.Router();
const FarmerProfile = require('../models/FarmerProfile'); // Import your schema

// Route to handle profile setup
router.post('/profile', async (req, res) => {
    try {
        const farmerProfile = new FarmerProfile(req.body);
        await farmerProfile.save();
        res.status(201).json({ message: 'Profile created successfully', farmerProfile });
    } catch (error) {
        console.error('Error saving profile:', error); // Log the error
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
