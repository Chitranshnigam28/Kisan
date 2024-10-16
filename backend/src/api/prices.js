require('dotenv').config({ path: '../../.env' });
const express = require('express');
const { connect } = require('mongoose');
const connectDB = require('../utils/db');
const CropPrice = require('../models/CropPrice');
const cors = require('cors');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());


app.get('/api/crops/price', async(req,res) => {
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
});

//starting the server
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})