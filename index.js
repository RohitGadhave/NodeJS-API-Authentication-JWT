const express = require('express');
const morgan = require('morgan');
const createErrors = require('http-errors');
require('dotenv').config();
 
require('./app/helpers/init_mogodb');

//import routes
const auth = require('./app/routes/auth');

// Initialize the app
const app = express();
let port = process.env.PORT || 4000;

// Import routes 
//require("./app/routes/auth")(app);

app.use('/auth', auth);

app.use(async (req, res, next) => {
    next(createErrors.NotFound());
});

app.use(async (error, req, res, next) => {
    res.status(error.status || 500);
    res.send({ error: error });
});
// Launch app to listen to specified port
app.listen(port, () => {
    console.log("Running Api/SERVER on port " + port);
});