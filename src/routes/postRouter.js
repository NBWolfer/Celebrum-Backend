const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Gönderilerle ilgili endpoint'ler
router.route('/')
    .post(postController.createPost)
    .get(postController.getAllPosts);

router.route('/:id')
    .get(postController.getPostById)
    .put(postController.updatePost)
    .delete(postController.deletePost);

router.route('/:id/comments')
    .get(postController.getCommentsByPostId);

module.exports = router;
