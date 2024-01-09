const mongoose = require('mongoose');
const User = require('./user'); // Import the User model

const experimentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  id: {
    type: Number,
    required: false,
  },
  log: {
    type: String,
    required: false,
  },
  videoFile: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  attatchments:{
    type: [String], // default order = [TF,TR,TL,TB,BF,BR,BL,BB]
    default: ['','','','','','','',''],
    required:true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
    validate: {
      validator: async function (value) {
        const user = await User.findById(value);
        return user;
      },
      message: 'User must have type "experimenter"',
    },
  },
  status: {
    type: String,
    enum: ['pending', 'running', 'completed','ready'],
    default: 'ready',
  },
});

module.exports = mongoose.model('Experiment', experimentSchema);
