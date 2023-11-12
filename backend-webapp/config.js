// config.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/pera-swarm', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello, PeraSwarm!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
