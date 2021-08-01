const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchemaInterFace = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
};

const userSchema = new Schema(userSchemaInterFace);


const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;