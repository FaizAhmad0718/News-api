const express = require('express');
const axios = require('axios');
const path = require('path'); // Require path

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve an HTML file
});

// API URL
const API_URL = `https://newsdata.io/api/1/latest?apikey=pub_545859241af628f67c5872090768cdbf9f7e4`;

app.get('/search', async (req, res) => {
    try {
        console.log("Fetching news...");

        const category = req.query.category; // Get the category from the query parameter
        if (!category) {
            return res.status(400).json({ error: 'Category is required' });
        }
        let url = API_URL+`&category=${category}`;
        const response = await axios.get(url);
        
        console.log("News fetched successfully:", response.data);
        
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'An error occurred while fetching news' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
