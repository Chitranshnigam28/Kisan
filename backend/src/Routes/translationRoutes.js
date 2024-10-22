const express = require('express');
const router=express.Router();
const translateWorkingCode = require('../api/translation')

router.post('/translate',translateWorkingCode)

module.exports = router;