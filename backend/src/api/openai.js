require('dotenv').config({path:'../../.env'});
const OpenAI = require('openai'); 

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
});

const cropRecommendationAI = async () => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4", 
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: "Write a crop recommendation for moderate temperature.",
                },
            ],
        });

        console.log(completion.choices[0].message.content);
    } catch (error) {
        console.error('Error generating response:', error);
    }
};

cropRecommendationAI();
