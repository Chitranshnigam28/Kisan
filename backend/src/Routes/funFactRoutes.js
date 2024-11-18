const express = require('express');
const router = express.Router();
const FunFact = require('../models/funFactSchema');

router.get("/funfacts", async (req, res) => {
    try {
        const count = await FunFact.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomFunFact = await FunFact.findOne().skip(randomIndex);
        res.json(randomFunFact);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch random fun fact" });
    }
});

module.exports = router;