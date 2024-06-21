const User = require('../models/user');

exports.createUser = async (userData) => {
    const { name, email, job } = userData;
    const newUser = await User.create({ name, email, job });
    if (!newUser) {
        throw new Error('User not created');
    }
    return newUser;
}

exports.getAllUsers = async () => {
    const users = await User.find();
    if (!users) {
        throw new Error('Users not found');
    }
    return users;
}

exports.getUserById = async (userId) => {
    const user = await User.findById(userId).populate('posts').populate('comments');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

exports.updateUser = async (userId, userData) => {
    const { name, email, job } = userData;
    const user = await User.findByIdAndUpdate(userId, { name, email, job }, { new: true });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

exports.deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        throw new Error('User not found');
    }
}

exports.getPostsByUserId = async (userId) => {
    const user = await User.findById(userId).populate('posts');
    if (!user) {
        throw new Error('User not found');
    }
    
    if (user.posts.length === 0) {
        throw new Error('Posts not found');
    }

    return user.posts;
}