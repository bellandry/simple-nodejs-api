const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authController = require('../controllers/authController');

// Helper function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

// Google OAuth routes
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        const token = generateToken(req.user);
        res.json({ token, user: req.user });
    }
);

// GitHub OAuth routes
router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
    passport.authenticate('github', { session: false }),
    (req, res) => {
        const token = generateToken(req.user);
        res.json({ token, user: req.user });
    }
);

module.exports = router;
