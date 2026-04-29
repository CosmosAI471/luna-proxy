const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors()); // This allows your frontend to talk to this proxy
app.use(express.json());

// These are pulled from Render's secret settings
const HF_URL = process.env.HF_URL; 
const HF_KEY = process.env.HF_KEY;

app.post('/chat', async (req, res) => {
    try {
        const response = await fetch(HF_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${HF_KEY}`
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Luna is sleeping or proxy failed." });
    }
});

app.listen(process.env.PORT || 3000, () => console.log('Shield is active!'));
