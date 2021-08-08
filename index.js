const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const createErrors = require('http-errors');
require('dotenv').config();

require('./app/helpers/init_mogodb');



// Initialize the app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options('*', cors());
let port = process.env.PORT || 4000;

// Import routes 
require('./app/routes/index.rout').allRouts(app);
//error

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