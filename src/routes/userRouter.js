const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Kullanıcılarla ilgili endpoint'ler
router.route('/')
    .post(userController.createUser)
    .get(userController.getAllUsers);

router.route('/:id')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/:id/posts')
    .get(userController.getPostsByUserId);

module.exports = router;
