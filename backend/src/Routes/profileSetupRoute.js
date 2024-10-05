const express=require('express');
const router=express.Router();
const profileController = require('../Controllers/profileSetupController');
router.get('/farmer/profile',(req,res)=>{
    res.json('Welcome to Profile Setup');
})
router.post('/farmer/profile', profileController);
// router.post('/farmer/profile', (req, res) => {
//     console.log(req.body); // Check if this logs anything
//     res.json({ message: 'Received the profile data', data: req.body });
// });


module.exports = router;