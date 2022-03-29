const dotenv = require('dotenv');
const express = require('express');
const { initializeAuthMiddlwares, initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const authRoutes = require('../controllers/auth-routes');
const userRoutes = require('../controllers/user-routes');
dotenv.config();

class WebServer {
  app = undefined;
  port = process.env.PORT;
  server = undefined;

  constructor() {
    this.app = express();

    initializeConfigMiddlewares(this.app);
    this._initializeAuthRoute();
    initializeAuthMiddlwares(this.app)    
    this._initializeRoutes();
    initializeErrorMiddlwares(this.app);
  }

  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }

  stop() {
    this.server.close();
  }

  _initializeRoutes() {
    this.app.use('/users', userRoutes.initializeRoutes());
  }

  _initializeAuthRoute() {
    this.app.use('/login', authRoutes.initializeRoutes());
  }
}

module.exports = WebServer;