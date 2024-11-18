// routes/chat.js
const express = require('express');
const { chatBot } = require('/api/chatBot');

const router = express.Router();

router.post('/chat', async (req, res) => {
    const { messages } = req.body;

    try {
        const responseMessage = await chatBot(messages);
        if (responseMessage.error) {
            return res.status(500).json({ error: responseMessage.error });
        }
        res.json({ message: responseMessage });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router; // Export the router
