// Load environment variables
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize connection to Mongodb
require('./src/db/conn');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





// test data
require('./src/db/testData');

// Public routes
app.use('/', require('./src/routes/users')) // authorization

// jwt authentication
const { authenticateToken } = require("./src/middleware/auth");
//app.use(authenticateToken);

// Private routes
app.use('', require('./src/routes'));





// TODO: Error Handling Middleware

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
