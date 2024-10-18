const mongoose = require('mongoose');

const funFactSchema = mongoose.Schema({
    crop_name: { type: String },
    funFact : {
        general : String,
        environmentalImpact : String
    },
    scientificName:  String
})

const FunFact = mongoose.model("FunFact",funFactSchema,'fun_facts')

module.exports = FunFact;