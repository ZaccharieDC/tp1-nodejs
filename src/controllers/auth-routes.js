const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userRepository = require('../models/user-repository');

router.post('/', body('firstName').not().isEmpty(), body('password').not().isEmpty(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.send(userRepository.login(req.body))
})

exports.initializeRoutes = () => {
    return router;
}