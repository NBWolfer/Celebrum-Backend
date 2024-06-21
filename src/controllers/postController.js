const postService = require('../services/postService');

exports.createPost = async (req, res) => {
    try {
      const { title, description, user_id } = req.body;
      const newPost = await postService.createPost({ title, description, user_id });
  
      res.status(201).json(newPost);
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'Post not created') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  };

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    if (error.message === 'Posts not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    if (error.message === 'Post not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await postService.updatePost(req.params.id, { title, description });
    res.json(post);
  } catch (error) {
    if (error.message === 'Post not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
    try {
      const post = await postService.deletePost(req.params.id);
      res.status(204).send({ message: `Post ${post.id} deleted`});
    } catch (error) {
    if (error.message === 'Post not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    if(error.message === 'Comments not deleted') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ error: error.message + ' ' + error.detail});
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const comments = await postService.getCommentsByPostId(req.params.id);
    res.status(200).json(comments);
  } catch (error) {
    if (error.message === 'Post not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Comments not found') {
      return res.status(200).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
}