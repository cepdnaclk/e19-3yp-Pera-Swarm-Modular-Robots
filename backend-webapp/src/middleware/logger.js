const {createLogger, format, transports} = require('winston');

// ... logging function

const dataLogger = createLogger({

  transports: [
    new transports.File({
      filename: 'data.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.File({
      filename: 'data.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json())
    })
  ]
}) 

module.exports = dataLogger;


function createLogEntry(){
  // TODO
}

function viewLogEntries(){
  // TODO: NOT URGENT
}
