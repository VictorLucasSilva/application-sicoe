#!/bin/bash

###############################################################################
# SICOE - Monitoring Script (Real-time)
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
BLUE='\033[0;34m'
NC='\033[0m'

# Clear screen
clear

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}SICOE - Real-time Monitoring: $ENVIRONMENT${NC}"
echo -e "${BLUE}=======================================${NC}"
echo -e "${YELLOW}Press Ctrl+C to exit${NC}"
echo ""

# Load environment
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

# Monitoring loop
while true; do
    # Move cursor to top
    tput cup 4 0

    # Container status
    echo -e "${GREEN}Container Status:${NC}"
    echo "-----------------------------------"
    docker compose -f "$COMPOSE_FILE" ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
    echo ""

    # Resource usage
    echo -e "${GREEN}Resource Usage:${NC}"
    echo "-----------------------------------"
    docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
    echo ""

    # Health status
    echo -e "${GREEN}Health Status:${NC}"
    echo "-----------------------------------"

    # PostgreSQL
    echo -n "PostgreSQL: "
    if docker compose -f "$COMPOSE_FILE" exec -T postgres pg_isready -U ${DB_USERNAME} -d ${DB_DATABASE} > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Healthy${NC}"
    else
        echo -e "${RED}✗ Unhealthy${NC}"
    fi

    # Backend
    echo -n "Backend:    "
    BACKEND_PORT=${BACKEND_PORT:-3000}
    if curl -f -s "http://localhost:${BACKEND_PORT}/api/v1" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Healthy${NC}"
    else
        echo -e "${RED}✗ Unhealthy${NC}"
    fi

    # Frontend
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
    echo -e "${YELLOW}Last update: $(date '+%Y-%m-%d %H:%M:%S')${NC}"
    echo ""

    # Wait 5 seconds
    sleep 5
done
