const express = require('express');
const router=express.Router();
const {getCrops,recommendCrop} =require('../Controllers/cropController');

//Routes for Crops
router.get('/getCrops',getCrops);
router.post('/recommendCrop',recommendCrop);

module.exports=router;