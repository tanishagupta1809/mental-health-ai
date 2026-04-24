# Mental Health AI Assessment System

A full-stack MERN (MongoDB, Express, React, Node.js) application for mental health predictions and assessments.

## Features

- **User Authentication**: Secure register/login with JWT tokens
- **Mental Health Assessment**: Input stress, anxiety, depression, and sleep metrics
- **AI Predictions**: ML model predicts risk levels (Low, Moderate, High)
- **Interactive Dashboard**: Real-time charts and statistics using Recharts
- **Assessment History**: View all past assessments with detailed metrics
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop and mobile devices
- **Data Validation**: Comprehensive validation on frontend and backend

## Architecture

```
mental-health-ai/
├── backend/                 # Node.js + Express server
│   ├── controllers/        # Business logic
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth middleware
│   ├── server.js          # Express app setup
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── api/           # API client & services
│   │   ├── constants.js   # App constants
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
└── ml-service/            # Flask ML server
    └── app.py            # Prediction model
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Python 3.8+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Update .env with your values**
   ```
   MONGO_URI=mongodb://localhost:27017/mental-health-ai
   JWT_SECRET=your_secret_key_here
   PORT=5050
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start backend server**
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:5050

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Start React app**
   ```bash
   npm start
   ```
   App runs on http://localhost:3000

### ML Service Setup

1. **Navigate to ml-service directory**
   ```bash
   cd ml-service
   ```

2. **Create Python virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install flask flask-cors
   ```

4. **Start Flask server**
   ```bash
   python app.py
   ```
   Service runs on http://localhost:5001

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Assessments
- `POST /api/assessment` - Create new assessment
- `GET /api/assessment` - Get all assessments
- `GET /api/assessment/:id` - Get specific assessment
- `DELETE /api/assessment/:id` - Delete assessment
- `GET /api/assessment/statistics` - Get statistics

## Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/mental-health-ai
JWT_SECRET=change_this_secret_in_production
PORT=5050
FRONTEND_URL=http://localhost:3000
ML_SERVICE_URL=http://127.0.0.1:5001
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5050/api
```

## Assessment Metrics

Each assessment captures:
- **Sleep Hours** (0-24): Hours of sleep
- **Stress Level** (0-100): Self-reported stress
- **Anxiety Score** (0-100): Self-reported anxiety
- **Depression Score** (0-100): Self-reported depression

Risk classification:
- **Low**: Score < 100
- **Moderate**: Score 100-200
- **High**: Score > 200

## UI Features

- **Dashboard**: Overview with stats cards
- **Charts**: Line chart for trends, bar chart for metrics, pie chart for risk distribution
- **Assessment Form**: Intuitive input with sliders and text fields
- **History Table**: All past assessments with delete option
- **Dark Mode**: Toggle for light/dark theme
- **Responsive Grid**: Adapts to different screen sizes

##  Tech Stack

### Frontend
- React 19.2.4
- React Router 7.13.0
- Recharts 3.7.0
- Axios 1.13.5

### Backend
- Express 5.2.1
- MongoDB 9.2.1 (Mongoose)
- JWT (jsonwebtoken 9.0.3)
- Bcryptjs 3.0.3
- CORS 2.8.6

### ML Service
- Flask 2.x
- Flask-CORS

## Testing

```bash
# Frontend tests
cd frontend && npm test

# Backend tests (if configured)
cd backend && npm test
```

## Deployment

### Deploy Backend (Heroku/Render)
1. Create account on Heroku/Render
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Deploy Frontend (Vercel/Netlify)
1. Create account on Vercel/Netlify
2. Connect GitHub repository
3. Set REACT_APP_API_URL to backend URL
4. Deploy

## Project Structure Details

### Controllers
- **authController.js**: Register, login, profile management
- **assessmentController.js**: Create, read, delete assessments + statistics

### Models
- **User.js**: User schema with validation
- **Assessment.js**: Assessment schema with metrics

### API Routes
- **authRoutes.js**: Authentication endpoints
- **assessmentRoutes.js**: Assessment CRUD endpoints

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

