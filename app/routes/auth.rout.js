const express = require('express');
const usersController = require('../controllers/users.controller');
const routes = express.Router();
const createErrors = require('http-errors');
const { verifyRefreshAccessToken, signAccessToken, signRefreshAccessToken } = require('../middlewares/auth_jwt.middlewares');
//signup
routes.post('/signup', usersController.Signup);
//signin
routes.post('/signin', usersController.SignIn);
//signout
routes.post('/signout', async (req, res, next) => { });
//refresh token
routes.post('/refresh-token', async (req, res, next) => {
    try {
        const { refreshAccessToken } = req.body;
        if (!refreshAccessToken) next(createErrors.BadRequest());
        const RefreshAccessTokenUser = await verifyRefreshAccessToken(refreshAccessToken);

        const accessToken = await signAccessToken(RefreshAccessTokenUser);
        const refreshToken = await signRefreshAccessToken(RefreshAccessTokenUser);
        res.send({ accessToken, refreshToken });
    } catch (error) {
        next(error);
    }

});
module.exports = routes;