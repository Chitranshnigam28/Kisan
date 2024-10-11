const CropPrice = require('../models/CropPrice');

const cropPriceData=async(req,res) => {
    const { crop } = req.query;
    console.log("crop received "+crop);
    try{
        const cropPriceData = await CropPrice.find({ name: crop });
        if(!cropPriceData){
            return res.status(404).json({ message: 'Crop not found' });
        }
        console.log("cropPriceData new "+cropPriceData);
        res.json(cropPriceData);

    }
    catch(err){
        res.status(500).json({ error: 'Server error occured.' });
    }
};

module.exports={cropPriceData};