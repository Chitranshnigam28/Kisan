const soilQualitySchema =  new mongoose.Schema({
    "pH": {type:String},
    "nutrient_content": {
        "nitrogen": {type:String},
        "phosphorus":{type:String},
        "potassium": {type:String}
    }
})