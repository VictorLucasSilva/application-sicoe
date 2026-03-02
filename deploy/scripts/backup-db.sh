#!/bin/bash

###############################################################################
# SICOE - Database Backup Script
###############################################################################

set -e

# Check arguments
if [ $# -eq 0 ]; then
    echo "Usage: $0 <environment>"
    echo "  environment: dev, prod"
    exit 1
fi

ENVIRONMENT=$1
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="../${ENVIRONMENT}/backups"
BACKUP_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.sql"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Creating backup for ${ENVIRONMENT}...${NC}"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Change to deploy directory
cd "$(dirname "$0")/../${ENVIRONMENT}"

# Load environment variables
if [ -f .env ]; then
    source .env
else
    echo "Error: .env file not found in ${ENVIRONMENT} directory"
    exit 1
fi

# Create backup
docker compose -f "docker-compose.${ENVIRONMENT}.yml" exec -T postgres \
    pg_dump -U ${DB_USERNAME} ${DB_DATABASE} > "$BACKUP_FILE"

# Compress backup
gzip "$BACKUP_FILE"

echo -e "${GREEN}✓ Backup created: ${BACKUP_FILE}.gz${NC}"

# Keep only last 30 days of backups
find "$BACKUP_DIR" -name "backup_*.sql.gz" -mtime +30 -delete

echo -e "${GREEN}✓ Old backups cleaned up${NC}"
echo ""
echo "Backup size: $(du -h "${BACKUP_FILE}.gz" | cut -f1)"
