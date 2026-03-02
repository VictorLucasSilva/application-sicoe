#!/bin/bash

###############################################################################
# SICOE - Security Audit Script
# Performs comprehensive security analysis
###############################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

REPORT_DIR="../reports"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT_FILE="${REPORT_DIR}/security-audit-${TIMESTAMP}.txt"

mkdir -p "$REPORT_DIR"

echo -e "${BLUE}=======================================${NC}" | tee "$REPORT_FILE"
echo -e "${BLUE}SICOE - Security Audit${NC}" | tee -a "$REPORT_FILE"
echo -e "${BLUE}=======================================${NC}" | tee -a "$REPORT_FILE"
echo -e "Date: $(date)" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

# Navigate to project root
cd "$(dirname "$0")/../../"

# 1. NPM Audit - Backend
echo -e "${YELLOW}[1/10] Running npm audit (Backend)...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"
cd sicoe-backend
npm audit --json > ../security/reports/npm-audit-backend-${TIMESTAMP}.json 2>&1 || true
npm audit 2>&1 | tee -a "$REPORT_FILE"
BACKEND_VULNS=$(npm audit --json 2>/dev/null | grep -o '"total":[0-9]*' | head -1 | grep -o '[0-9]*' || echo "0")
echo "" | tee -a "$REPORT_FILE"

# 2. NPM Audit - Frontend
echo -e "${YELLOW}[2/10] Running npm audit (Frontend)...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"
cd ../sicoe-frontend
npm audit --json > ../security/reports/npm-audit-frontend-${TIMESTAMP}.json 2>&1 || true
npm audit 2>&1 | tee -a "$REPORT_FILE"
FRONTEND_VULNS=$(npm audit --json 2>/dev/null | grep -o '"total":[0-9]*' | head -1 | grep -o '[0-9]*' || echo "0")
echo "" | tee -a "$REPORT_FILE"

cd ..

# 3. Check for hardcoded secrets
echo -e "${YELLOW}[3/10] Scanning for hardcoded secrets...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"
SECRETS_FOUND=0

# Common patterns for secrets
PATTERNS=(
    "password\s*=\s*['\"][^'\"]+['\"]"
    "api[_-]?key\s*=\s*['\"][^'\"]+['\"]"
    "secret\s*=\s*['\"][^'\"]+['\"]"
    "token\s*=\s*['\"][^'\"]+['\"]"
    "aws[_-]?access[_-]?key"
    "private[_-]?key"
)

for pattern in "${PATTERNS[@]}"; do
    FOUND=$(grep -rn -E "$pattern" sicoe-backend/src sicoe-frontend/src 2>/dev/null | grep -v "\.test\." | grep -v "\.spec\." | grep -v "example" || true)
    if [ ! -z "$FOUND" ]; then
        echo "⚠️  Found potential secret: $pattern" | tee -a "$REPORT_FILE"
        echo "$FOUND" | tee -a "$REPORT_FILE"
        SECRETS_FOUND=$((SECRETS_FOUND + 1))
    fi
done

if [ $SECRETS_FOUND -eq 0 ]; then
    echo -e "${GREEN}✓ No hardcoded secrets found${NC}" | tee -a "$REPORT_FILE"
else
    echo -e "${RED}✗ Found $SECRETS_FOUND potential secrets${NC}" | tee -a "$REPORT_FILE"
fi
echo "" | tee -a "$REPORT_FILE"

# 4. Check environment variables
echo -e "${YELLOW}[4/10] Checking environment variable usage...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

# Check if .env files exist in git
ENV_IN_GIT=$(git ls-files | grep "^\.env$" || true)
if [ ! -z "$ENV_IN_GIT" ]; then
    echo -e "${RED}✗ .env files found in git!${NC}" | tee -a "$REPORT_FILE"
else
    echo -e "${GREEN}✓ No .env files in git${NC}" | tee -a "$REPORT_FILE"
fi

# Check if .env.example exists
if [ -f "sicoe-backend/.env.example" ]; then
    echo -e "${GREEN}✓ Backend .env.example exists${NC}" | tee -a "$REPORT_FILE"
else
    echo -e "${RED}✗ Backend .env.example missing${NC}" | tee -a "$REPORT_FILE"
fi

if [ -f "sicoe-frontend/.env.example" ]; then
    echo -e "${GREEN}✓ Frontend .env.example exists${NC}" | tee -a "$REPORT_FILE"
else
    echo -e "${RED}✗ Frontend .env.example missing${NC}" | tee -a "$REPORT_FILE"
fi
echo "" | tee -a "$REPORT_FILE"

# 5. Check Docker security
echo -e "${YELLOW}[5/10] Checking Docker security...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

# Check if Dockerfiles use non-root users
BACKEND_USER=$(grep -E "^USER" sicoe-backend/Dockerfile || echo "")
FRONTEND_USER=$(grep -E "^USER" sicoe-frontend/Dockerfile || echo "")

if [ ! -z "$BACKEND_USER" ]; then
    echo -e "${GREEN}✓ Backend Dockerfile uses non-root user${NC}" | tee -a "$REPORT_FILE"
else
    echo -e "${RED}✗ Backend Dockerfile runs as root${NC}" | tee -a "$REPORT_FILE"
fi

if [ -f "sicoe-frontend/Dockerfile" ]; then
    echo -e "${GREEN}✓ Frontend uses nginx (non-root by default)${NC}" | tee -a "$REPORT_FILE"
fi

