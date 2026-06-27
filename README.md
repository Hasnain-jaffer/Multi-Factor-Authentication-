# Multi-Factor Authentication (MFA) — MERN Stack

A full-stack Multi-Factor Authentication system built with the **MERN stack** (MongoDB, Express, React, Node.js). The project adds a second layer of identity verification on top of standard email/password login, helping protect user accounts from unauthorized access.

## ✨ Features

- 🔐 User registration & login with hashed passwords
- 📱 Multi-factor authentication on top of standard credentials
- 🔑 JWT-based session/token authentication
- ⚛️ React-based client interface for signup, login, and MFA verification
- 🌐 RESTful API built with Express and Node.js
- 🍃 MongoDB for persistent user data storage

> Note: Update this list with the exact MFA method used in your implementation (e.g., OTP via email, TOTP/authenticator app, SMS) so visitors know precisely how verification works.

## 🛠️ Tech Stack

**Frontend**
- React.js
- HTML / CSS

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication

## 📁 Project Structure

```
Multi-Factor-Authentication-/
├── Backend/        # Express server, API routes, models, controllers
├── client/         # React frontend application
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hasnain-jaffer/Multi-Factor-Authentication-.git
   cd Multi-Factor-Authentication-
   ```

2. **Install backend dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Variables

Create a `.env` file inside the `Backend` directory with the following (adjust keys to match what your code actually reads):

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
# Add email/SMS provider credentials here if MFA codes are sent externally
# EMAIL_USER=
# EMAIL_PASS=
```

### Running the App

**Start the backend server:**
```bash
cd Backend
npm start
```

**Start the frontend (in a separate terminal):**
```bash
cd client
npm start
```

The client will typically run on `http://localhost:3000` and the backend on `http://localhost:5000` (confirm against your actual config).

## 🔄 How It Works

1. User registers or logs in with email and password.
2. On successful credential check, the server triggers the second authentication factor.
3. User submits the MFA code/verification through the client.
4. Upon successful verification, the server issues a JWT and grants access.

> Replace this section with the precise flow implemented in your `Backend` controllers/routes, including any specific endpoint paths (e.g., `/api/auth/register`, `/api/auth/login`, `/api/auth/verify-otp`).

## 📌 Roadmap / To-Do

- [ ] Add password reset flow
- [ ] Add rate limiting on login/MFA attempts
- [ ] Add unit/integration tests
- [ ] Deploy live demo and add link here

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

## 📄 License

This project currently has no license specified. Consider adding one (e.g., MIT) so others know how they can use your code.

## 👤 Author

**Hasnain Jaffer**
GitHub: [@Hasnain-jaffer](https://github.com/Hasnain-jaffer)
