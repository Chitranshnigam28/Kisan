require('dotenv').config({ path: './../../.env' });
const express = require('express');
const OpenAI = require('openai');
const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.get('/historical-price', async (req, res) => {
    const { crop_name, last_crop_sowed } = req.query;

    console.log('Requested crops:', crop_name, last_crop_sowed);

    if (!crop_name || !last_crop_sowed) {
        return res.status(400).json({ error: 'Missing crop names for historical price data.' });
    }

    const prompt = `
    Generate realistic monthly price data over the last 6 months for the following crops in India based on historical trends, formatted strictly as a JSON array:
    [
        {
            "crop_name": "${crop_name}",
            "months": ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024"],
            "prices": [/* six realistic values in INR based on Indian market trends */]
        },
        {
            "crop_name": "${last_crop_sowed}",
            "months": ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024"],
            "prices": [/* six realistic values in INR based on Indian market trends */]
        }
    ]
    Format strictly as JSON. Exclude any additional explanation, commentary, or placeholders in prices. Use realistic market-based variations for prices in INR.
`;


    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt },
            ],
        });

        if (!completion.choices || completion.choices.length === 0) {
            console.error('OpenAI API response did not contain choices.');
            return res.status(500).json({ error: 'Failed to retrieve historical price data.' });
        }

        const historicalData = completion.choices[0].message.content.trim();
        console.log('Raw Historical Data:', historicalData);

        // Remove any non-JSON text that may appear before or after the JSON array
        const jsonMatch = historicalData.match(/\[.*\]/s);
        if (!jsonMatch) {
            throw new Error('No JSON array found in OpenAI response.');
        }

        const data = JSON.parse(jsonMatch[0]);
        console.log('Parsed Historical Data:', data);

        res.json({ crops: data });
    } catch (error) {
        console.error('Error handling historical price data:', error.message);
        res.status(500).json({ error: 'Failed to parse historical price data.' });
    }
});

module.exports = router;

