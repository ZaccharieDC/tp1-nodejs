const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const userRepository = require('../models/user-repository');

router.get('/', (req, res) => {
  res.send(userRepository.getUsers())
});

router.get('/:firstName', (req, res) => {
  const foundUser = userRepository.getUserByFirstName(req.params.firstName);

  if (!foundUser) {
    throw new Error('User not found');
  }

  res.send(foundUser);
});

router.post('/', (req, res) => {
  let token = req.headers.authorization.split(' ')[1]
  token = jwt.verify(token, process.env.SECRET)
  if(token.user.role != 'ADMIN') {
    res.status(403).end()
    throw new Error('You are not an admin, acces not allowed');
  }

  userRepository.createUser(req.body);
  res.status(201).end();
});

router.put('/:id', (req, res) => {
  let token = req.headers.authorization.split(' ')[1]
  token = jwt.verify(token, process.env.SECRET)
  if(token.user.role != 'ADMIN') {
    res.status(403).end()
    throw new Error('You are not an admin, acces not allowed');
  }

  userRepository.updateUser(req.params.id, req.body);
  res.status(204).end();
});

router.delete('/:id', (req, res) => {
  let token = req.headers.authorization.split(' ')[1]
  token = jwt.verify(token, process.env.SECRET)
  if(token.user.role != 'ADMIN') {
    res.status(403).end()
    throw new Error('You are not an admin, acces not allowed');
  }

  userRepository.deleteUser(req.params.id);
  res.status(204).end();
});

exports.initializeRoutes = () => {
  return router;
}
