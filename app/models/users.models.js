const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchemaInterFace = 1;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required: true
    }
});


const UserModel = mongoose.model('users',userSchema);

module.exports = UserModel;