const mongoose = require('mongoose');
const User = require('./user'); // Import the User model

const experimentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  log: {
    type: String,
    required: true,
  },
  videoFile: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  attatchments:{
    type: [String], // default order = [TF,TR,TL,TB,BF,BR,BL,BB]
    default: ['','','','','','','','']
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
    validate: {
      validator: async function (value) {
        const user = await User.findById(value);
        return user && user.type === 'experimenter';
      },
      message: 'User must have type "experimenter"',
    },
  },
});

module.exports = mongoose.model('Experiment', experimentSchema);
