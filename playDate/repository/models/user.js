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

// // Compile model from schema
// var UerModel = mongoose.model('UserModel', userSchema);

// // Save the new model instance, passing a callback
// awesome_instance.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// });