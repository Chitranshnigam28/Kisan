require('dotenv').config({ path: './../../.env' });
const fetch = require('node-fetch');

const chatBot = async (messages) => {
    const apiMessages = messages.map((msg) => ({
        role: msg.sender === 'ChatGPT' ? 'assistant' : 'user',
        content: msg.message,
    }));

    const systemMessage = {
        role: "system",
        content: "Speak like a farmer. Responses must be in a professional tone. Whatever you answer it must be really concise and short (maximum 3-4 sentences)."
    };

    const apiRequestBody = {
        model: "gpt-4",
        messages: [systemMessage, ...apiMessages],
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching from OpenAI API:", error);
        return { error: "Error with AI response" };
    }
};

module.exports = { chatBot };