const usersModel = require('../models/users.models');
const createErrors = require('http-errors');

UsersList = async (req, res, next) => {
    try {
        const userList = await usersModel.find();
        res.send({ userList, req: req.body });
    } catch (error) {
        next(error);
    }
};

const usersController = { UsersList };
module.exports = usersController;