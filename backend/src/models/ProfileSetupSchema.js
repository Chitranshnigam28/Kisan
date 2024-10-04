const mongoose = require('mongoose');

// Farmer profile schema for storing farmer details
const FarmerProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    profilePicture: {
        type: String, // URL or path to the uploaded image
       //  required: false, // Not mandatory, since a farmer might not upload a picture
    },
    age: {
        type: Number,
        // required: true,
        min: 0,
    },
    soilType: {
        type: String,
        // required: true,
    },
    state: {
        type: String,
         // required: true,
    },
    landSize: {
        type: Number,
       // required: true,
        min: 0, // Land size must be positive
    },
    lastCrop: {
        type: String,
        // required: true,
    },
    season: {
        type: String,
        enum: ['Summer', 'Monsoon', 'Winter'], // Dropdown values from the frontend
        // required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the created date
    },
});

const FarmerProfile = mongoose.model('FarmerProfile', FarmerProfileSchema, 'farmer_profiles');

module.exports = FarmerProfile; 
