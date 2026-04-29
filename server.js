const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const HF_URL = process.env.HF_URL ? process.env.HF_URL.trim() : ""; 

app.post('/chat', async (req, res) => {
    console.log("--- New Request Received from Frontend ---");
    console.log("Data going to HF:", JSON.stringify(req.body));

    try {
        const response = await fetch(HF_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // <--- NO MORE AUTHORIZATION HEADER
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`HF Space Error (${response.status}):`, errorText);
            return res.status(response.status).json({ error: "HF Space rejected the request." });
        }

        const data = await response.json();
        console.log("Luna responded successfully!");
        res.json(data);
    } catch (error) {
        console.error("Proxy Connection Error:", error.message);
        res.status(500).json({ error: "Could not reach HF Space. Check URL." });
    }
});

app.listen(process.env.PORT || 3000, () => console.log('Shield is active and logging!'));
