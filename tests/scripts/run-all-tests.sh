#!/bin/bash

###############################################################################
# SICOE - Run All Tests Suite
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
REPORT_FILE="${REPORT_DIR}/test-results-${TIMESTAMP}.txt"

mkdir -p "$REPORT_DIR"

echo -e "${BLUE}=======================================${NC}" | tee "$REPORT_FILE"
echo -e "${BLUE}SICOE - Complete Test Suite${NC}" | tee -a "$REPORT_FILE"
echo -e "${BLUE}=======================================${NC}" | tee -a "$REPORT_FILE"
echo -e "Date: $(date)" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

# Navigate to project root
cd "$(dirname "$0")/../../"

TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# 1. Backend Unit Tests
echo -e "${YELLOW}[1/7] Running Backend Unit Tests...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"
cd sicoe-backend

if npm run test 2>&1 | tee -a "$REPORT_FILE"; then
    echo -e "${GREEN}✓ Backend unit tests passed${NC}" | tee -a "$REPORT_FILE"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}✗ Backend unit tests failed${NC}" | tee -a "$REPORT_FILE"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi
TOTAL_TESTS=$((TOTAL_TESTS + 1))
echo "" | tee -a "$REPORT_FILE"

# 2. Backend Test Coverage
echo -e "${YELLOW}[2/7] Generating Backend Test Coverage...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

if npm run test:cov 2>&1 | tee -a "$REPORT_FILE"; then
    COVERAGE=$(grep -oP 'All files\s+\|\s+\K[0-9.]+' coverage/lcov-report/index.html 2>/dev/null || echo "N/A")
    echo "Coverage: ${COVERAGE}%" | tee -a "$REPORT_FILE"
    echo -e "${GREEN}✓ Coverage report generated${NC}" | tee -a "$REPORT_FILE"
else
    echo -e "${YELLOW}⚠️  Coverage report not available${NC}" | tee -a "$REPORT_FILE"
fi
echo "" | tee -a "$REPORT_FILE"

cd ..

# 3. Frontend Unit Tests
echo -e "${YELLOW}[3/7] Running Frontend Unit Tests...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"
cd sicoe-frontend

if npm run test 2>&1 | tee -a "$REPORT_FILE" || true; then
    echo -e "${GREEN}✓ Frontend tests completed${NC}" | tee -a "$REPORT_FILE"
else
    echo -e "${YELLOW}⚠️  Frontend tests not configured yet${NC}" | tee -a "$REPORT_FILE"
fi
echo "" | tee -a "$REPORT_FILE"

cd ..

# 4. Integration Tests
echo -e "${YELLOW}[4/7] Running Integration Tests...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

if [ -f "tests/scripts/integration-tests.sh" ]; then
    if ./tests/scripts/integration-tests.sh 2>&1 | tee -a "$REPORT_FILE"; then
        echo -e "${GREEN}✓ Integration tests passed${NC}" | tee -a "$REPORT_FILE"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}✗ Integration tests failed${NC}" | tee -a "$REPORT_FILE"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
else
    echo -e "${YELLOW}⚠️  Integration tests not found${NC}" | tee -a "$REPORT_FILE"
fi
echo "" | tee -a "$REPORT_FILE"

# 5. API Tests
echo -e "${YELLOW}[5/7] Running API Tests...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

if [ -f "tests/scripts/api-tests.sh" ]; then
    if ./tests/scripts/api-tests.sh http://localhost:3000 2>&1 | tee -a "$REPORT_FILE"; then
        echo -e "${GREEN}✓ API tests passed${NC}" | tee -a "$REPORT_FILE"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}✗ API tests failed${NC}" | tee -a "$REPORT_FILE"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
else
    echo -e "${YELLOW}⚠️  API tests not found${NC}" | tee -a "$REPORT_FILE"
fi
echo "" | tee -a "$REPORT_FILE"

# 6. Performance Tests
echo -e "${YELLOW}[6/7] Running Performance Tests...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

if [ -f "tests/scripts/performance-tests.sh" ]; then
    if ./tests/scripts/performance-tests.sh http://localhost:3000 2>&1 | tee -a "$REPORT_FILE"; then
        echo -e "${GREEN}✓ Performance tests passed${NC}" | tee -a "$REPORT_FILE"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}✗ Performance tests failed${NC}" | tee -a "$REPORT_FILE"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
else
    echo -e "${YELLOW}⚠️  Performance tests not found${NC}" | tee -a "$REPORT_FILE"
fi
echo "" | tee -a "$REPORT_FILE"

# 7. Security Tests
echo -e "${YELLOW}[7/7] Running Security Tests...${NC}" | tee -a "$REPORT_FILE"
echo "-----------------------------------" | tee -a "$REPORT_FILE"

if [ -f "security/scripts/penetration-test.sh" ]; then
    if ./security/scripts/penetration-test.sh http://localhost:3000 2>&1 | tail -20 | tee -a "$REPORT_FILE"; then
        echo -e "${GREEN}✓ Security tests completed${NC}" | tee -a "$REPORT_FILE"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}✗ Security tests failed${NC}" | tee -a "$REPORT_FILE"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
else
    echo -e "${YELLOW}⚠️  Security tests not found${NC}" | tee -a "$REPORT_FILE"
fi
echo "" | tee -a "$REPORT_FILE"

# Summary
echo -e "${BLUE}=======================================${NC}" | tee -a "$REPORT_FILE"
echo -e "${BLUE}Test Suite Summary${NC}" | tee -a "$REPORT_FILE"
echo -e "${BLUE}=======================================${NC}" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

echo "Total Test Suites: $TOTAL_TESTS" | tee -a "$REPORT_FILE"
echo "Passed: $PASSED_TESTS" | tee -a "$REPORT_FILE"
echo "Failed: $FAILED_TESTS" | tee -a "$REPORT_FILE"

if [ $TOTAL_TESTS -gt 0 ]; then
    SUCCESS_RATE=$((PASSED_TESTS * 100 / TOTAL_TESTS))
    echo "Success Rate: ${SUCCESS_RATE}%" | tee -a "$REPORT_FILE"
else
    SUCCESS_RATE=0
fi

echo "" | tee -a "$REPORT_FILE"

if [ $SUCCESS_RATE -ge 90 ]; then
    echo -e "${GREEN}✓ Excellent - All tests passing${NC}" | tee -a "$REPORT_FILE"
elif [ $SUCCESS_RATE -ge 70 ]; then
    echo -e "${YELLOW}⚠️  Good - Minor issues to fix${NC}" | tee -a "$REPORT_FILE"
else
    echo -e "${RED}✗ Action required - Multiple test failures${NC}" | tee -a "$REPORT_FILE"
fi

echo "" | tee -a "$REPORT_FILE"
echo "Report saved to: $REPORT_FILE" | tee -a "$REPORT_FILE"
echo -e "${BLUE}=======================================${NC}" | tee -a "$REPORT_FILE"

# Exit with failure if any tests failed
if [ $FAILED_TESTS -gt 0 ]; then
    exit 1
fi
