# 🚀 Quick Start Guide - Mental Health AI Assessment System

## 📋 Prerequisites

Before starting, ensure you have installed:
- **Node.js** (v14+) - [Download](https://nodejs.org)
- **MongoDB** (local or cloud) - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [Local Install](https://docs.mongodb.com/manual/installation/)
- **Python** (v3.8+) - [Download](https://www.python.org)
- **Git** (optional) - [Download](https://git-scm.com)

## 🛠️ Setup Instructions

### Option 1: Manual Setup (Recommended for Development)

#### Step 1: Setup MongoDB

**Local MongoDB:**
```bash
# macOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo apt-get install -y mongodb

# Windows
# Download from: https://www.mongodb.com/try/download/community
```

**Or use MongoDB Atlas (Cloud):**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster
4. Get connection string (format: `mongodb+srv://user:password@cluster.mongodb.net/database`)

#### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your MongoDB URI
# MONGO_URI=mongodb://localhost:27017/mental-health-ai
# JWT_SECRET=your_secret_key_change_in_production

# Start backend server
npm run dev
# Backend running on http://localhost:5050
```

#### Step 3: Frontend Setup

```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
# REACT_APP_API_URL=http://localhost:5050/api

# Start React app
npm start
# Frontend running on http://localhost:3000
```

#### Step 4: ML Service Setup

```bash
# In another new terminal, navigate to ml-service
cd ml-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# macOS/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
# ML Service running on http://localhost:5001
```

### Option 2: Docker Setup (Production-like)

```bash
# Ensure Docker and Docker Compose are installed

# Build and start all services
docker-compose up --build

# Verify all services:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:5050
# - ML Service: http://localhost:5001
# - MongoDB: localhost:27017
```

## ✅ Verification

### Check Backend
```bash
curl http://localhost:5050/
# Response: {"message": "Mental Health API Running", ...}
```

### Check ML Service
```bash
curl http://localhost:5001/
# Response: {"message": "Mental Health ML Service Running", ...}
```

### Check Frontend
Open http://localhost:3000 in your browser

## 📝 First Time Usage

1. **Navigate to Login Page** (http://localhost:3000)
2. **Register New Account**
   - Click "Register here" link
   - Fill in Name, Email, Password
   - Click "Register"
3. **Login**
   - Email: your registered email
   - Password: your password
   - Click "Login"
4. **Go to Dashboard**
   - Fill in assessment metrics:
     - Sleep Hours: 0-24
     - Stress Level: 0-100
     - Anxiety Score: 0-100
     - Depression Score: 0-100
   - Click "Submit Assessment"
5. **View Results**
   - See your risk level
   - View charts and statistics
   - Check assessment history

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: MongoServerError: connect ECONNREFUSED 127.0.0.1:27017

Solution:
1. Check MongoDB is running: brew services list (macOS)
2. Start MongoDB: brew services start mongodb-community
3. Or use MongoDB Atlas connection string
```

### CORS Error
```
Error: Access to XMLHttpRequest blocked by CORS policy

Solution:
1. Ensure backend is running on http://localhost:5050
2. Check FRONTEND_URL in backend .env
3. Restart backend: npm run dev
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5050

Solution:
# Find and kill process using port
# macOS/Linux:
lsof -i :5050
kill -9 <PID>

# Windows:
netstat -ano | findstr :5050
taskkill /PID <PID> /F
```

### Frontend Not Connecting to Backend
```
Solution:
1. Verify backend is running: curl http://localhost:5050
2. Check REACT_APP_API_URL in frontend/.env
3. Clear browser cache: Ctrl+Shift+Delete
4. Restart frontend: npm start
```

## 📊 API Testing

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5050/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5050/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Create Assessment:**
```bash
curl -X POST http://localhost:5050/api/assessment \
  -H "Content-Type: application/json" \
  -H "Authorization: <your_token>" \
  -d '{
    "sleep_hours": 7,
    "stress_level": 50,
    "anxiety_score": 45,
    "depression_score": 40
  }'
```

### Using Postman
1. Import collection from files (if available)
2. Set environment variables token
3. Test each endpoint

## 🔐 Security Notes

⚠️ **Before Production:**
1. Change JWT_SECRET in backend/.env
2. Enable MongoDB Atlas IP whitelist
3. Use HTTPS for frontend
4. Add rate limiting to APIs
5. Implement proper error logging
6. Hide sensitive data from client

## 📦 Project Structure

```
mental-health-ai/
├── backend/
│   ├── controllers/      # Business logic
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth, validation
│   ├── server.js        # Express setup
│   ├── package.json
│   ├── .env             # Environment variables
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/       # Login, Register, Dashboard
│   │   ├── api/         # API client & services
│   │   ├── constants.js # App constants & colors
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── .env
│   └── Dockerfile
├── ml-service/
│   ├── app.py           # Flask app & model
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml   # Docker orchestration
└── README.md           # Main documentation
```

## 🆘 Getting Help

1. **Check logs:**
   - Backend: Terminal where `npm run dev` is running
   - Frontend: Browser console (F12)
   - ML Service: Terminal where `python app.py` is running

2. **Common issues:** See Troubleshooting section above

3. **Submit issue:** Create GitHub issue with:
   - Error message
   - Steps to reproduce
   - Environment info

## 📚 Documentation

- [API Documentation](./docs/API.md) - Full API reference
- [Architecture](./docs/ARCHITECTURE.md) - System design
- [Deployment Guide](./docs/DEPLOYMENT.md) - Production setup

## 🎓 Project for Teacher Presentation

This project demonstrates:
- ✅ Full-stack MERN development
- ✅ Database design & MongoDB
- ✅ RESTful API design
- ✅ Authentication with JWT
- ✅ React state management
- ✅ Data visualization with charts
- ✅ Form validation
- ✅ Error handling
- ✅ Responsive design
- ✅ Docker containerization

---

**Happy coding! 🚀**
