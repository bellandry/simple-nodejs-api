const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const postController = {
    // Create a new post with optional images
    async create(req, res) {
      console.log("les fichiers :", req.files)
        try {
            const { title, content } = req.body;
            const authorId = req.user.userId;
            
            const post = await Post.create({
                title,
                content,
                authorId
            }, req.files || null);

            res.json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating post' });
        }
    },

    // Get all posts with images and comments
    async findAll(req, res) {
        try {
            const posts = await Post.findAll();
            res.json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching posts' });
        }
    },

    // Get post by ID with images and comments
    async findById(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching post' });
        }
    },

    // Add comment to a post
    async addComment(req, res) {
        try {
            const { content } = req.body;
            const postId = req.params.id;
            const authorId = req.user.id;

            const comment = await Post.addComment(postId, authorId, content);
            res.json(comment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating comment' });
        }
    },

    // Update post and handle optional image updates
    async update(req, res) {
        try {
            const postId = parseInt(req.params.id);
            const { title, content } = req.body;
            const authorId = req.user.id;

            // Check if post exists and user is authorized
            const existingPost = await Post.findById(postId);
            if (!existingPost) {
                return res.status(404).json({ error: 'Post not found' });
            }
            if (existingPost.authorId !== authorId) {
                return res.status(403).json({ error: 'Not authorized' });
            }

            // Handle new images if provided
            const newImages = req.files && req.files.length > 0 
                ? req.files.map(file => ({
                    url: `/uploads/${file.filename}`
                })) 
                : null;

            const updatedPost = await Post.update(postId, {
                title,
                content,
                newImages
            });

            res.json(updatedPost);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating post' });
        }
    },

    // Delete post and its associated images
    async delete(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            if (post.authorId !== req.user.id) {
                return res.status(403).json({ error: 'Not authorized' });
            }

            // Delete image files
            const images = await Post.getImages(req.params.id);
            for (const image of images) {
                const imagePath = path.join(__dirname, '../../', image.url);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            await Post.delete(req.params.id);
            res.json({ message: 'Post deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error deleting post' });
        }
    }
};

module.exports = postController;
