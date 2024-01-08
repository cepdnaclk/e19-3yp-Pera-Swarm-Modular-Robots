const Robot = require('../schemas/robot');

// Create a new robot
exports.createRobot = async (req, res) => {
    try {
        const robot = new Robot(req.body);
        await robot.save();
        res.status(201).json(robot);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all robots
exports.getAllRobots = async (req, res) => {
    try {
        const robots = await Robot.find();
        res.json(robots);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single robot by ID
exports.getRobotById = async (req, res) => {
    try {
        const robot = await Robot.findById(req.params.id);
        if (!robot) {
            return res.status(404).json({ message: 'Robot not found' });
        }
        res.json(robot);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a robot by ID
exports.updateRobot = async (req, res) => {
    try {
        const robot = await Robot.findById(req.params.id);
        if (!robot) {
            return res.status(404).json({ message: 'Robot not found' });
        }

        // Update fields based on your requirements
        robot.name = req.body.name;
        robot.type = req.body.type;

        await robot.save();
        res.json(robot);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a robot by ID
exports.deleteRobot = async (req, res) => {
    try {
        const robot = await Robot.findById(req.params.id);
        if (!robot) {
            return res.status(404).json({ message: 'Robot not found' });
        }

        await robot.remove();
        res.json({ message: 'Robot deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
