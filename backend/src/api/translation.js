const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

app.post('/api/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;

  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2`,
      {
        q: text,
        target: targetLanguage,
        key: apiKey
      }
    );

    const translatedText = response.data.data.translations.map(t => t.translatedText).join(' || ');
    res.json({ translatedText });
  } catch (error) {
    console.error('Error in translation API:', error.response ? error.response.data : error.message);
    res.status(500).send('Translation failed');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});