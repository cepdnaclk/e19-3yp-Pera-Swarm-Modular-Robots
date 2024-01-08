const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  type: {
    type: String,
    enum: ['admin', 'experimenter'],
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true
  }
})

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password') || user.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Compare entered password with stored hashed password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);

