
const mongoose = require('mongoose');
const AccessMatrix = require('./src/schemas/accessMatrix');
const db = require('..db/conn')

// Create a new access matrix entry
const adminRobotAccess = new AccessMatrix({
  role: 'admin',
  privileges: [
    {
      resource: {
        db: 'botdb',
        collection: 'robots',
      },
      actions: ['find', 'insert', 'update', 'remove'],
    },
    {
        resource: {
          db: 'botdb',
          collection: 'experiments',
        },
        actions: ['find', 'insert', 'update', 'remove'],
      }
    // Add more privileges as needed
  ],
  roles: ['user'], // Inherit privileges from the 'user' role
});

// Save the access matrix entry to the database
adminRobotAccess.save()
  .then(savedEntry => {
    console.log('Experimenter Robot Access  Matrix Entry saved:', savedEntry);
  })
  .catch(error => {
    console.error('Error saving Experimenter Robot Access  Matrix Entry:', error);
  });


// Create a new access matrix entry for experimenters
const experimenterRobotAccess = new AccessMatrix({
    role: 'experimenter',
    privileges: [
      {
        resource: {
          db: 'botdb',
          collection: 'robots',
        },
        actions: ['find'],
      },
      {
        resource: {
          db: 'botdb',
          collection: 'experiments',
        },
        actions: ['find', 'insert', 'update', 'remove'],
      },
      // Add more privileges as needed for experimenters
    ],
    roles: ['user'], // Inherit privileges from the 'user' role
  });
  
  // Save the access matrix entry for experimenters to the database
  experimenterRobotAccess.save()
    .then(savedEntry => {
      console.log('Experimenter Robot Access Matrix Entry saved:', savedEntry);
    })
    .catch(error => {
      console.error('Error saving Experimenter Robot Access Matrix Entry:', error);
    });