const mongoose = require("mongoose");

const farmSchema = mongoose.Schema({
    farmName: { type: String, required: true },
    cropType: { 
        type: String, 
        enum: [
             'Vegetable', 'Fruit', 'Grain', 'Flower'
        ], 
        required: true 
    },
    cropName: { 
        type: String, 
        enum: [
            'Rice', 'Wheat', 'Corn', 'Tomato'
        ], 
        required: true
    },
    soilType: { 
        type: String, 
        enum: [
            'Clay', 'Loamy', 'Silt', 'Sandy' 
        ], 
        required: true 
    },
    location: { 
        type: String, 
        enum: [
            'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
            'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
            'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 
            'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 
            'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 
            'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 
            'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 
            'Puducherry', 'Jammu and Kashmir', 'Ladakh'
        ], 
        required: true 
    }, 
    farmingMethod: { 
        type: String, 
        enum: ['Organic', 'Conventional', 'Permaculture', 'Agroforestry'], 
        required: true 
    },
    waterSource: { 
        type: String, 
        enum: ['Well', 'River', 'Lake', 'Rainwater', 'Municipal Supply', 
                'Borewell', 'Drip', 'Canal', 'Irrigation'], 
        required: true
    },
    last_crop_sowed: { type: String, required: true },
    soilQuality: { 
        type: String, 
        enum: ['Low', 'Moderate', 'High'], 
        required: true 
    },
    currentSeason: { 
        type: String, 
        enum: ['Spring', 'Autumn', 'Summer', 'Winter'], 
        required: true 
    },
    sizeOfFarm: { type: Number, required: true },
    farmImage: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' }, 
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
});

const Farm = mongoose.model('Farm', farmSchema, 'farms');

module.exports = Farm;