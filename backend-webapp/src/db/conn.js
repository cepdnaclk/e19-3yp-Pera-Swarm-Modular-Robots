const mongoose = require('mongoose');

// Create connection
mongoose.connect(
  process.env.MONGODB_URL, 
  { 
    // useNewUrlParser: true, 
    // useUnifiedTopology: true 
  }
);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Error handling
db.on('error', err => {
  console.log("MongoDB Error: " + err);
});



module.exports = db;
