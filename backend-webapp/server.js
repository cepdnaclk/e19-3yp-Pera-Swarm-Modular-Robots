// Load environment variables
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize connection to Mongodb
require('./src/db/conn');

// Public routes
app.use('/user', require('./src/routes/users')) // authorization
app.get('/healthcheck', (req, res) => {
    res.send('Server is up and running');
});


// TODO: Authentication Middleware

// Private routes
app.use('', require('./src/routes'));

// TODO: Error Handling Middleware

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
