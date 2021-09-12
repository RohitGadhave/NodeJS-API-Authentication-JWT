const usersModel = require('../models/users.models');
const createErrors = require('http-errors');

UsersList = async (req, res, next) => {
    let { page, size } = req.query;
    if (!page) {
        page = 1;
    }
    if (!size) {
        size = 10;
    }
    const limit = parseInt(size);
    const skip = (page - 1) * size;
    try {
        const userList = await usersModel.find({}, { "password": 0 }).skip(skip).limit(limit).sort({ "mobile": -1 });
        const count = userList.length;
        res.send({ page, size, count, users: userList });
    } catch (error) {
        next(error);
    }
};

const usersController = { UsersList };
module.exports = usersController;