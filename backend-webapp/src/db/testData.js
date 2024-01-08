const User = require('../schemas/user.js');

// Clear the User collection
User.deleteMany({})
  .then(() => {
    console.log('User collection cleared');
    
    // Then insert the new user
    const user = new User({
      // populate the fields according to your schema
      name: 'swarmbot',
      type: 'admin',
      email: 'testuser@example.com',
      password: 'mail123',
      // add more fields as needed
    });

    return user.save();
  })
  .then(() => console.log('Test User saved successfully'))
  .catch(err => console.error('Error:', err));