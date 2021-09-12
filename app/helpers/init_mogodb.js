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
    useFindAndModify: false
}).then(() => {
    console.log("mongodb connected");
}).catch((error) => { console.log(JSON.stringify(error)) });

//connection to mongodb

mongoose.connection.on('connected',()=>{console.log("mongodb connected to db")});

mongoose.connection.on('error',(error) => { console.log(JSON.stringify(error)) });

mongoose.connection.on('disconnected',()=>{console.log("mongodb is disconnected")});


process.on('SIGINT',async ()=>{
   await mongoose.connection.close();
   process.exit(0);
});
