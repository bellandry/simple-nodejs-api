const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Post routes
router.post('/', postController.create);
router.get('/', postController.findAll);
router.get('/:id', postController.findById);
router.put('/:id', postController.update);
router.delete('/:id', postController.delete);

module.exports = router;
