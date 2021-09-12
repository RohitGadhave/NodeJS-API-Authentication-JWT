const express = require('express');
const routes = express.Router();
const authController = require('../controllers/auth.controller');
//signup
routes.post('/signup', authController.Signup);
//signin
routes.post('/signin', authController.SignIn);
//signout
routes.post('/signout', async (req, res, next) => { });
//refresh token
routes.post('/refresh-token', authController.verifyRefershToken);
module.exports = routes;