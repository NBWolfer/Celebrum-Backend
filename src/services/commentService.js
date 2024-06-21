const Comment = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');

exports.createComment = async ({ text, user_id, post_id }) => {
    const user = await User.findById(user_id);
    if (!user) {
        throw new Error('User not found');
    }

    const post = await Post.findById(post_id);
    if (!post) {
        throw new Error('Post not found');
    }

    const newComment = await Comment.create({ text, user_id, post_id });

    user.comments.push(newComment._id);
    post.comments.push(newComment._id);

    await user.save();
    await post.save();

    return newComment;
};

exports.getAllComments = async () => {
    const comments = await Comment.find();
    if (!comments) {
      throw new Error('Comments not found');
    }
    return comments;
};

exports.getCommentById = async (id) => {
    const comment = await Comment.findById(id).populate('user_id').populate('post_id');
    if (!comment) {
        throw new Error('Comment not found');
    }
    return comment;
};

exports.updateComment = async (id, { text }) => {
    const comment = await Comment.findByIdAndUpdate(id, { text }, { new: true });
    if (!comment) {
        throw new Error('Comment not found');
    }

    return comment;
}

exports.deleteComment = async (id) => {
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
        throw new Error('Comment not found');
    }

    const user = await User.findById(comment.user_id);
    if (!user) {
        throw new Error('User not found');
    }

    const post = await Post.findById(comment.post_id);
    if (!post) {
        throw new Error('Post not found');
    }

    user.comments.pull(comment._id);
    post.comments.pull(comment._id);

    await user.save();
    await post.save();

    return comment;
}