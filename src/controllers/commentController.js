const commentService = require('../services/commentService');

exports.createComment = async (req, res) => {
  try {
    const { text, user_id, post_id } = req.body;
    const newComment = await commentService.createComment({ text, user_id, post_id });
    res.status(201).json(newComment);
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Post not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await commentService.getAllComments();
    res.json(comments);
  } catch (error) {
    if (error.message === 'Comments not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await commentService.getCommentById(req.params.id);
    res.json(comment);
  } catch (error) {
    if (error.message === 'Comment not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await commentService.updateComment(req.params.id, { text });
    res.json(comment);
  } catch (error) {
    if (error.message === 'Comment not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await commentService.deleteComment(req.params.id);
    res.status(204).send({ message: `Comment ${comment.id} deleted`});
  } catch (error) {
    if (error.message === 'Comment not found') {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === 'Post not found') {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};
