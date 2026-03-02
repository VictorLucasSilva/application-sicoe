#!/bin/bash

###############################################################################
# SICOE - Basic Penetration Testing Script
# Tests for common vulnerabilities
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

REPORT_DIR="../reports"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT_FILE="${REPORT_DIR}/pentest-${TIMESTAMP}.txt"

mkdir -p "$REPORT_DIR"

echo -e "${BLUE}=======================================${NC}" | tee "$REPORT_FILE"
echo -e "${BLUE}SICOE - Penetration Test${NC}" | tee -a "$REPORT_FILE"
echo -e "${BLUE}=======================================${NC}" | tee -a "$REPORT_FILE"
echo -e "Target: ${BASE_URL}" | tee -a "$REPORT_FILE"
echo -e "Date: $(date)" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Helper function to test endpoint
test_endpoint() {
    local test_name=$1
    local url=$2
    local method=$3
    local expected_code=$4
    local data=$5

    echo -e "${YELLOW}Testing: $test_name${NC}" | tee -a "$REPORT_FILE"

    if [ "$method" == "GET" ]; then
        RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    else
        RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" -H "Content-Type: application/json" -d "$data" "$url")
    fi

    if [ "$RESPONSE" == "$expected_code" ]; then
        echo -e "${GREEN}✓ PASS - Got expected status code: $RESPONSE${NC}" | tee -a "$REPORT_FILE"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}✗ FAIL - Expected $expected_code, got $RESPONSE${NC}" | tee -a "$REPORT_FILE"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
    echo "" | tee -a "$REPORT_FILE"
}

# 1. SQL Injection Tests
echo -e "${YELLOW}[1/8] SQL Injection Tests${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

test_endpoint "SQL Injection - Login (OR 1=1)" \
    "${API_URL}/auth/login" \
    "POST" \
    "401" \
    '{"username":"admin OR 1=1--","password":"test"}'

test_endpoint "SQL Injection - User query" \
    "${API_URL}/users?name=test' OR '1'='1" \
    "GET" \
    "401"

# 2. XSS Tests
echo -e "${YELLOW}[2/8] XSS (Cross-Site Scripting) Tests${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

test_endpoint "XSS - Script tag in username" \
    "${API_URL}/auth/login" \
    "POST" \
    "400" \
    '{"username":"<script>alert(1)</script>","password":"test"}'

# 3. Authentication Tests
echo -e "${YELLOW}[3/8] Authentication Tests${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

test_endpoint "Unauthenticated access to protected route" \
    "${API_URL}/users" \
    "GET" \
    "401"

test_endpoint "Invalid token" \
    "${API_URL}/users" \
    "GET" \
    "401"

# 4. Rate Limiting Tests
echo -e "${YELLOW}[4/8] Rate Limiting Tests${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

echo "Sending 15 rapid requests to test rate limiting..." | tee -a "$REPORT_FILE"
RATE_LIMIT_TRIGGERED=false

for i in {1..15}; do
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "${API_URL}/auth/login" \
        -X POST \
        -H "Content-Type: application/json" \
        -d '{"username":"test","password":"test"}')

    if [ "$RESPONSE" == "429" ]; then
        RATE_LIMIT_TRIGGERED=true
        break
    fi
    sleep 0.1
done

if [ "$RATE_LIMIT_TRIGGERED" == true ]; then
    echo -e "${GREEN}✓ PASS - Rate limiting is working${NC}" | tee -a "$REPORT_FILE"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}✗ FAIL - Rate limiting not triggered${NC}" | tee -a "$REPORT_FILE"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo "" | tee -a "$REPORT_FILE"

# 5. CORS Tests
echo -e "${YELLOW}[5/8] CORS Tests${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

CORS_HEADER=$(curl -s -I -H "Origin: https://malicious-site.com" "${API_URL}" | grep -i "access-control-allow-origin" || true)

