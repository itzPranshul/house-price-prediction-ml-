const express = require('express');
const { execFile } = require('child_process');
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

app.post('/predict', (req, res) => {
    const features = req.body.features;

    if (!features || !Array.isArray(features)) {
        return res.status(400).json({ error: 'Invalid input features' });
    }

    const inputJson = JSON.stringify({ features });

    execFile('python3', ['predict.py', inputJson], (error, stdout, stderr) => {
        if (error) {
            console.error('Error:', stderr);
            return res.status(500).json({ error: 'Prediction failed' });
        }
        const prediction = parseFloat(stdout);
        res.json({ prediction });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
