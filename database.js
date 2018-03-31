'use strict';

const MongoClient       = require('mongodb').MongoClient;

module.exports = (dbName) => {
    const promise = MongoClient.connect('mongodb://localhost:27017/')
        .then(client => client.db(dbName));
    return async function dbExec(callback) {
        const db = await promise;
        const collection = db.collection('users');
        const data = await callback(collection);
        return data;
    }
}


// //Import the mongoose module
// var mongoose = require('mongoose');

// //Set up default mongoose connection
// var mongoDB = 'mongodb://127.0.0.1:27017/playDate';
// mongoose.connect(mongoDB);
// // Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
// //Get the default connection
// var db = mongoose.connection;

// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));