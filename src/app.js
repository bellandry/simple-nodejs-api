const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const { verifyToken } = require('./middleware/authMiddleware');

// Import passport config
require('./config/passport');

const app = express();

// Middleware
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Request logging middleware
app.use((req, res, next) => {
  const start = new Date();

  // Store the original res.json method
  const originalJson = res.json;
  
  // Override res.json method
  res.json = function(body) {
    const responseBody = body;
    
    // Calculate request duration
    const duration = new Date() - start;
    
    // Log request and response details
    console.log(`[${start.toISOString()}] ${req.method} ${req.url} - Status: ${res.statusCode} - Duration: ${duration}ms`);
    console.log('Response:', JSON.stringify(responseBody, null, 2));
    
    // Call the original res.json with the body
    return originalJson.call(this, body);
  };

  next();
});

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/users', verifyToken, userRoutes);
app.use('/api/posts', verifyToken, postRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
