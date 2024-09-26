const Crop = require('../models/TopCrop');

const getTopCrop=async(req, res) => {

    const { state } = req.query;

    if(!state){
        return res.status(400).json({ message: 'State is required!' });
    }

    try{
        const crops = await Crop.find({ "climate_location.states": state });

        if(crops.length === 0 ){
            return res.status(404).json({ message: `No crops found for state: ${state}` });
        }

        const cropsWithRevenue = crops.map(crop => {
            const averageYield = (crop.yield.min + crop.yield.max)/2;
            const averagePrice = (crop.market_price.min_price + crop.market_price.max_price)/2;
            const estimated_revenue = averagePrice * averageYield;

            return {
                crop_name : crop.name,
                estimated_revenue,
                historicalPrices : crop.market_price.historical_prices,
                currency: crop.market_price.currency
            }
        });

        const sortedCrops = cropsWithRevenue.sort((a,b) => b.estimated_revenue - a.estimated_revenue);

        //top 5 crops back in response
        res.json(sortedCrops.slice(0,5));
    }
    catch(err){
        res.status(500).json({ error: ' Server error occured.' });
    }
};

module.exports=getTopCrop;