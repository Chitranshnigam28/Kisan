require('dotenv').config({path:'./../../.env'}); 
const express = require('express');
const { Translate } = require('@google-cloud/translate').v2;
const bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router();
const googleApiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
const translate = new Translate({
  key: googleApiKey,
});

router.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }

  try {
    const [translation] = await translate.translate(text, targetLanguage);
    res.json({ translatedText: translation });
  } catch (error) {
    console.error('Translation failed:', error);
    res.status(500).json({ message: 'Translation failed' });
  }
});

module.exports = router;
