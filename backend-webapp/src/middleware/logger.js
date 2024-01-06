const expressWinston = require('express-winston');
const {createLogger, format, transports} = require('winston');
const fs = require('fs');

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
    new transports.File({
      filename: 'logs/data.log',
      level: 'info',
     
      
    }),
    new transports.File({
      filename: 'logs/data-error.log',
      level: 'error',
      
    })
  ],
  format: format.combine(
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
        format.prettyPrint(),
        customFormat // Using the custom format here
  ),
}) 

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
    timestamp: new Date().toISOString(),
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
viewLogEntries();

module.exports = {createLog,
                  requestLogger};