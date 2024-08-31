const { OpenAI } = require('openai');

class OpenAIConnector {
    constructor(apiKey) {
        this.openai = new OpenAI({ apiKey });
    }

    async completeText(prompt) {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 150
            });
            return response.choices[0].message.content.trim();
        } catch (error) {
            console.error('Error al completar el texto con OpenAI:', error);
            throw error;
        }
    }
}

module.exports = OpenAIConnector;
