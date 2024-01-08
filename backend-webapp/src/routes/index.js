const express = require("express");
const router = express.Router();

// Import admin controller
const adminController = require('../routes/admins');
const experimenterController = require('../routes/experimenters');
const robotController = require("../routes/robots");
const experimentController = require("../routes/experiments");
const logController = require("../routes/viewLogs");



// Admins Endpoints
router.get('/api/admins', adminController.getAllAdmins);
router.get('/api/admins/:id', adminController.getAdminById);
router.post('/api/admins', adminController.createAdmin);
router.put('/api/admins/:id', adminController.updateAdmin);
router.delete('/api/admins/:id', adminController.deleteAdmin);


// Experimenters Endpoints
router.post('/api/experimenter', experimenterController.createExperimenter);
router.get('/api/experimenters', experimenterController.getAllExperimenters);
router.get('/api/experimenters/:id', experimenterController.getExperimenterById);
router.put('/api/experimenters/:id', experimenterController.updateExperimenter);
router.delete('/api/experimenters/:id', experimenterController.deleteExperimenter);

// Robots Endpoints
router.post('/api/robot', robotController.createRobot);
router.get('/api/robots', robotController.getAllRobots);
router.get('/api/robot/:id', robotController.getRobotById);
router.put('/api/robot/:id', robotController.updateRobot);
router.delete('/api/robot/:id', robotController.deleteRobot);

// Experiments Endpoints
router.post('/api/experiment', experimentController.createExperiment);
router.get('/api/experiments', experimentController.getAllExperiments);
router.get('/api/experiment/:id', experimentController.getExperimentById);
router.put('/api/experiment/:id', experimentController.updateExperiment);
router.delete('/api/experiment/:id', experimentController.deleteExperiment);

// Logs Endpoints
router.get('/api/logs', logController.getAllLogs);
router.get('/api/logs/:id', logController.getLogById);

router.get('/', (req, res) => {
    res.send('Hello, PeraSwarm!');
});

module.exports = router;
