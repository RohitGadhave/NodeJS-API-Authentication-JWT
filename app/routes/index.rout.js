const authRout = require('./auth.rout');
const userRout = require('./users.rout');
const allRouts = (app) => {
    app.get('/',(req, res, next)=>{
        res.send("hellow");
    });
    app.use('/api/auth', authRout);
    app.use('/api/user', userRout);
}

module.exports = { allRouts };