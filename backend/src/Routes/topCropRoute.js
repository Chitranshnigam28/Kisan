const express = require('express');
const router=express.Router();
const getTopCrop=require('../Controllers/topCropController');


router.get('/top-crops',getTopCrop);

module.exports=router;