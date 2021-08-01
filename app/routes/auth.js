const express = require('express');

const routes = express.Router();

//signup
routes.post('/signup', async (req, res, next) => {
    res.send("signup");
});
//signin
routes.post('/signin', async (req, res, next) => { });
//signout
routes.post('/signout', async (req, res, next) => { });
//refresh token
routes.post('/refresh-token', async (req, res, next) => { });
module.exports = routes;