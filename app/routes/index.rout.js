const authRout = require('./auth.rout');
const userRout = require('./users.rout');
const allRouts = (app) => {

    app.use('/auth', authRout);
    app.use('/api/user', userRout);
}

module.exports = { allRouts };