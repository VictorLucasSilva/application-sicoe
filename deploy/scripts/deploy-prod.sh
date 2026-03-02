#!/bin/bash

###############################################################################
# SICOE - Deploy to Production Environment
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}SICOE - Deploy to Production${NC}"
echo -e "${GREEN}======================================${NC}"

# Confirmation
echo -e "${RED}WARNING: You are about to deploy to PRODUCTION!${NC}"
read -p "Are you sure? (type 'yes' to continue): " -r
echo
if [[ ! $REPLY == "yes" ]]; then
    echo -e "${YELLOW}Deployment cancelled.${NC}"
    exit 0
fi

# Change to deploy directory
cd "$(dirname "$0")/../prod"

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}Error: .env file not found!${NC}"
    echo -e "${YELLOW}Please copy .env.example to .env and configure it.${NC}"
    exit 1
fi

# Load environment variables
source .env

echo -e "${YELLOW}Step 1: Creating database backup...${NC}"
BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"
docker compose -f docker-compose.prod.yml exec -T postgres pg_dump -U ${DB_USERNAME} ${DB_DATABASE} > "./backups/${BACKUP_FILE}"
echo -e "${GREEN}✓ Backup created: ${BACKUP_FILE}${NC}"

# Keep only last 7 backups
ls -t ./backups/backup_*.sql | tail -n +8 | xargs -r rm
echo -e "${GREEN}✓ Old backups cleaned up${NC}"

echo -e "${YELLOW}Step 2: Pulling latest images...${NC}"
docker compose -f docker-compose.prod.yml pull

echo -e "${YELLOW}Step 3: Stopping old containers...${NC}"
docker compose -f docker-compose.prod.yml down

echo -e "${YELLOW}Step 4: Starting services...${NC}"
docker compose -f docker-compose.prod.yml up -d

echo -e "${YELLOW}Step 5: Waiting for services to be healthy...${NC}"
sleep 60

# Check backend health
echo -e "${YELLOW}Checking backend health...${NC}"
RETRY_COUNT=0
MAX_RETRIES=10

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if docker compose -f docker-compose.prod.yml exec -T backend wget --spider -q http://localhost:3000/api/v1; then
        echo -e "${GREEN}✓ Backend is healthy${NC}"
        break
    else
        RETRY_COUNT=$((RETRY_COUNT+1))
        echo -e "${YELLOW}Attempt ${RETRY_COUNT}/${MAX_RETRIES} - Waiting...${NC}"
        sleep 10
    fi
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo -e "${RED}✗ Backend health check failed${NC}"
    echo -e "${RED}Rolling back to backup...${NC}"
    docker compose -f docker-compose.prod.yml logs backend
    exit 1
fi

# Check frontend health
echo -e "${YELLOW}Checking frontend health...${NC}"
if docker compose -f docker-compose.prod.yml exec -T frontend wget --spider -q http://localhost/; then
    echo -e "${GREEN}✓ Frontend is healthy${NC}"
else
    echo -e "${RED}✗ Frontend health check failed${NC}"
    docker compose -f docker-compose.prod.yml logs frontend
    exit 1
fi

echo -e "${YELLOW}Step 6: Running migrations...${NC}"
docker compose -f docker-compose.prod.yml exec -T backend npm run migration:run

echo -e "${YELLOW}Step 7: Cleaning up old images...${NC}"
docker image prune -f

echo ""
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}✓ Deployment completed successfully!${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo -e "Backend:  ${BACKEND_URL}"
echo -e "Frontend: ${FRONTEND_URL}"
echo ""
echo -e "Backup saved: ${BACKUP_FILE}"
echo ""
echo -e "To view logs:"
echo -e "  docker compose -f docker-compose.prod.yml logs -f"
echo ""
