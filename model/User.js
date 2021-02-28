var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  name: String,
  email: String,
  avatar: String,
  password: String,
  created_at: Date
});

// Compile model from schema
var User = mongoose.model('User', UserSchema );
module.exports = User;