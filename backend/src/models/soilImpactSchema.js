const soilImpactSchema = new mongoose.Schema({
    nitrogen_depletion: { type: String },
    water_usage: { type: String },
    recommended_next_crop: [{ type: String }],
    crop_rotation_benefits: {
      nitrogen_fixation: { type: String },
      weed_control: { type: String }
    }
  });
  