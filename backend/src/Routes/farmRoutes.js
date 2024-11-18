const express = require("express")
const { createFarm, getFarms, updateFarms, deleteFarms } = require("../Controllers/farmController")

const authMiddleware = require("/middlewares/authMiddleware")

const router = express.Router();

router.post('/farms', authMiddleware, createFarm)
router.get('/farms', authMiddleware, getFarms)
router.put('/farms/:id', authMiddleware, updateFarms)
router.delete('/farms/:id', authMiddleware, deleteFarms)

module.exports = router;