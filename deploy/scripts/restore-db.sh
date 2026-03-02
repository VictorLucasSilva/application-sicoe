#!/bin/bash

###############################################################################
# SICOE - Database Restore Script
###############################################################################

set -e

# Check arguments
if [ $# -lt 2 ]; then
    echo "Usage: $0 <environment> <backup_file>"
    echo "  environment: dev, prod"
    echo "  backup_file: path to backup .sql.gz file"
    exit 1
fi

ENVIRONMENT=$1
BACKUP_FILE=$2

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${RED}======================================${NC}"
echo -e "${RED}WARNING: Database Restore${NC}"
echo -e "${RED}======================================${NC}"
echo -e "${YELLOW}Environment: ${ENVIRONMENT}${NC}"
echo -e "${YELLOW}Backup file: ${BACKUP_FILE}${NC}"
echo ""
echo -e "${RED}This will REPLACE the current database!${NC}"
read -p "Are you sure? (type 'yes' to continue): " -r
echo

if [[ ! $REPLY == "yes" ]]; then
    echo -e "${YELLOW}Restore cancelled.${NC}"
    exit 0
fi

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}Error: Backup file not found: ${BACKUP_FILE}${NC}"
    exit 1
fi

# Change to deploy directory
cd "$(dirname "$0")/../${ENVIRONMENT}"

# Load environment variables
if [ -f .env ]; then
    source .env
else
    echo -e "${RED}Error: .env file not found in ${ENVIRONMENT} directory${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Creating safety backup...${NC}"
SAFETY_BACKUP="backups/safety_backup_$(date +%Y%m%d_%H%M%S).sql"
docker compose -f "docker-compose.${ENVIRONMENT}.yml" exec -T postgres \
    pg_dump -U ${DB_USERNAME} ${DB_DATABASE} > "$SAFETY_BACKUP"
gzip "$SAFETY_BACKUP"
echo -e "${GREEN}✓ Safety backup created: ${SAFETY_BACKUP}.gz${NC}"

echo -e "${YELLOW}Step 2: Decompressing backup file...${NC}"
TEMP_SQL="/tmp/restore_temp.sql"
gunzip -c "$BACKUP_FILE" > "$TEMP_SQL"

echo -e "${YELLOW}Step 3: Dropping existing database...${NC}"
docker compose -f "docker-compose.${ENVIRONMENT}.yml" exec -T postgres \
    psql -U ${DB_USERNAME} -c "DROP DATABASE IF EXISTS ${DB_DATABASE};"

echo -e "${YELLOW}Step 4: Creating new database...${NC}"
docker compose -f "docker-compose.${ENVIRONMENT}.yml" exec -T postgres \
    psql -U ${DB_USERNAME} -c "CREATE DATABASE ${DB_DATABASE};"

echo -e "${YELLOW}Step 5: Restoring database...${NC}"
docker compose -f "docker-compose.${ENVIRONMENT}.yml" exec -T postgres \
    psql -U ${DB_USERNAME} -d ${DB_DATABASE} < "$TEMP_SQL"

# Clean up temp file
rm "$TEMP_SQL"

echo -e "${YELLOW}Step 6: Restarting backend...${NC}"
docker compose -f "docker-compose.${ENVIRONMENT}.yml" restart backend

echo ""
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}✓ Database restored successfully!${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo -e "Safety backup saved: ${SAFETY_BACKUP}.gz"
echo ""
