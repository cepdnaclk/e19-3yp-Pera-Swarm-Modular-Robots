// Load environment variables
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const user =require('./src/schemas/user')
const {requestLogger,createLog}= require('./src/middleware/logger'); //import logger


const expressWinston = require('express-winston');




//user.create({name:"swarmbot",type:"admin",email:"mail@mail.com",password:"mail123"})

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize connection to Mongodb
require('./src/db/conn');

app.use(expressWinston.logger({
    winstonInstance: requestLogger,
    statusLevels: true,
}))

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

// Public routes
app.use('/user', require('./src/routes/users')) // authorization

// jwt authentication
const { authenticateToken } = require("./src/middleware/auth");
//app.use(authenticateToken);

// Private routes
app.use('', require('./src/routes'));

// TODO: Error Handling Middleware

const userID = "1234";
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    createLog(userID,`Server is running on port ${port}`);
    
});

