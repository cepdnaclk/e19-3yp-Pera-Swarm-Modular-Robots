// Load environment variables
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const expressWinston = require('express-winston');

const {requestLogger,createLog}= require('./src/middleware/logger');//import logger

// Initialize connection to Mongodb
require('./src/db/conn');

const app = express();
const port = process.env.PORT || 3001;

// code get endpoint for mqtt 
app.get('/files', require("./src/routes/codeFiles").getFileForCode);


// Middleware ----------------------------------------------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//middleware for logging errors and warnings in requests
app.use(expressWinston.logger({
    winstonInstance: requestLogger,
    statusLevels: true,
}));
expressWinston.requestWhitelist.push('body'); //log body of request
expressWinston.responseWhitelist.push('body');






// Public routes --------------------------------

app.use('/', require('./src/routes/users')) // authorization
app.get('/healthcheck', (req, res) => {
    res.send('Server is up and running');

app.use('/public', express.static(path.join(__dirname, 'public'))) // static content
// serve experiment source files
const zip = require('express-zip');
app.get('/files', (req, res) => {
  const fs = require('fs');
  const files = 
    fs.readdirSync(path.join(__dirname, 'files'))
    .map((file)=> ({
        path: path.join(__dirname, 'files', file),
        name: file  
      })
    );
  const archiveName = 'files.zip';

  res.set('Content-Type', 'application/zip');
  res.set('Content-Disposition', `attachment; filename=${archiveName}`);

  res.zip(files, archiveName, (err) => {
    if (err) {
      console.log('Error sending files:', err);
    } else {
      console.log('Files sent successfully');
    }
  });

}); });





// jwt authentication
const { authenticateToken } = require("./src/middleware/auth");
//app.use(authenticateToken);

// Private routes
app.use('', require('./src/routes'));




// test user db data
require('./src/db/testData');


// TODO: Error Handling Middleware

// const userID = "1111";
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
   // createLog(userID,`Server is running on port ${port}`);   
});

