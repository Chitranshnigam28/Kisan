const express=require('express');
const router=express.Router();
require('dotenv').config({ path: './../../.env' });

router.get('/recommend-crop/:ownerId', async (req, res) => {
    const { ownerId } = req.params;
    const result = await fetchFarmAndRecommendCrop(ownerId);
    
    if (result.error) {
        return res.status(400).json({ error: result.error });
    }
    
    res.json(result);
});

module.exports = router;