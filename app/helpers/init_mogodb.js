const mongoose = require('mongoose');
require('dotenv').config();
const mongoDbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME;
mongoose.connect(mongoDbUrl, {
    dbName: dbName,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 300000,
    useCreateIndex: true,
    useFindAndModify: true
}).then(() => {
    console.log("mongodb connected");
}).catch((error) => { console.log(JSON.stringify(error)) });