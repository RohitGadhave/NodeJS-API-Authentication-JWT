const express = require('express');
const usersController = require('../controllers/users.controller');
const routes = express.Router();

const auth_jwt_middlewares = require('../middlewares/auth_jwt.middlewares');

routes.get('/userslist',auth_jwt_middlewares.verifyAccessToken,usersController.UsersList);

module.exports = routes;