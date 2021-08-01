const express = require('express');
const morgan = require('morgan');
const createErrors = require('http-errors');
require('dotenv').config();
 
require('./app/helpers/init_mogodb');



// Initialize the app
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

let port = process.env.PORT || 4000;

// Import routes 
//require("./app/routes/auth")(app);
//import routes
const auth = require('./app/routes/auth.rout');
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