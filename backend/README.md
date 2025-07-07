# Medical Project Backend API

A comprehensive backend API for a medical/hospital management system built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Patient, Doctor, and Admin user types
- **Appointment System**: Book and manage medical appointments
- **Doctor Profiles**: Complete doctor information and availability
- **Medical Services**: Hospital services management
- **News & Updates**: Medical news and announcements
- **Security**: Rate limiting, input validation, and security headers

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── db.js           # Database connection
│   └── index.js        # Main server file
├── env.example         # Environment variables template
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medical_project_mern/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   Edit `.env` file with your configuration:
   ```env
   PORT=8000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/medical_project
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (Protected)
- `POST /api/auth/logout` - User logout (Protected)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)

### Doctors
- `GET /api/doctors` - Get all doctors (Public)
- `GET /api/doctors/:id` - Get single doctor (Public)
- `POST /api/doctors` - Create doctor profile (Doctor/Admin)
- `PUT /api/doctors/:id` - Update doctor profile (Doctor/Admin)
- `DELETE /api/doctors/:id` - Delete doctor (Admin only)

### Appointments
- `GET /api/appointments` - Get all appointments (Protected)
- `GET /api/appointments/:id` - Get single appointment (Protected)
- `POST /api/appointments` - Create appointment (Patient)
- `PUT /api/appointments/:id` - Update appointment (Protected)
- `DELETE /api/appointments/:id` - Delete appointment (Protected)

### Services
- `GET /api/services` - Get all services (Public)
- `GET /api/services/:id` - Get single service (Public)
- `POST /api/services` - Create service (Admin only)
- `PUT /api/services/:id` - Update service (Admin only)
- `DELETE /api/services/:id` - Delete service (Admin only)

### News
- `GET /api/news` - Get all news (Public)
- `GET /api/news/:id` - Get single news (Public)
- `POST /api/news` - Create news (Admin only)
- `PUT /api/news/:id` - Update news (Admin only)
- `DELETE /api/news/:id` - Delete news (Admin only)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 👥 User Roles

- **Patient**: Can book appointments, view doctors, services
- **Doctor**: Can manage profile, view appointments
- **Admin**: Full access to all features

## 🛡️ Security Features

- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Validates all incoming data
- **Security Headers**: Helmet.js for security headers
- **CORS**: Configured for frontend access
- **Password Hashing**: Bcrypt for password security

## 📊 Health Check

Check if the server is running:
```
GET /health
```

## 🐛 Error Handling

The API includes comprehensive error handling:
- Validation errors
- Authentication errors
- Database errors
- General server errors

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

### Environment Variables
- `PORT` - Server port (default: 8000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRE` - JWT expiration time
- `FRONTEND_URL` - Frontend URL for CORS

## 📝 License

This project is licensed under the ISC License. 