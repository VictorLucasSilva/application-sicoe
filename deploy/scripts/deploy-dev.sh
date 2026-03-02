#!/bin/bash

###############################################################################
# SICOE - Deploy to Development Environment
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}SICOE - Deploy to Development${NC}"
echo -e "${GREEN}======================================${NC}"

# Change to deploy directory
cd "$(dirname "$0")/../dev"

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}Error: .env file not found!${NC}"
    echo -e "${YELLOW}Please copy .env.example to .env and configure it.${NC}"
    exit 1
fi

# Load environment variables
source .env

echo -e "${YELLOW}Step 1: Pulling latest images...${NC}"
docker compose -f docker-compose.dev.yml pull

echo -e "${YELLOW}Step 2: Stopping old containers...${NC}"
docker compose -f docker-compose.dev.yml down

echo -e "${YELLOW}Step 3: Starting services...${NC}"
docker compose -f docker-compose.dev.yml up -d

echo -e "${YELLOW}Step 4: Waiting for services to be healthy...${NC}"
sleep 30

# Check backend health
echo -e "${YELLOW}Checking backend health...${NC}"
if docker compose -f docker-compose.dev.yml exec -T backend wget --spider -q http://localhost:3000/api/v1; then
    echo -e "${GREEN}✓ Backend is healthy${NC}"
else
    echo -e "${RED}✗ Backend health check failed${NC}"
    docker compose -f docker-compose.dev.yml logs backend
    exit 1
fi

# Check frontend health
echo -e "${YELLOW}Checking frontend health...${NC}"
if docker compose -f docker-compose.dev.yml exec -T frontend wget --spider -q http://localhost/; then
    echo -e "${GREEN}✓ Frontend is healthy${NC}"
else
    echo -e "${RED}✗ Frontend health check failed${NC}"
    docker compose -f docker-compose.dev.yml logs frontend
    exit 1
fi

echo -e "${YELLOW}Step 5: Running migrations...${NC}"
docker compose -f docker-compose.dev.yml exec -T backend npm run migration:run || echo "No migrations to run"

echo -e "${YELLOW}Step 6: Cleaning up old images...${NC}"
docker image prune -f

echo ""
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}✓ Deployment completed successfully!${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo -e "Backend:  ${BACKEND_URL}"
echo -e "Frontend: ${FRONTEND_URL}"
echo ""
echo -e "To view logs:"
echo -e "  docker compose -f docker-compose.dev.yml logs -f"
echo ""
