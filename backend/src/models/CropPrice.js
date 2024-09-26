const mongoose = require('mongoose');
//this will be used for graphs only and it is on the mongodb database
const CropPriceSchema = new mongoose.Schema({
    crop_id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true, 
    },
    market_price: {
        min_price: {
            type: Number,
            required: true,
        },
        max_price: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        historical_prices: [
            {
                year: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
});

module.exports = mongoose.model('CropPrice', CropPriceSchema, 'crops');