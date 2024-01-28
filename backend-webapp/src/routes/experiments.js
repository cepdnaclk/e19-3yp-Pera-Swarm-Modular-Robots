const { log } = require('winston');
const Experiment = require('../schemas/experiment');
const User = require('../schemas/user');

// Create a new experiment
exports.createExperiment = async (req, res) => {
    console.log(req.body);
    try {

        const experimentData = {
            user_id:req.body.user_id,
            attachments: req.body.attachments,
            log: req.body.log,
            videoFile: req.body.videoFile,
            name: req.body.name,
            schedule: req.body.schedule,
            status: req.body.status,
        };

        const experiment = new Experiment(experimentData);
        await experiment.save();
        res.status(201).json(experiment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Get all experiments
exports.getAllExperiments = async (req, res) => {
    try {
        const experiments = await Experiment.find();
        res.json(experiments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single experiment by ID
exports.getExperimentById = async (req, res) => {
    try {
        const experiment = await Experiment.findById(req.params.id);
        if (!experiment) {
            return res.status(404).json({ message: 'Experiment not found' });
        }
        res.json(experiment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a attachement status of a experiment
exports.getAttachmentStatusById = async (req, res) => {
    try {
        const { attachments } = await Experiment.findById(req.params.id);
        if (!attachments) {
            return res.status(404).json({ message: 'Experiment not found' });
        }

        // Convert the array to an object and remove null values
        const attachmentsObject = attachments.reduce((acc, attachment) => {
            if (attachment !== '-') {
                acc[attachment] = 'connected'; // Assuming default status is "connected"
            }
            return acc;
        }, {});

        res.json(attachmentsObject);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update an experiment by ID
exports.updateExperiment = async (req, res) => {
    try {
        const experiment = await Experiment.findById(req.params.id);
        if (!experiment) {
            return res.status(404).json({ message: 'Experiment not found' });
        }
       
        // Update fields based on your requirements
        if (req.body.name) experiment.name = req.body.name;
        if (req.body.id) experiment.id = req.body.id;
        if (req.body.log) experiment.log = req.body.log;
        if (req.body.videoFile) experiment.videoFile = req.body.videoFile;
        if (req.body.status) experiment.status = req.body.status;

        await experiment.save();
        res.json(experiment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete an experiment by ID
exports.deleteExperiment = async (req, res) => {
    const id = req.params.id;
    try {
        const experiment = await Experiment.findByIdAndDelete(id);
        if (!experiment) {
            return res.status(404).json({ message: 'Experiment not found' });
          }

        
        res.json({ message: 'Experiment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get all experiments by ExperimenterID (UserID)
exports.getExperimentByUserId = async (req, res) => {
  const userId = req.params.id; // Assuming userId is provided as a parameter in the request

  try {
    // Find all experiments with the given user_id (ExperimenterID)
    const experiments = await Experiment.find({ user_id: userId });

    // if (experiments.length === 0) {
    //   return res.status(404).json({ message: 'No experiments found for the given user ID' });
    // }
    res.status(200).json(experiments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
