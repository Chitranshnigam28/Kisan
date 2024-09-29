const notificationSchema = new mongoose.Schema({
    task_reminders: { type: String },
    weather_alerts: { type: String },
    market_updates: { type: String }
  });
  