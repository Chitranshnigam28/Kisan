const mongoose = require("mongoose");
// const { required } = require("../validators/auth-validator");

const farmSchema = mongoose.Schema({
    farmerName: { type: String, required: true },
    numberOfFarms: { type: Number, required: true },
    soilType: { type: String, enum: ['Red', 'Black', 'Brown', 'Sandy'], required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
})


const Farm = mongoose.model('Farm', farmSchema,'farms');

module.exports = Farm;