const expressWinston = require('express-winston');
const {createLogger, format, transports, level} = require('winston');
const fs = require('fs');
require('winston-mongodb');



const customFormat = format.printf(({ level, message, timestamp, userId }) => {
  return JSON.stringify({
    userId,
    level,
    message,
    timestamp,
    
  });
});



const logger = createLogger({

  transports: [
    new transports.MongoDB({
      db: process.env.MONGODB_URL,
      level: 'info',
      options: { useUnifiedTopology: true }, // MongoDB options 
      collection: 'logs', // Collection name where logs will be stored
      format: format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.json(),
        format.metadata(),
                 
  )
   
 }),
]
  
}); 

const requestLogger = createLogger({

  transports: [
    new transports.File({
      filename: 'logs/requestWarnings.log',
      level: 'warn',
      
    }),
    new transports.File({
      filename: 'logs/requestErrors.log',
      level: 'error',
      
    })
  ],
  format: format.combine(
    format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
    format.json(),
    format.prettyPrint()
  ),
}) 

//function to create log entries
function createLog(userId, message) {
  logger.log({
    level: 'info',
    message: message,
    userId: userId
  });
}


//function to view log entries
function viewLogEntries() {
  const logFilePath = 'logs/data.log'; // Replace with your log file path

  // Read the log file
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading log file:', err);
    } else {
      // Split log entries by newline character and log each entry
      const logEntries = data.split('\n');
      logEntries.forEach((entry) => {
        if (entry.trim() !== '') {
          console.log(JSON.parse(entry)); // Parse each entry and log it
        }
      });
    }
  });
}

// Call the function to view log entries
//viewLogEntries();

module.exports = {createLog,
                  requestLogger};