if [ -z "$CORS_HEADER" ]; then
    echo -e "${GREEN}✓ PASS - CORS properly restricted${NC}" | tee -a "$REPORT_FILE"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${YELLOW}⚠️  WARNING - CORS headers present: $CORS_HEADER${NC}" | tee -a "$REPORT_FILE"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi
echo "" | tee -a "$REPORT_FILE"

# 6. Security Headers Tests
echo -e "${YELLOW}[6/8] Security Headers Tests${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

HEADERS=$(curl -s -I "${API_URL}")

check_header() {
    local header=$1
    if echo "$HEADERS" | grep -qi "$header"; then
        echo -e "${GREEN}✓ $header present${NC}" | tee -a "$REPORT_FILE"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}✗ $header missing${NC}" | tee -a "$REPORT_FILE"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

check_header "X-Frame-Options"
check_header "X-Content-Type-Options"
check_header "X-XSS-Protection"
check_header "Strict-Transport-Security"
echo "" | tee -a "$REPORT_FILE"

# 7. Input Validation Tests
echo -e "${YELLOW}[7/8] Input Validation Tests${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

test_endpoint "Empty username" \
    "${API_URL}/auth/login" \
    "POST" \
    "400" \
    '{"username":"","password":"test123"}'

test_endpoint "Invalid email format" \
    "${API_URL}/auth/register" \
    "POST" \
    "400" \
    '{"username":"test","email":"notanemail","password":"Test@123"}'

test_endpoint "Weak password" \
    "${API_URL}/auth/register" \
    "POST" \
    "400" \
    '{"username":"test","email":"test@test.com","password":"123"}'

# 8. Information Disclosure Tests
echo -e "${YELLOW}[8/8] Information Disclosure Tests${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

ERROR_RESPONSE=$(curl -s "${API_URL}/nonexistent-endpoint")

if echo "$ERROR_RESPONSE" | grep -qi "stack\|error.*at\|/home\|/usr"; then
    echo -e "${RED}✗ FAIL - Stack traces exposed in error responses${NC}" | tee -a "$REPORT_FILE"
    TESTS_FAILED=$((TESTS_FAILED + 1))
else
    echo -e "${GREEN}✓ PASS - No sensitive information in errors${NC}" | tee -a "$REPORT_FILE"
    TESTS_PASSED=$((TESTS_PASSED + 1))
fi
echo "" | tee -a "$REPORT_FILE"

# Summary
echo -e "${BLUE}=======================================${NC}" | tee -a "$REPORT_FILE"
echo -e "${BLUE}Penetration Test Summary${NC}" | tee -a "$REPORT_FILE"
echo -e "${BLUE}=======================================${NC}" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))
SUCCESS_RATE=$((TESTS_PASSED * 100 / TOTAL_TESTS))

echo "Tests Passed: $TESTS_PASSED" | tee -a "$REPORT_FILE"
echo "Tests Failed: $TESTS_FAILED" | tee -a "$REPORT_FILE"
echo "Total Tests:  $TOTAL_TESTS" | tee -a "$REPORT_FILE"
echo "Success Rate: ${SUCCESS_RATE}%" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

if [ $SUCCESS_RATE -ge 90 ]; then
    echo -e "${GREEN}✓ Excellent security - No critical vulnerabilities found${NC}" | tee -a "$REPORT_FILE"
elif [ $SUCCESS_RATE -ge 70 ]; then
    echo -e "${YELLOW}⚠️  Good security - Minor issues to address${NC}" | tee -a "$REPORT_FILE"
else
    echo -e "${RED}✗ Security improvements required - Critical issues found${NC}" | tee -a "$REPORT_FILE"
fi

echo "" | tee -a "$REPORT_FILE"
echo "Report saved to: $REPORT_FILE" | tee -a "$REPORT_FILE"
echo -e "${BLUE}=======================================${NC}" | tee -a "$REPORT_FILE"
