const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { scrapeGoogle } = require('./scraper');
const { saveResultsToFile } = require('./untils/saveToFile.js');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint pro scraping
app.post('/scrape', async (req, res) => {
    const { keyword } = req.body;
    try {
        // Scrapování výsledků z Googlu
        const results = await scrapeGoogle(keyword);

        // Uložení do souboru
        const { filepath, filename } = await saveResultsToFile(results, keyword);

        res.json({ success: true, fileUrl: `/output/${filename}`, filename });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to scrape results.' });
    }
});

// Statická složka pro výstupy
app.use('/output', express.static(path.join(__dirname, '../output')));

// Start serveru
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
