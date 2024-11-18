const express = require('express');
const router=express.Router();
const { fetchWeather }=require('../Controllers/weatherController');

router.get('/weather',fetchWeather);


module.exports=router;