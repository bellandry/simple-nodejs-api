const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Create a new post with images
router.post('/', verifyToken, upload.array('images', 5), postController.create);

// Get all posts with images and comments
router.get('/', postController.findAll);

// Get a single post with images and comments
router.get('/:id', postController.findById);

// Update a post with optional new images
router.put('/:id', verifyToken, upload.array('images', 5), postController.update);

// Add comment to a post
router.post('/:id/comments', verifyToken, postController.addComment);

// Delete a post and its associated images
router.delete('/:id', verifyToken, postController.delete);

module.exports = router;