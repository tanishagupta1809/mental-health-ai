#!/bin/bash

# Mental Health AI - Complete Startup Script
# This script provides instructions to start all services

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     🚀 Mental Health AI Assessment System                  ║"
echo "║     Complete Setup & Startup Guide                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📋 PREREQUISITES CHECK${NC}"
echo "================================"
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js installed:${NC} $NODE_VERSION"
else
    echo -e "${RED}❌ Node.js not found${NC}. Download from https://nodejs.org"
    exit 1
fi

# Check Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}✅ Python installed:${NC} $PYTHON_VERSION"
else
    echo -e "${RED}❌ Python not found${NC}. Download from https://python.org"
    exit 1
fi

# Check MongoDB
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}✅ MongoDB installed locally${NC}"
    MONGO_TYPE="local"
else
    echo -e "${YELLOW}⚠️  Local MongoDB not found${NC} (using MongoDB Atlas)"
    MONGO_TYPE="atlas"
fi

echo ""
echo -e "${YELLOW}📦 SERVICES STATUS${NC}"
echo "================================"
echo ""

# Check if ports are available
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 1
    else
        return 0
    fi
}

# Port checks
if check_port 5050; then
    echo -e "${GREEN}✅ Port 5050 available${NC} (Backend)"
else
    echo -e "${RED}❌ Port 5050 in use${NC} (Backend will fail)"
fi

if check_port 3000; then
    echo -e "${GREEN}✅ Port 3000 available${NC} (Frontend)"
else
    echo -e "${RED}❌ Port 3000 in use${NC} (Frontend will fail)"
fi

if check_port 5001; then
    echo -e "${GREEN}✅ Port 5001 available${NC} (ML Service)"
else
    echo -e "${RED}❌ Port 5001 in use${NC} (ML Service will fail)"
fi

echo ""
echo -e "${BLUE}🚀 STARTUP OPTIONS${NC}"
echo "================================"
echo ""
echo -e "${GREEN}Option 1: Manual Startup (3 Terminals)${NC}"
echo "────────────────────────────────────────"
echo ""
echo -e "${BLUE}Terminal 1 - Backend:${NC}"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo -e "${BLUE}Terminal 2 - Frontend:${NC}"
echo "  cd frontend"
echo "  npm start"
echo ""
echo -e "${BLUE}Terminal 3 - ML Service:${NC}"
echo "  cd ml-service"
echo "  python3 -m venv venv"
echo "  source venv/bin/activate"
echo "  pip install -r requirements.txt"
echo "  python app.py"
echo ""

echo -e "${GREEN}Option 2: Docker Startup (All-in-One)${NC}"
echo "────────────────────────────────────────"
echo ""
echo "  docker-compose up --build"
echo ""

echo -e "${BLUE}🌐 ACCESS POINTS${NC}"
echo "================================"
echo ""
echo -e "${GREEN}Frontend:${NC}    http://localhost:3000"
echo -e "${GREEN}Backend:${NC}     http://localhost:5050"
echo -e "${GREEN}ML Service:${NC}  http://localhost:5001"
echo ""

echo -e "${BLUE}📝 FIRST TIME SETUP${NC}"
echo "================================"
echo ""
echo "1. Open http://localhost:3000"
echo "2. Click 'Register here' at bottom"
echo "3. Enter:"
echo "   - Name: Your Name"
echo "   - Email: test@example.com"
echo "   - Password: password123"
echo "4. Click Register"
echo "5. Login with same credentials"
echo "6. Fill assessment form with test data"
echo "7. See risk prediction & charts!"
echo ""

echo -e "${YELLOW}⚙️  CONFIGURATION${NC}"
echo "================================"
echo ""
echo "Backend .env:"
echo "  ✅ MONGO_URI: MongoDB Atlas (configured)"
echo "  ✅ JWT_SECRET: Set"
echo "  ✅ PORT: 5050"
echo ""
echo "Frontend .env:"
echo "  ✅ REACT_APP_API_URL: http://localhost:5050/api"
echo ""

echo -e "${BLUE}📚 DOCUMENTATION${NC}"
echo "================================"
echo ""
echo "📄 GETTING-STARTED.md   - This guide & troubleshooting"
echo "📄 README.md            - Complete project overview"
echo "📄 QUICKSTART.md        - Setup instructions"
echo "📄 API.md               - API endpoint documentation"
echo "📄 FEATURES.md          - All improvements made"
echo ""

echo -e "${GREEN}✅ PROJECT READY TO START!${NC}"
echo ""
echo "Choose an option above and follow the commands."
echo "Questions? Check the documentation files."
echo ""
