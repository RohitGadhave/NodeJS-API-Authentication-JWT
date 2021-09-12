const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

const userSchema = new Schema(userSchemaInterFace,{ timestamps: true });

//middleware

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.post('save', async function (next) {
    try {

    } catch (error) {
        next(error);
    }
});

//validate password
userSchema.methods.isValidPassword =
    async function (password) {
        try {
            //console.log(password,"password")
            const flag =await bcrypt.compare(password, this.password);
            //console.log(flag,"flag");
            return flag;
        } catch (error) {
            throw error;
        }
    };

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;