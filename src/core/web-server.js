const express = require('express');
const { initializeAuthMiddlwares, initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const authRoutes = require('../controllers/auth-routes');
const userRoutes = require('../controllers/user-routes');

class WebServer {
  app = undefined;
  port = 3000;

  constructor() {
    this.app = express();

    initializeConfigMiddlewares(this.app);
    this._initializeAuthRoute();
    initializeAuthMiddlwares(this.app)    
    this._initializeRoutes();
    initializeErrorMiddlwares(this.app);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }

  _initializeRoutes() {
    this.app.use('/users', userRoutes.initializeRoutes());
  }

  _initializeAuthRoute() {
    this.app.use('/login', authRoutes.initializeRoutes());
  }
}

module.exports = WebServer;