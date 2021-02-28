var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ResetPasswordSchema = new Schema({
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    token: String,
    status: String,
    created_at: Date,
    updated_at: Date
});

var ResetPassword = mongoose.model('reset_password', ResetPasswordSchema );
module.exports = ResetPassword;