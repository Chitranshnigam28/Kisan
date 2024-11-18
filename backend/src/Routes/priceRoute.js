const express = require('express');
const router=express.Router();
const {cropPriceData}=require('/Controllers/priceController');

router.get('/crops/price',cropPriceData);

module.exports=router;