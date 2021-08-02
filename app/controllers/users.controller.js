const usersModel = require('../models/users.models');
const createErrors = require('http-errors');

const { authSchema, signInSchema } = require('../helpers/validation_schema');

//signup new user
module.exports.Signup = async (req, res, next) => {
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
        res.send(savedUser);
    } catch (error) {
        //check joi error
        if(error.isJoi===true) error.status=422;
        next(error)
    }
};


module.exports.SignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const result = await signInSchema.validateAsync({ email, password });
        //if (!email || !password) throw createErrors.BadRequest();

        //check user present or not
        const user = await usersModel.findOne({ email: result.email })
        if (!user) throw createErrors.NotFound(`${email} Email Not Found`);

        res.send(user);
    } catch (error) {
        //check joi error
        if(error.isJoi===true) error.status=422;
        next(error)
    }

};