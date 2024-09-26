const mongoose = require('mongoose');
//this will be used for graphs only
const TopCropSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    location : {
        state : {
            type : String,
            required: true
        }
    },
    yield : {
        min : {
            type : Number,
            required : true
        },
        max : {
            type : Number,
            required : true
        },
        unit : {
            type : String,
            default : 'kg/ha'
        }
    },
    market_price : {
        min_price : {
            type : Number,
            required : true
        },
        max_price : {
            type : Number,
            required : true
        },
        currency : {
            type : String,
            default : 'INR'
        },
        historical_prices : [
            {
                year: {
                    type : Number,
                    required : true
                },
                price : {
                    type : Number,
                    required : true
                }
            }
        ]
    },
    estimated_revenue : {
        type : Number,
        required : true
    }
});

module.exports = mongoose.model('TopCrop' , TopCropSchema, 'crops');