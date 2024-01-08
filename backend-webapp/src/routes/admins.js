// Import User model and encrypting library
const User = require('../schemas/user');
const bcrypt = require('bcrypt');

// Controller functions

// Get All Admins
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({ type: 'admin' });
        res.json(admins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Admin by ID
exports.getAdminById = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin || admin.type !== 'admin') {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create Admin
exports.createAdmin = async (req, res) => {
    const admin = new User({
        name: req.body.name,
        type: 'admin', // Set explicitly to 'admin'
        email: req.body.email,
        password: req.body.password
    });

    try {
        const newAdmin = await admin.save();
        res.status(201).json(newAdmin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update Admin
exports.updateAdmin = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin || admin.type !== 'admin') {
            return res.status(404).json({ message: 'Admin not found' });
        }

        admin.name = req.body.name || admin.name;
        admin.email = req.body.email || admin.email;

        if (req.body.password) {
            // Hash and update the password if provided
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            admin.password = hashedPassword;
        }

        const updatedAdmin = await admin.save();
        res.json(updatedAdmin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Admin
exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin || admin.type !== 'admin') {
            return res.status(404).json({ message: 'Admin not found' });
        }

        await admin.deleteOne(); // Use deleteOne instead of remove
        res.json({ message: 'Admin deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

