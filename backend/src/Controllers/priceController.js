const CropPrice = require('../models/CropPrice');

const cropPriceData=async(req,res) => {
    const { crop } = req.query;
    try{
        const cropPriceData = await CropPrice.find({ name: crop });
        if(!cropPriceData){
            return res.status(404).json({ message: 'Crop not found' });
        }
        res.json(cropPriceData);
    }
    catch(err){
        res.status(500).json({ error: 'Server error occured.' });
    }
};

module.exports={cropPriceData};