const express = require('express');
const { body, validationResult } = require('express-validator');
const { sign } = require('jsonwebtoken');
const router = express.Router();
const userRepository = require('../models/user-repository');
const bcrypt = require('bcrypt');

router.post('/', 
  body('firstName').not().isEmpty(), 
  body('password').not().isEmpty(), 
  (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, password } = req.body;

  const user = userRepository.getUserByFirstName(firstName);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(401).send('Unauthorized');

    return;
  }

  const token = sign(
    { user: user },
    process.env.SECRET,
    { expiresIn: process.env.EXPIRATION },
  );

  res.json({ token });
})

exports.initializeRoutes = () => {
    return router;
}