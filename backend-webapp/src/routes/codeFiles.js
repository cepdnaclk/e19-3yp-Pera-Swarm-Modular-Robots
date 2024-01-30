const path = require('path');
const { publishToTopic } = require('../aws/config');
const fs = require('fs');
const { promisify } = require('util');
const zip = require('express-zip');
const writeFileAsync = promisify(fs.writeFile);

const db = require('../db/conn');
const Experiment = require('../schemas/experiment');
const filesPath = path.join(__dirname, '../../files');

exports.getFileForCode = async (req, res) => {

  try {
    const files = fs.readdirSync(filesPath).map((file) => ({
      path: path.join(filesPath, file),
      name: file,
    }));

    const archiveName = 'files.zip';

    res.set('Content-Type', 'application/zip');
    res.set('Content-Disposition', `attachment; filename=${archiveName}`);

    res.zip(files, archiveName, (err) => {
      if (err) {
        console.log('Error sending files:', err);
        res.status(500).send('Error sending files');
      } else {
        console.log('Files sent successfully');
      }
    });
  } catch (error) {
    console.error('Error reading files:', error);
    res.status(500).send('Error reading files');
  }
};

exports.saveCodeFiles = async (req, res) => {
  try {
    const { code, requirements } = req.body;

    const uploadStatus = {backendUpload : false, botUpload : false };

    // console.log('code: ', code, 'requirements' , requirements);
    const { id } = req.params;
    
    // // Check if the ID is valid
    // try {
    //   const record = await Experiment.findById(id);
    // } catch (error) {
    //   res.status(400).send('Invalid Experiment id');
    // }

    // // Check if the ID is present in the database
    // if (!record) {
    //   return res.status(404).json({ error: 'No such Experiment.' });
    // }

    // Validate that code and requirements are present
    // if (!code) {
    //   return res.status(400).json({ error: 'Code is required.' });
    // }

    // file names
    const codeFileName = 'run.py';
    const requirementsFileName = 'requirements.txt';

    // Write code to run.py
    const codeFilePath = path.join(filesPath, codeFileName);
    const requirementsFilePath = path.join(filesPath, requirementsFileName);
    try {
          await writeFileAsync(codeFilePath, code);
          await writeFileAsync(requirementsFilePath, requirements);

          uploadStatus.backendUpload = true ;
    } catch (error) {
          uploadStatus.backendUpload = false ;
    }

    
    

    console.log("\x1b[32mCode writing to files : DONE\x1b[0m");
    
    // TODO: call MQTT broker 
   try {
    const { publishToTopic } = require("../mqtt/client");
    publishToTopic("server_directives", "run");
      uploadStatus.botUpload = true;
   } catch (error) {
      uploadStatus.botUpload = false;
   }

    res.send(uploadStatus);


  } catch (error) {
    console.error('Error saving code files:', error);
    res.status(500).send('Error saving code files');
  }
};