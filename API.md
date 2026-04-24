# 🔌 API Documentation

## Base URL
```
http://localhost:5050/api
```

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: <token>
```

---

## 👤 Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

### 2. Login User
**POST** `/auth/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 3. Get Current User
**GET** `/auth/me` (Protected)

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "gender": "Male",
    "bio": "Mental health advocate",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 4. Update Profile
**PUT** `/auth/profile` (Protected)

**Request:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Updated",
    "email": "john.updated@example.com"
  }
}
```

---

## 📊 Assessment Endpoints

### 1. Create New Assessment
**POST** `/assessment` (Protected)

**Request:**
```json
{
  "sleep_hours": 7.5,
  "stress_level": 45,
  "anxiety_score": 50,
  "depression_score": 35,
  "notes": "Feeling better this week"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Assessment created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "sleep_hours": 7.5,
    "stress_level": 45,
    "anxiety_score": 50,
    "depression_score": 35,
    "risk_level": "Low",
    "notes": "Feeling better this week",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "All fields must be valid numbers"
}
```

---

### 2. Get All Assessments
**GET** `/assessment?limit=50&sortBy=createdAt` (Protected)

**Query Parameters:**
- `limit`: Number of results (default: 50)
- `sortBy`: Sort field (default: createdAt)

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439011",
      "sleep_hours": 7.5,
      "stress_level": 45,
      "anxiety_score": 50,
      "depression_score": 35,
      "risk_level": "Low",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 3. Get Single Assessment
**GET** `/assessment/:id` (Protected)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe"
    },
    "sleep_hours": 7.5,
    "stress_level": 45,
    "anxiety_score": 50,
    "depression_score": 35,
    "risk_level": "Low",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error (403):**
```json
{
  "success": false,
  "message": "Unauthorized to view this assessment"
}
```

---

### 4. Delete Assessment
**DELETE** `/assessment/:id` (Protected)

**Response (200):**
```json
{
  "success": true,
  "message": "Assessment deleted successfully"
}
```

---

### 5. Get Assessment Statistics
**GET** `/assessment/statistics` (Protected)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalAssessments": 10,
    "averageStress": "45.5",
    "averageAnxiety": "48.2",
    "averageDepression": "40.1",
    "averageSleep": "7.2",
    "riskDistribution": {
      "low": 6,
      "moderate": 3,
      "high": 1
    },
    "latestAssessment": {
      "_id": "507f1f77bcf86cd799439012",
      "stress_level": 50,
      "risk_level": "Moderate"
    }
  }
}
```

---

## 🧠 ML Service Endpoints

### Base URL
```
http://localhost:5001
```

### 1. Single Prediction
**POST** `/predict`

**Request:**
```json
{
  "stress_level": 45,
  "anxiety_score": 50,
  "depression_score": 35,
  "sleep_hours": 7.5
}
```

**Response (200):**
```json
{
  "success": true,
  "prediction": {
    "risk_level": "Low",
    "weighted_score": 42.5,
    "sleep_quality": 0
  },
  "input": {
    "stress_level": 45,
    "anxiety_score": 50,
    "depression_score": 35,
    "sleep_hours": 7.5
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 2. Batch Prediction
**POST** `/batch-predict`

**Request:**
```json
{
  "assessments": [
    {
      "stress_level": 45,
      "anxiety_score": 50,
      "depression_score": 35,
      "sleep_hours": 7.5
    },
    {
      "stress_level": 80,
      "anxiety_score": 75,
      "depression_score": 70,
      "sleep_hours": 5
    }
  ]
}
```

**Response (200):**
```json
{
  "success": true,
  "predictions": [
    {
      "risk_level": "Low",
      "weighted_score": 42.5,
      "sleep_quality": 0
    },
    {
      "risk_level": "High",
      "weighted_score": 75.5,
      "sleep_quality": 20
    }
  ],
  "count": 2,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 3. Service Info
**GET** `/info`

**Response (200):**
```json
{
  "service": "Mental Health Prediction Service",
  "version": "1.0.0",
  "model": {
    "type": "Weighted Risk Assessment",
    "weights": {
      "stress": 0.35,
      "anxiety": 0.35,
      "depression": 0.20,
      "sleep": 0.10
    },
    "risk_levels": ["Low", "Moderate", "High"]
  }
}
```

---

## 🔄 Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

## 📊 Risk Level Calculation

The ML service uses a weighted scoring system:

- **Stress Level**: 35% weight (0-100)
- **Anxiety Score**: 35% weight (0-100)
- **Depression Score**: 20% weight (0-100)
- **Sleep Quality**: 10% weight (0-30 based on hours)

**Risk Levels:**
- **Low**: Weighted score < 30
- **Moderate**: Weighted score 30-60
- **High**: Weighted score > 60

---

## 🔐 Error Response Format

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- IDs are MongoDB ObjectIDs
- All numeric fields are numbers
- Dates are ISO strings
- Protected endpoints require valid JWT token

---

For more information, see [README.md](../README.md) or [QUICKSTART.md](../QUICKSTART.md)
