const express=require('express');
const router=express.Router();
const profileController = require('../Controllers/profileSetupController');
router.post('/farmer/profile', profileController);

module.exports = router;