const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Yorumlarla ilgili endpoint'ler
router.route('/')
    .post(commentController.createComment)
    .get(commentController.getAllComments);

router.route('/:id')
    .get(commentController.getCommentById)
    .put(commentController.updateComment)
    .delete(commentController.deleteComment);

module.exports = router;
