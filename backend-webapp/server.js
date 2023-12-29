// Load environment variables
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const user = require('./src/schemas/user')
const path = require('path')

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
});


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
