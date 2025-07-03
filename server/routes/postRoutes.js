const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', [
  check('title').not().isEmpty(),
  check('content').not().isEmpty()
], postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;