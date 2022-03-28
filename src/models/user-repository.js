const { users } = require('./db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 12
const { v4: uuidv4 } = require('uuid')

exports.login = function(data) {
  console.log(data)
  const user = this.getUserByFirstName(data.firstName)
  bcrypt.compare(data.password, user.password, function(err, result) {      
    if (result == false) {
      return err
    }
    console.log({
      userId: user.id,
      token: jwt.sign(
        { userId: user._id },
        'Wong Xi Fang Su Ha',
        { expiresIn: '1h' }
      )
    })
  });
}

exports.getUsers = () => {
  return users;
};

exports.getUserByFirstName = (firstName) => {
  const foundUser = users.find((user) => user.firstName == firstName);

  if (!foundUser) {
    throw new Error('User not found');
  }

  return foundUser;
};

exports.createUser = (data) => {
  bcrypt.hash(data.password, saltRounds, function(err, hash) {
    data.password = hash
  })
  setTimeout(() => {
    const user = {
      id: uuidv4(),
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    };
  
    users.push(user);
  }, 1000)
};

exports.updateUser = (id, data) => {
  const foundUser = users.find((user) => user.id == id);

  if (!foundUser) {
    throw new Error('User not found');
  }

  bcrypt.hash(data.password, saltRounds, function(err, hash) {
    data.password = hash
  })

  setTimeout(() => {
    foundUser.firstName = data.firstName || foundUser.firstName;
    foundUser.lastName = data.lastName || foundUser.lastName;
    foundUser.password = data.password ? data.password : foundUser.password;
    }, 1000)
};

exports.deleteUser = (id) => {
  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex === -1) {
    throw new Error('User not foud');
  }

  users.splice(userIndex, 1);
}
