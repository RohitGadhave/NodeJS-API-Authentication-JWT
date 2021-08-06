const usersModel = require('../models/users.models');
const createErrors = require('http-errors');

const { authSchema, signInSchema } = require('../helpers/validation_schema');
const { signAccessToken, signRefreshAccessToken } = require('../middlewares/auth_jwt.middlewares');
//signup new user
Signup = async (req, res, next) => {
    try {
        const { email, password, name, mobile } = req.body
        //if (!email || !password || !name || !mobile) throw createErrors.BadRequest();
        const result = await authSchema.validateAsync({ email, password, name, mobile });
        console.log(result);
        console.log(req.body);
        //check user already present or not
        const userDoesExist = await usersModel.findOne({ email: result.email });
        if (userDoesExist) throw createErrors.Conflict(`${email} is already exist`);

        //create new user

        const newUser = new usersModel(result);

        const savedUser = await newUser.save()

        //Sign A Access Token
        const accessToken = await signAccessToken(savedUser);
        const refreshToken = await signRefreshAccessToken(savedUser);
        res.send({ user: savedUser, accessToken, refreshAccessToken: refreshToken });
    } catch (error) {
        //check joi error
        if (error.isJoi === true) next(createErrors.BadRequest("Invalid Data"));
        next(error)
    }
};


SignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //console.log(req.body);
        //JOI Validation
        const result = await signInSchema.validateAsync({ email, password });
        //if (!email || !password) throw createErrors.BadRequest();

        //check user present or not
        const user = await usersModel.findOne({ email: result.email })
        if (!user) throw createErrors.NotFound(`${result.email} Email Not Found`);
        //validate Password
        const isMatch = await user.isValidPassword(result.password);
        //console.log(isMatch,"isMatch")
        if (!isMatch) throw createErrors.Unauthorized("Email/Password not valid");
        const accessToken = await signAccessToken(user);
        const refreshToken = await signRefreshAccessToken(user);

        const data = {};
        data.user = user;
        data.accessToken = accessToken;
        data.refreshAccessToken = refreshToken;
        //console.log(data);
        res.send(data);
    } catch (error) {
        //check joi error
        if (error.isJoi === true) next(createErrors.BadRequest("Invalid Details"));
        next(error)
    }

};


UsersList = async (req, res, next) => {
    try {
        const userList = await usersModel.find();
        res.send({ userList, req: req.body });
    } catch (error) {
        next(error);
    }
};

const usersController = { UsersList, SignIn, Signup };
module.exports = usersController;