const cropSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ideal_conditions: {
      temperature_range: { type: String },
      humidity: { type: String },
      soil_type: { type: String },
      rainfall: { type: String }
    },
    climate_location: {
      states: [{ type: String }],
      suitable_climate: { type: String }
    },
    growth_time: { type: String },
    yield: {
      min: { type: Number },
      max: { type: Number },
      unit: { type: String }
    },
    market_price: {
      min_price: { type: Number },
      max_price: { type: Number },
      currency: { type: String },
      historical_prices: [{
        year: { type: Number },
        price: { type: Number }
      }]
    },
    soil_quality: {
      pH: { type: String },
      nutrient_content: {
        nitrogen: { type: String },
        phosphorus: { type: String },
        potassium: { type: String }
      }
    },
    soil_impact: {
      nitrogen_depletion: { type: String },
      water_usage: { type: String },
      recommended_next_crop: [{ type: String }],
      crop_rotation_benefits: {
        nitrogen_fixation: { type: String },
        weed_control: { type: String }
      }
    }
  });
  