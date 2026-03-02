#!/bin/bash

###############################################################################
# SICOE - API Testing Script
###############################################################################

set -e

# Check arguments
if [ $# -eq 0 ]; then
    echo "Usage: $0 <base-url>"
    echo "  Example: $0 http://localhost:3000"
    exit 1
fi

BASE_URL=$1
API_URL="${BASE_URL}/api/v1"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}SICOE - API Testing${NC}"
echo -e "${BLUE}=======================================${NC}"
echo -e "Target: ${API_URL}"
echo ""

TESTS_PASSED=0
TESTS_FAILED=0

# Helper function
test_endpoint() {
    local test_name=$1
    local method=$2
    local endpoint=$3
    local expected_code=$4
    local data=$5
    local token=$6

    echo -n "Testing: $test_name... "

    if [ "$method" == "GET" ]; then
        if [ -z "$token" ]; then
            RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "${API_URL}${endpoint}")
        else
            RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $token" "${API_URL}${endpoint}")
        fi
    else
        if [ -z "$token" ]; then
            RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" -H "Content-Type: application/json" -d "$data" "${API_URL}${endpoint}")
        else
            RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" -H "Content-Type: application/json" -H "Authorization: Bearer $token" -d "$data" "${API_URL}${endpoint}")
        fi
    fi

    if [ "$RESPONSE" == "$expected_code" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $RESPONSE)"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (Expected $expected_code, got $RESPONSE)"
        TESTS_FAILED=$((TESTS_FAILED + 1))
        return 1
    fi
}

# 1. Health Check
echo -e "${YELLOW}[1/6] Health Check Tests${NC}"
echo "-----------------------------------"
test_endpoint "API health endpoint" "GET" "" "200"
echo ""

# 2. Authentication Tests
echo -e "${YELLOW}[2/6] Authentication Tests${NC}"
echo "-----------------------------------"

test_endpoint "Login with invalid credentials" \
    "POST" \
    "/auth/login" \
    "401" \
    '{"username":"invalid","password":"invalid"}'

test_endpoint "Login without credentials" \
    "POST" \
    "/auth/login" \
    "400" \
    '{}'

test_endpoint "Access protected route without token" \
    "GET" \
    "/users" \
    "401"

# Try to login with admin (if exists)
LOGIN_RESPONSE=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"Admin@123"}' \
    "${API_URL}/auth/login")

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4 || echo "")

if [ ! -z "$TOKEN" ]; then
    echo -e "${GREEN}✓ Admin login successful${NC}"

    test_endpoint "Access protected route with valid token" \
        "GET" \
        "/users" \
        "200" \
        "" \
        "$TOKEN"
else
    echo -e "${YELLOW}⚠️  Admin user not available, skipping authenticated tests${NC}"
fi

echo ""

# 3. Users Endpoint Tests
echo -e "${YELLOW}[3/6] Users Endpoint Tests${NC}"
echo "-----------------------------------"

if [ ! -z "$TOKEN" ]; then
    test_endpoint "List users" \
        "GET" \
        "/users" \
        "200" \
        "" \
        "$TOKEN"

    test_endpoint "List users with pagination" \
        "GET" \
        "/users?page=1&limit=10" \
        "200" \
        "" \
        "$TOKEN"

    test_endpoint "List users with filters" \
        "GET" \
        "/users?name=admin" \
        "200" \
        "" \
        "$TOKEN"

    test_endpoint "Get user by ID (non-existent)" \
        "GET" \
        "/users/99999" \
        "404" \
        "" \
        "$TOKEN"
else
    echo -e "${YELLOW}⚠️  Skipping - no auth token${NC}"
fi

echo ""

# 4. Audit Endpoint Tests
echo -e "${YELLOW}[4/6] Audit Endpoint Tests${NC}"
echo "-----------------------------------"

if [ ! -z "$TOKEN" ]; then
    test_endpoint "List audit logs" \
        "GET" \
        "/audit" \
        "200" \
        "" \
        "$TOKEN"

    test_endpoint "List audit logs with pagination" \
        "GET" \
        "/audit?page=1&limit=10" \
        "200" \
        "" \
        "$TOKEN"

    test_endpoint "List audit logs with filters" \
        "GET" \
        "/audit?login=admin" \
        "200" \
        "" \
        "$TOKEN"
else
    echo -e "${YELLOW}⚠️  Skipping - no auth token${NC}"
fi

echo ""

# 5. Email Endpoint Tests
echo -e "${YELLOW}[5/6] Email Endpoint Tests${NC}"
echo "-----------------------------------"

if [ ! -z "$TOKEN" ]; then
    test_endpoint "List email logs" \
        "GET" \
        "/email" \
        "200" \
        "" \
        "$TOKEN"

    test_endpoint "List email logs with pagination" \
        "GET" \
        "/email?page=1&limit=10" \
        "200" \
        "" \
        "$TOKEN"
else
    echo -e "${YELLOW}⚠️  Skipping - no auth token${NC}"
fi

echo ""

# 6. Establishments Endpoint Tests
echo -e "${YELLOW}[6/6] Establishments Endpoint Tests${NC}"
echo "-----------------------------------"

if [ ! -z "$TOKEN" ]; then
    test_endpoint "List establishments" \
        "GET" \
        "/establishments" \
        "200" \
        "" \
        "$TOKEN"

    test_endpoint "List establishments with pagination" \
        "GET" \
        "/establishments?page=1&limit=10" \
        "200" \
        "" \
        "$TOKEN"
else
    echo -e "${YELLOW}⚠️  Skipping - no auth token${NC}"
fi

echo ""

# Summary
echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}API Test Summary${NC}"
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

if [ $SUCCESS_RATE -ge 90 ]; then
    echo -e "${GREEN}✓ All API tests passing${NC}"
    exit 0
elif [ $SUCCESS_RATE -ge 70 ]; then
    echo -e "${YELLOW}⚠️  Some API tests failing${NC}"
    exit 1
else
    echo -e "${RED}✗ Multiple API test failures${NC}"
    exit 1
fi
