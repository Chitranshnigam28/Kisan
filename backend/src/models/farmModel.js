const mongoose = require("mongoose");
// const { required } = require("../validators/auth-validator");

const farmSchema = mongoose.Schema({
    farmerName: { type: String, required: true },
    numberOfFarms: { type: Number, required: true },
    soilType: { type: String, enum: ['Red', 'Black', 'Brown', 'Sandy'], required: true },
    state: { type: String, required: true },
    last_crop_sowed: { type: String, required: true },
    currentSeason: { type: String, enum: ['spring', 'autumn', 'summer', 'winter'], required: true },
    soilQuality: { type: String, enum: ['low', 'moderate', 'high'], required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
})


const Farm = mongoose.model('Farm', farmSchema, 'farms');

module.exports = Farm;
