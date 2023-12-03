const mongoose = require('mongoose');

const robotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
    },
  type: {
    type: String,
    enum: ['swarm_bot', 'obstacle_bot', 'modular_bot'],
    required: true
  }
});

module.exports = mongoose.model('Robot', robotSchema);
