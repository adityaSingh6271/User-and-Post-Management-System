const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

// Validation middleware
const postValidation = [
  body('title').notEmpty().trim().escape(),
  body('description').optional().trim().escape(),
  body('user_id').isInt(),
  body('images').isArray()
];

router.get('/', getAllPosts);
router.post('/', postValidation, createPost);
router.put('/:id', postValidation, updatePost);
router.delete('/:id', deletePost);

module.exports = router;