require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');
const OpenAIConnector = require('./openaiConnector');

const app = express();
const port = 3001;

app.use(bodyParser.json());

let db;
let openaiConnector;

// Función para conectar a MongoDB
async function connectToMongo() {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Conectado a MongoDB');
    db = client.db('privacy_vault');
}

// Función para generar un token alfanumérico
function generateToken(type) {
    return `${type}_${crypto.randomBytes(6).toString('hex')}`;
}

// Función para anonimizar el texto
async function anonymizeText(text) {
    const nameRegex = /[A-Z][a-z]+ [A-Z][a-z]+/g;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phoneRegex = /\b\d{10}\b/g;

    const tokenCollection = db.collection('tokens');

    async function replaceAndStore(match, type) {
        const token = generateToken(type);
        await tokenCollection.insertOne({ token, value: match });
        return token;
    }

    const namePromises = [];
    const emailPromises = [];
    const phonePromises = [];

    text = text.replace(nameRegex, (match) => {
        const promise = replaceAndStore(match, 'NAME');
        namePromises.push(promise);
        return '[NAME]';
    });

    text = text.replace(emailRegex, (match) => {
        const promise = replaceAndStore(match, 'EMAIL');
        emailPromises.push(promise);
        return '[EMAIL]';
    });

    text = text.replace(phoneRegex, (match) => {
        const promise = replaceAndStore(match, 'PHONE');
        phonePromises.push(promise);
        return '[PHONE]';
    });

    const nameTokens = await Promise.all(namePromises);
    const emailTokens = await Promise.all(emailPromises);
    const phoneTokens = await Promise.all(phonePromises);

    text = text.replace(/\[NAME\]/g, () => nameTokens.shift());
    text = text.replace(/\[EMAIL\]/g, () => emailTokens.shift());
    text = text.replace(/\[PHONE\]/g, () => phoneTokens.shift());

    return text;
}

// Función para desanonimizar el texto
async function deanonymizeText(text) {
    const tokenRegex = /(NAME|EMAIL|PHONE)_[a-f0-9]{12}/g;
    const tokenCollection = db.collection('tokens');
    
    return await text.replace(tokenRegex, async (token) => {
        const doc = await tokenCollection.findOne({ token });
        return doc ? doc.value : token;
    });
}

// Nuevo endpoint secureChatGPT
app.post('/secureChatGPT', async (req, res) => {
    const { prompt } = req.body;
    
    if (!prompt) {
        return res.status(400).json({ error: 'Se requiere un prompt' });
    }

    try {
        // Anonimizar el prompt
        const anonymizedPrompt = await anonymizeText(prompt);

        // Enviar el prompt anonimizado a ChatGPT
        const anonymizedResponse = await openaiConnector.completeText(anonymizedPrompt);

        // Desanonimizar la respuesta
        const deanonymizedResponse = await deanonymizeText(anonymizedResponse);

        res.json({ response: deanonymizedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

// Modificar la función de inicio del servidor
async function startServer() {
    await connectToMongo();
    openaiConnector = new OpenAIConnector(process.env.OPENAI_API_KEY);
    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });
}

startServer().catch(console.error);
