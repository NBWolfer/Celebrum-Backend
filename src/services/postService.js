const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

exports.createPost = async (postData) => {
    const { title, description, user_id } = postData;
    const newPost = await Post.create({ title, description, user_id });

    if (!newPost) {
        throw new Error('Post not created');
    }

    const user = await User.findById(user_id);
    if (!user) {
        throw new Error('User not found');
    }

    user.posts.push(newPost._id);
    await user.save();

    return newPost;
}

exports.getAllPosts = async () => {
    const posts = await Post.find();
    if (!posts) {
        throw new Error('Posts not found');
    }
    return posts;
}

exports.getPostById = async (postId) => {
    const post = await Post.findById(postId).populate('user_id').populate('comments');
    if (!post) {
        throw new Error('Post not found');
    }
    return post;
}

exports.updatePost = async (postId, postData) => {
    const { title, description } = postData;
    const post = await Post.findByIdAndUpdate(postId, { title, description }, { new: true });
    if (!post) {
        throw new Error('Post not found');
    }
    return post;
}

exports.deletePost = async (postId) => {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
        throw new Error('Post not found');
    }

    const user = await User.findById(post.user_id);
    if (!user) {
        throw new Error('User not found');
    }

    user.posts.pull(post._id);
    await user.save();
    
    // Delete all comments associated with the post
    var query = { post_id: post._id };
    const comments = await Comment.find(query);
    if(comments.length != 0){
        comments.forEach(async (comment) => {
            await Comment.findByIdAndDelete(comment._id);
            const user = await User.findById(comment.user_id);
            user.comments.pull(comment._id);
            await user.save();
        });
    }
    return post;
}

exports.getCommentsByPostId = async (postId) => {
    const post = await Post.findById(postId).populate('comments');
    if (!post) {
        throw new Error('Post not found');
    }

    if (post.comments.length === 0) {
        throw new Error('Comments not found');
    }

    return post.comments;
}