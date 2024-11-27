const Post = require('../models/Post');

const postController = {
  // Create a new post
  async create(req, res) {
    try {
      const post = await Post.create({
        ...req.body,
        authorId: parseInt(req.body.authorId),
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all posts
  async findAll(req, res) {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get post by ID
  async findById(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update post
  async update(req, res) {
    try {
      const post = await Post.update(req.params.id, req.body);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete post
  async delete(req, res) {
    try {
      await Post.delete(req.params.id);
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = postController;
