const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
