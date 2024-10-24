require('dotenv').config({path:'./../../.env'}); 

const express = require('express');
const { Translate } = require('@google-cloud/translate').v2;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const googleApiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
<<<<<<< HEAD
=======
// console.log("Google API Key:", googleApiKey); 
>>>>>>> 11cbb57c496de835251c2caa152204e71533a7ef

const translate = new Translate({
  key: googleApiKey, 
});

const translateText = async (req, res) => {
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
};

module.exports = translateText
