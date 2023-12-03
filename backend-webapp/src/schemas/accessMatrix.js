const mongoose = require('mongoose');

const accessMatrixSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ['experimenter','admin']
  },
  privileges: [
    {
      resource: {
        db: String,
        collection: String,
      },
      actions: [String],
      required: true
    },
  ],
  roles: [String] // Additional roles this role inherits from
});

module.exports = mongoose.model('AccessMatrix', accessMatrixSchema);