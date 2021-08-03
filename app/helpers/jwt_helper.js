const JWT = require('jsonwebtoken');
const createErrors = require('http-errors');


module.exports.signAccessToken = (user) => {    
    const payload = {
        name: user.name,
        email: user.email
    };
    const audience = user._id.toString();
    const secret = process.env.JWT_SECRET || "Not For Prod";
    const options = {
        audience: audience,
        expiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES * 60,
        issuer: process.eventNames.JWT_ISSUER || "rohitg.tech"
    };
    return new Promise((resolve, reject) => {
        //create access token
        JWT.sign(payload, secret, options, (error, token) => {
            if (error) return reject(error);
            //console.log(token);
            resolve(token);
        });
    });
};