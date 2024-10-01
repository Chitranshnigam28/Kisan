const marketPriceSchema = new mongoose.Schema({
    "market_price": {
        "min_price": { type: Number, required: true },
        "max_price": { type: Number, required: true },
        "currency": { type: String, default: "INR" },
        "historical_prices": [
            {
                "year": { type: Number },
                "price": { type: Number }
            }

        ]
    },
})