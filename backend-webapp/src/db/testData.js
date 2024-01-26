const User = require('../schemas/user.js');

// Clear the User collection
User.deleteMany({})
  .then(() => {
    console.log('User collection cleared');

    // Create and save multiple users
    const usersData = [
      {
        name: 'user1',
        type: 'experimenter',
        email: 'usr1@example.com',
        password: 'mail12345',
      },
      {
        name: 'usr2',
        type: 'admin',
        email: 'usr2@example.com',
        password: 'admin12345',
      },
      {
        name: 'usr3',
        type: 'experimenter',
        email: 'usr3@example.com',
        password: 'experiment123',
      },
      // Add more users as needed
    ];

    const saveUserPromises = usersData.map(userData => {
      const user = new User(userData);
      return user.save();
    });

    return Promise.all(saveUserPromises);
  })
  .then(() => console.log('Test Users saved successfully'))
  .catch(err => console.error('Error:', err));
