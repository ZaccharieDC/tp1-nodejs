const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');

router.post('/', (req, res) => {
  res.send(userRepository.login(req.body))
})

exports.initializeRoutes = () => {
return router;
}