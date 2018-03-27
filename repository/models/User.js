//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	password: String,
    firstName: String,
    lastName: String,
    birthdate: Date
});

// Compile model from schema
var UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;