var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    title: String,
    description: String,
    created_at: Date
});

var Post = mongoose.model('post', PostSchema );

module.exports = Post;