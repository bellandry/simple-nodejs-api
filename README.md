# Flutter NodeJS API

A RESTful API backend built with Node.js and Express.js, designed to serve a Flutter application. This API provides authentication and post management functionality using Prisma ORM with MySQL database.

## Features

- User Authentication (Register/Login)
- JWT-based Authorization
- Post Management (CRUD operations)
- MySQL Database Integration
- Prisma ORM for Database Operations

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn package manager

## Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd flutter-nodejs-api
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
   ```

4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
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

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

## Project Structure

```
flutter-nodejs-api/
├── src/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   ├── app.js
│   └── server.js
├── prisma/
│   └── schema.prisma
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
- mysql2: ^3.11.4
- prisma: ^5.22.0

### Dev Dependencies
- nodemon: ^3.1.7

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
