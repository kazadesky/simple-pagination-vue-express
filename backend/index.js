const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Load data
const data = require('./data.json');

// Routes
app.get('/items', (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Items per page (default: 10)
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {
        totalItems: data.length,
        totalPages: Math.ceil(data.length / limit),
        currentPage: page,
        items: data.slice(startIndex, endIndex),
    };

    res.json(results);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
