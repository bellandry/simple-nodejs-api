# Flutter NodeJS API

A RESTful API backend built with Node.js and Express.js, designed to serve a Flutter application. This API provides authentication (including OAuth), post management with image uploads, and commenting functionality using Prisma ORM with MySQL database.

## Features

- User Authentication
  - Local Authentication (Register/Login)
  - Google OAuth Integration
  - GitHub OAuth Integration
  - JWT-based Authorization
- Post Management
  - CRUD operations
  - Multiple Image Upload Support (up to 5 images per post)
  - Commenting System
  - Author Information
- Database & Storage
  - MySQL Database Integration
  - Prisma ORM for Database Operations
  - Local File Storage for Images
- Security
  - JWT Token Authentication
  - Password Hashing with bcryptjs
  - File Upload Validation
  - User Authorization Checks

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn package manager
- Google OAuth credentials (for Google authentication)
- GitHub OAuth credentials (for GitHub authentication)

## Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: 
  - JWT (JSON Web Tokens)
  - Passport.js (OAuth)
- **File Upload**: Multer
- **Password Hashing**: bcryptjs

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bellandry/simple-nodejs-api.git
   cd simple-nodejs-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/your_database"
   JWT_SECRET="your-jwt-secret"
   PORT=3000
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   SESSION_SECRET="your-session-secret"
   ```

4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Create uploads directory:
   ```bash
   mkdir uploads
   ```

## Running the Application

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/github` - GitHub OAuth login
- `GET /api/auth/github/callback` - GitHub OAuth callback

### Posts
- `GET /api/posts` - Get all posts with images and comments
- `GET /api/posts/:id` - Get a specific post with images and comments
- `POST /api/posts` - Create a new post with images
  - Accepts multipart/form-data with:
    - title: Post title
    - content: Post content
    - images: Up to 5 image files
- `POST /api/posts/:id/comments` - Add a comment to a post
- `DELETE /api/posts/:id` - Delete a post and its associated images

## Project Structure

```
flutter-nodejs-api/
├── src/
│   ├── config/
│   │   ├── oauth.js
│   │   └── passport.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── postController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   └── Post.js
|   |   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   ├── app.js
│   └── server.js
├── prisma/
│   └── schema.prisma
├── uploads/        # Image storage directory
├── .env
├── package.json
└── README.md
```

## Dependencies

### Main Dependencies
- @prisma/client: ^5.22.0
- bcryptjs: ^2.4.3
- dotenv: ^16.4.5
- express: ^4.21.1
- jsonwebtoken: ^9.0.2
- multer: Latest version
- passport: Latest version
- passport-google-oauth20: Latest version
- passport-github2: Latest version
- express-session: Latest version

## Security Considerations

1. OAuth Setup:
   - Keep your OAuth credentials secure
   - Use environment variables for sensitive data
   - Set up proper callback URLs in Google and GitHub developer consoles

2. File Uploads:
   - Maximum file size: 5MB per image
   - Allowed formats: jpg, jpeg, png, gif
   - Files are stored in the `uploads` directory

3. Authentication:
   - JWT tokens expire after 24 hours
   - Passwords are hashed using bcryptjs
   - Session management for OAuth

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Resource created
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: Not found
- 500: Server error

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Author

- Built with ❤️ by [Landry Bella](https://laclass.dev)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
