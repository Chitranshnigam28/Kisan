const mongoose = require('mongoose');

const tipsSchema = mongoose.Schema({
    crop_name: { type: String, required: true },
    tips: { type: [String], required: true },
})

const Tips = mongoose.model("Tips",tipsSchema,"tips_data")

module.exports = Tips;