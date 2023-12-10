const User = require('../schemas/user');

// Create a new experimenter
exports.createExperimenter = async (req, res) => {
    try {
        const experimenter = new User(req.body);
        experimenter.type = 'experimenter'; // Set the type to experimenter
        await experimenter.save();
        res.status(201).json(experimenter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all experimenters
exports.getAllExperimenters = async (req, res) => {
    try {
        const experimenters = await User.find({ type: 'experimenter' });
        res.json(experimenters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single experimenter by ID
exports.getExperimenterById = async (req, res) => {
    try {
        const experimenter = await User.findById(req.params.id);
        if (!experimenter || experimenter.type !== 'experimenter') {
            return res.status(404).json({ message: 'Experimenter not found' });
        }
        res.json(experimenter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an experimenter by ID
exports.updateExperimenter = async (req, res) => {
    try {
        const experimenter = await User.findById(req.params.id);
        if (!experimenter || experimenter.type !== 'experimenter') {
            return res.status(404).json({ message: 'Experimenter not found' });
        }

        // Update fields based on your requirements
        experimenter.name = req.body.name;
        experimenter.email = req.body.email;
        experimenter.password = req.body.password;

        await experimenter.save();
        res.json(experimenter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete an experimenter by ID
exports.deleteExperimenter = async (req, res) => {
    try {
        const experimenter = await User.findById(req.params.id);
        if (!experimenter || experimenter.type !== 'experimenter') {
            return res.status(404).json({ message: 'Experimenter not found' });
        }

        await experimenter.remove();
        res.json({ message: 'Experimenter deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
