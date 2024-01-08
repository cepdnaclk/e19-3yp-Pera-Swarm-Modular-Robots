const db = require('../db/conn');

//get user logs by user id
exports.getLogById = async(req, res) => {
  try {
    const userId = req.params.id;
    const logsCollection = db.collection('logs'); //use logs collection

    const userLogs = await logsCollection.find({ 'meta.userId': userId }).toArray();

    return res.json(userLogs);
  } catch (error) {
    console.error('Error retrieving user logs:', error);
    return error;
  } 

}

//get all logs
exports.getAllLogs = async(req, res) => {
  try {
    const logsCollection = db.collection('logs'); //use logs collection

    const allLogs = await logsCollection.find().toArray();

    return res.json(allLogs);
  } catch (error) {
    console.error('Error retrieving all logs:', error);
    return error;
  } 
}

