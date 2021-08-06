const JWT = require('jsonwebtoken');
const createErrors = require('http-errors');


signAccessToken = (user) => {
    const payload = {
        name: user.name,
        email: user.email
    };
    const audience = user._id.toString();
    const secret = process.env.JWT_ACCESS_SECRET;
    const options = {
        audience: audience,
        expiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES * 60,
        issuer: process.eventNames.JWT_ISSUER || "rohitg.tech"
    };
    return new Promise((resolve, reject) => {
        //create access token
        JWT.sign(payload, secret, options, (error, token) => {
            if (error) {
               // console.error(error, "JWT ERROR");
                return reject(createErrors.InternalServerError())
            };
            //console.log(token);
            resolve(token);
        });
    });
};

verifyAccessToken = (req, res, next) => {
    //console.log(req.headers['authorization']);
    if (!req.headers['authorization']) return next(createErrors.Unauthorized());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    //console.log(bearerToken[1]);
    const token = bearerToken[1];
    const secret = process.env.JWT_ACCESS_SECRET;
    JWT.verify(token, secret, (error, payload) => {
        if (error) {
            if (error.name === "JsonWebTokenError") {
                return next(createErrors.Unauthorized());
            } else {
                return next(createErrors.Unauthorized(error.message));
            }
        }
        req.payload = payload;
        //console.log(payload, "payload");
        next();
    })

}

signRefreshAccessToken = (user) => {
    const payload = {
        name: user.name,
        email: user.email
    };
    const audience = user._id.toString();
    const secret = process.env.JWT_REFRESH_ACCESS_SECRET;
    const options = {
        audience: audience,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_MINUTES * 60,
        issuer: process.eventNames.JWT_ISSUER || "rohitg.tech"
    };
    return new Promise((resolve, reject) => {
        //create access token
        JWT.sign(payload, secret, options, (error, token) => {
            if (error) {
                //console.error(error, "JWT ERROR");
                return reject(createErrors.InternalServerError())
            };
            //console.log(token);
            resolve(token);
        });
    });
};

verifyRefreshAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        const secret = process.env.JWT_REFRESH_ACCESS_SECRET;
        JWT.verify(token, secret, (error, payload) => {

            if (error) {
                if (error.name === "JsonWebTokenError") {
                    return reject(createErrors.Unauthorized());
                } else {
                    return reject(createErrors.Unauthorized(error.message));
                }
            }

            //console.log(JSON.stringify(payload));
            const data = {};
            data._id = payload.aud;
            data.name = payload.name;
            data.email = payload.email;
            resolve(data);
        });
    });
}

//export the functions
const authjwtMiddleware = {
    verifyAccessToken,
    signAccessToken,
    verifyRefreshAccessToken,
    signRefreshAccessToken
};
module.exports = authjwtMiddleware;