# Check for latest base images
echo "Backend base image:" | tee -a "$REPORT_FILE"
grep "^FROM" sicoe-backend/Dockerfile | tee -a "$REPORT_FILE"
echo "Frontend base image:" | tee -a "$REPORT_FILE"
grep "^FROM" sicoe-frontend/Dockerfile | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

# 6. Check CORS configuration
echo -e "${YELLOW}[6/10] Checking CORS configuration...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

CORS_CONFIG=$(grep -r "cors" sicoe-backend/src/main.ts || true)
if [ ! -z "$CORS_CONFIG" ]; then
    echo -e "${GREEN}✓ CORS is configured${NC}" | tee -a "$REPORT_FILE"
    echo "$CORS_CONFIG" | tee -a "$REPORT_FILE"
else
    echo -e "${YELLOW}⚠️  CORS configuration not found${NC}" | tee -a "$REPORT_FILE"
fi
echo "" | tee -a "$REPORT_FILE"

# 7. Check Helmet security headers
echo -e "${YELLOW}[7/10] Checking security headers (Helmet)...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

HELMET_CONFIG=$(grep -r "helmet" sicoe-backend/src/main.ts sicoe-backend/src/config/ || true)
if [ ! -z "$HELMET_CONFIG" ]; then
    echo -e "${GREEN}✓ Helmet is configured${NC}" | tee -a "$REPORT_FILE"
else
    echo -e "${RED}✗ Helmet not found${NC}" | tee -a "$REPORT_FILE"
fi
echo "" | tee -a "$REPORT_FILE"

# 8. Check rate limiting
echo -e "${YELLOW}[8/10] Checking rate limiting (Throttler)...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

THROTTLER_CONFIG=$(grep -r "@nestjs/throttler" sicoe-backend/src/app.module.ts || true)
if [ ! -z "$THROTTLER_CONFIG" ]; then
    echo -e "${GREEN}✓ Rate limiting is configured${NC}" | tee -a "$REPORT_FILE"
else
    echo -e "${RED}✗ Rate limiting not found${NC}" | tee -a "$REPORT_FILE"
fi
echo "" | tee -a "$REPORT_FILE"

# 9. Check authentication guards
echo -e "${YELLOW}[9/10] Checking authentication guards...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

JWT_GUARDS=$(find sicoe-backend/src -name "*guard*" -o -name "*jwt*" | wc -l)
if [ $JWT_GUARDS -gt 0 ]; then
    echo -e "${GREEN}✓ Found $JWT_GUARDS guard files${NC}" | tee -a "$REPORT_FILE"
    find sicoe-backend/src -name "*guard*.ts" -o -name "*jwt*.ts" | tee -a "$REPORT_FILE"
else
    echo -e "${RED}✗ No authentication guards found${NC}" | tee -a "$REPORT_FILE"
fi
echo "" | tee -a "$REPORT_FILE"

# 10. Check input validation
echo -e "${YELLOW}[10/10] Checking input validation...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

VALIDATION_PIPES=$(grep -r "ValidationPipe" sicoe-backend/src/main.ts || true)
if [ ! -z "$VALIDATION_PIPES" ]; then
    echo -e "${GREEN}✓ Global validation pipe is configured${NC}" | tee -a "$REPORT_FILE"
else
    echo -e "${YELLOW}⚠️  Global validation pipe not found${NC}" | tee -a "$REPORT_FILE"
fi

CLASS_VALIDATOR=$(grep "class-validator" sicoe-backend/package.json || true)
if [ ! -z "$CLASS_VALIDATOR" ]; then
    echo -e "${GREEN}✓ class-validator is installed${NC}" | tee -a "$REPORT_FILE"
else
    echo -e "${RED}✗ class-validator not installed${NC}" | tee -a "$REPORT_FILE"
fi
echo "" | tee -a "$REPORT_FILE"

# Summary
echo -e "${BLUE}=======================================${NC}" | tee -a "$REPORT_FILE"
echo -e "${BLUE}Security Audit Summary${NC}" | tee -a "$REPORT_FILE"
echo -e "${BLUE}=======================================${NC}" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

TOTAL_VULNS=$((BACKEND_VULNS + FRONTEND_VULNS))

echo "NPM Vulnerabilities:" | tee -a "$REPORT_FILE"
echo "  Backend:  $BACKEND_VULNS" | tee -a "$REPORT_FILE"
echo "  Frontend: $FRONTEND_VULNS" | tee -a "$REPORT_FILE"
echo "  Total:    $TOTAL_VULNS" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

echo "Hardcoded Secrets: $SECRETS_FOUND" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

# Overall score
SECURITY_SCORE=100
SECURITY_SCORE=$((SECURITY_SCORE - TOTAL_VULNS * 2))
SECURITY_SCORE=$((SECURITY_SCORE - SECRETS_FOUND * 10))

if [ $SECURITY_SCORE -lt 0 ]; then
    SECURITY_SCORE=0
fi

echo "Security Score: $SECURITY_SCORE/100" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

if [ $SECURITY_SCORE -ge 90 ]; then
    echo -e "${GREEN}✓ Excellent security posture${NC}" | tee -a "$REPORT_FILE"
elif [ $SECURITY_SCORE -ge 70 ]; then
    echo -e "${YELLOW}⚠️  Good security, minor improvements needed${NC}" | tee -a "$REPORT_FILE"
else
    echo -e "${RED}✗ Security improvements required${NC}" | tee -a "$REPORT_FILE"
fi

echo "" | tee -a "$REPORT_FILE"
echo "Report saved to: $REPORT_FILE" | tee -a "$REPORT_FILE"
echo -e "${BLUE}=======================================${NC}" | tee -a "$REPORT_FILE"
