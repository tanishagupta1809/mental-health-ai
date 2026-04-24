#!/bin/bash

echo "🚀 Mental Health AI - Starting Services"
echo "========================================"
echo ""
echo "This will start all 3 services in new terminal windows."
echo "Make sure you have 3 terminal windows available."
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 SERVICES TO START:${NC}"
echo "1. Backend (Port 5050)"
echo "2. Frontend (Port 3000)"
echo "3. ML Service (Port 5001)"
echo ""

echo -e "${GREEN}✅ To start manually in separate terminals:${NC}"
echo ""
echo -e "${BLUE}Terminal 1 - Backend:${NC}"
echo "cd backend && npm run dev"
echo ""
echo -e "${BLUE}Terminal 2 - Frontend:${NC}"
echo "cd frontend && npm start"
echo ""
echo -e "${BLUE}Terminal 3 - ML Service:${NC}"
echo "cd ml-service"
echo "python3 -m venv venv"
echo "source venv/bin/activate"
echo "pip install -r requirements.txt"
echo "python app.py"
echo ""
echo -e "${GREEN}✅ To start all with Docker:${NC}"
echo "docker-compose up --build"
echo ""
echo -e "${GREEN}✅ Once all are running:${NC}"
echo "Open: http://localhost:3000"
echo ""
