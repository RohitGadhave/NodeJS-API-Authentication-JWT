const express = require('express');
const usersController = require('../controllers/users.controller');
const routes = express.Router();

//signup
routes.post('/signup', usersController.Signup);
//signin
routes.post('/signin', usersController.SignIn);
//signout
routes.post('/signout', async (req, res, next) => { });
//refresh token
routes.post('/refresh-token', async (req, res, next) => { });
module.exports = routes;