#!/bin/bash

###############################################################################
# SICOE - Health Check Script
###############################################################################

# Check arguments
if [ $# -eq 0 ]; then
    echo "Usage: $0 <environment>"
    echo "  environment: dev, prod, local"
    exit 1
fi

ENVIRONMENT=$1

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "======================================="
echo "SICOE - Health Check: $ENVIRONMENT"
echo "======================================="
echo ""

# Load environment variables
if [ "$ENVIRONMENT" == "local" ]; then
    cd "$(dirname "$0")/../../sicoe-local"
    COMPOSE_FILE="docker-compose.yml"
else
    cd "$(dirname "$0")/../${ENVIRONMENT}"
    COMPOSE_FILE="docker-compose.${ENVIRONMENT}.yml"
fi

if [ -f .env ]; then
    source .env
else
    echo -e "${RED}Error: .env file not found${NC}"
    exit 1
fi

# Check Docker services
echo "1. Docker Services Status:"
echo "-----------------------------------"
docker compose -f "$COMPOSE_FILE" ps

echo ""
echo "2. Health Checks:"
echo "-----------------------------------"

# Check PostgreSQL
echo -n "PostgreSQL: "
if docker compose -f "$COMPOSE_FILE" exec -T postgres pg_isready -U ${DB_USERNAME} -d ${DB_DATABASE} > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Healthy${NC}"
else
    echo -e "${RED}✗ Unhealthy${NC}"
fi

# Check Backend
echo -n "Backend:    "
BACKEND_PORT=${BACKEND_PORT:-3000}
if curl -f -s "http://localhost:${BACKEND_PORT}/api/v1" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Healthy${NC}"
else
    echo -e "${RED}✗ Unhealthy${NC}"
fi

# Check Frontend
echo -n "Frontend:   "
FRONTEND_PORT=${FRONTEND_PORT:-5173}
if [ "$ENVIRONMENT" == "local" ]; then
    CHECK_PORT=$FRONTEND_PORT
else
    CHECK_PORT=80
fi

if curl -f -s "http://localhost:${CHECK_PORT}/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Healthy${NC}"
else
    echo -e "${RED}✗ Unhealthy${NC}"
fi

echo ""
echo "3. Resource Usage:"
echo "-----------------------------------"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"

echo ""
echo "4. Disk Usage:"
echo "-----------------------------------"
df -h / | tail -n 1
docker system df

echo ""
echo "5. Recent Logs (last 10 lines):"
echo "-----------------------------------"
echo "Backend:"
docker compose -f "$COMPOSE_FILE" logs --tail=10 backend | tail -n 10
echo ""
echo "Frontend:"
docker compose -f "$COMPOSE_FILE" logs --tail=10 frontend | tail -n 10

echo ""
echo "======================================="
echo "Health Check Complete"
echo "======================================="
