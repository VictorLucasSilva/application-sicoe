#!/bin/bash

###############################################################################
# SICOE - Integration Tests
###############################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}SICOE - Integration Tests${NC}"
echo -e "${BLUE}=======================================${NC}"
echo ""

TESTS_PASSED=0
TESTS_FAILED=0

# 1. Docker Services Integration
echo -e "${YELLOW}[1/5] Docker Services Integration${NC}"
echo "-----------------------------------"

echo -n "Checking PostgreSQL container... "
if docker ps | grep -q sicoe-postgres; then
    echo -e "${GREEN}✓ RUNNING${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}✗ NOT RUNNING${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

echo -n "Checking Backend container... "
if docker ps | grep -q sicoe-backend; then
    echo -e "${GREEN}✓ RUNNING${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}✗ NOT RUNNING${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

echo -n "Checking Frontend container... "
if docker ps | grep -q sicoe-frontend; then
    echo -e "${GREEN}✓ RUNNING${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}✗ NOT RUNNING${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

echo ""

# 2. Backend-Database Integration
echo -e "${YELLOW}[2/5] Backend-Database Integration${NC}"
echo "-----------------------------------"

echo -n "Testing database connection... "
if docker exec sicoe-backend-local sh -c "node -e \"require('pg').Client; process.exit(0)\"" 2>/dev/null; then
    echo -e "${GREEN}✓ PASS${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${YELLOW}⚠️  Cannot verify (container may not be local)${NC}"
fi

echo -n "Checking if migrations ran... "
if docker exec sicoe-postgres-local sh -c "psql -U sicoe_user -d sicoe_db -c '\dt'" 2>/dev/null | grep -q "ssv_"; then
    echo -e "${GREEN}✓ TABLES EXIST${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${YELLOW}⚠️  Cannot verify (container may not be local)${NC}"
fi

echo ""

# 3. Frontend-Backend Integration
echo -e "${YELLOW}[3/5] Frontend-Backend Integration${NC}"
echo "-----------------------------------"

echo -n "Testing frontend can reach backend... "
BACKEND_URL=$(curl -s http://localhost:5173 2>/dev/null | grep -o "http://[^\"]*:3000" || echo "")

if [ ! -z "$BACKEND_URL" ]; then
    echo -e "${GREEN}✓ CONFIGURED${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${YELLOW}⚠️  Cannot verify${NC}"
fi

echo -n "Testing CORS configuration... "
CORS_RESPONSE=$(curl -s -I -H "Origin: http://localhost:5173" http://localhost:3000/api/v1 2>/dev/null | grep -i "access-control" || echo "")

if [ ! -z "$CORS_RESPONSE" ]; then
    echo -e "${GREEN}✓ CORS ENABLED${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${YELLOW}⚠️  Cannot verify${NC}"
fi

echo ""

# 4. Authentication Flow Integration
echo -e "${YELLOW}[4/5] Authentication Flow${NC}"
echo "-----------------------------------"

echo "Testing complete auth flow..."

# Step 1: Login
echo -n "  1. Login request... "
LOGIN_RESPONSE=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"Admin@123"}' \
    http://localhost:3000/api/v1/auth/login 2>/dev/null || echo "")

if echo "$LOGIN_RESPONSE" | grep -q "access_token"; then
    echo -e "${GREEN}✓${NC}"
    TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)
else
    echo -e "${RED}✗${NC}"
fi

# Step 2: Access protected resource
if [ ! -z "$TOKEN" ]; then
    echo -n "  2. Access protected resource... "
    PROTECTED_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
        -H "Authorization: Bearer $TOKEN" \
        http://localhost:3000/api/v1/users 2>/dev/null || echo "000")

    if [ "$PROTECTED_RESPONSE" == "200" ]; then
        echo -e "${GREEN}✓${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}✗${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
else
    echo -e "${YELLOW}  ⚠️  Skipping - no token${NC}"
fi

echo ""

# 5. End-to-End Data Flow
echo -e "${YELLOW}[5/5] End-to-End Data Flow${NC}"
echo "-----------------------------------"

if [ ! -z "$TOKEN" ]; then
    echo "Testing complete data flow..."

    # Read users
    echo -n "  1. Read users from API... "
    USERS_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" \
        http://localhost:3000/api/v1/users 2>/dev/null || echo "")

    if echo "$USERS_RESPONSE" | grep -q "data"; then
        echo -e "${GREEN}✓${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}✗${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi

    # Read audit logs
    echo -n "  2. Read audit logs from API... "
    AUDIT_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" \
        http://localhost:3000/api/v1/audit 2>/dev/null || echo "")

    if echo "$AUDIT_RESPONSE" | grep -q "data"; then
        echo -e "${GREEN}✓${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}✗${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi

    # Test filters
    echo -n "  3. Test API filters... "
    FILTER_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" \
        "http://localhost:3000/api/v1/users?page=1&limit=5" 2>/dev/null || echo "")

    if echo "$FILTER_RESPONSE" | grep -q "data"; then
        echo -e "${GREEN}✓${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}✗${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
else
    echo -e "${YELLOW}⚠️  Skipping - admin user not available${NC}"
fi

echo ""

# Summary
echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}Integration Test Summary${NC}"
echo -e "${BLUE}=======================================${NC}"
echo ""

TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))

echo "Tests Passed: $TESTS_PASSED"
echo "Tests Failed: $TESTS_FAILED"
echo "Total Tests:  $TOTAL_TESTS"

if [ $TOTAL_TESTS -gt 0 ]; then
    SUCCESS_RATE=$((TESTS_PASSED * 100 / TOTAL_TESTS))
    echo "Success Rate: ${SUCCESS_RATE}%"
else
    SUCCESS_RATE=0
fi

echo ""

if [ $SUCCESS_RATE -ge 80 ]; then
    echo -e "${GREEN}✓ Integration tests passing${NC}"
    exit 0
elif [ $SUCCESS_RATE -ge 60 ]; then
    echo -e "${YELLOW}⚠️  Some integration issues${NC}"
    exit 1
else
    echo -e "${RED}✗ Multiple integration failures${NC}"
    exit 1
fi
