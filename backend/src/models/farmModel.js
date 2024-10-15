const mongoose = require("mongoose");

const farmSchema = mongoose.Schema({
    farmName: { type: String, required: true },
    cropType: { type: String, enum: [
        'Cereal Crops', 'Cash Crops', 'Vegetable & Fruits', 'Beverages', 'Oil Seeds'
    ], required: true },
    soilType: { type: String, enum: [
        'Clay and Loamy', 'Loamy and Well-Drained', 'Sandy and Well-Drained', 'Well-drained Sandy Loam', 'Well-Drained and Rich in Organic Matter', 'Well-drained Sandy or Loamy Soil', 'Well-drained, Fertile Soil'
    ], required: true },
    location: { 
        type: String, 
        enum: [
            'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 'Puducherry', 'Jammu and Kashmir', 'Ladakh'
        ],
        required: true 
    }, 
    farmingMethod: { 
        type: String, 
        enum: ['organic', 'conventional', 'hydroponics', 'aquaponics', 'permaculture', 'no-till', 'agroforestry'],
        required: true 
    },
    waterSource: { 
        type: String, 
        enum: ['well', 'river', 'lake', 'rainwater', 'municipal', 'borewell', 'drip', 'canal'],
        required: true
    },
    last_crop_sowed: { type: String, required: true },
    soilQuality: { type: String, enum: ['low', 'moderate', 'high'], required: true },
    currentSeason: { type: String, enum: ['spring', 'autumn', 'summer', 'winter'], required: true },
    dateOfPlanting: { type: Date, required: true },
    farmImage: { type: String, required: false }, 
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
})

const Farm = mongoose.model('Farm', farmSchema, 'farms');

module.exports = Farm;
