const express = require('express');
const usersController = require('../controllers/users.controller');
const routes = express.Router();


routes.get('/userslist',usersController.UsersList);

module.exports = routes;