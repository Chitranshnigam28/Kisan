// models/Crop.js
const mongoose = require('mongoose');
//this is for recommendation to suggest crops.
// Define a Crop schema that matches your crops collection structure
const cropSchema = new mongoose.Schema({
  name: String,
  ideal_conditions: {
    temperature_range: String,
    humidity: String,
    rainfall: String,
    soil_type: String,
  },
  soil_quality: {
    pH: String,
    nutrient_content: {
      nitrogen: String,
      phosphorus: String,
      potassium: String,
    },
  },
  soil_impact: {
    recommended_next_crop: [String],
  },
});

// Export the Crop model that points to the 'crops' collection
module.exports = mongoose.model('Crop', cropSchema, 'crops');