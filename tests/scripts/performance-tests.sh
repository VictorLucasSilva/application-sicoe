#!/bin/bash

###############################################################################
# SICOE - Performance Testing Script
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
echo -e "${BLUE}SICOE - Performance Testing${NC}"
echo -e "${BLUE}=======================================${NC}"
echo -e "Target: ${API_URL}"
echo ""

TESTS_PASSED=0
TESTS_FAILED=0

# Helper function to measure response time
measure_response_time() {
    local endpoint=$1
    local method=${2:-GET}
    local data=${3:-}

    if [ "$method" == "GET" ]; then
        RESPONSE_TIME=$(curl -o /dev/null -s -w '%{time_total}\n' "${API_URL}${endpoint}")
    else
        RESPONSE_TIME=$(curl -o /dev/null -s -w '%{time_total}\n' -X "$method" -H "Content-Type: application/json" -d "$data" "${API_URL}${endpoint}")
    fi

    echo $RESPONSE_TIME
}

# Helper function to check performance threshold
check_performance() {
    local test_name=$1
    local response_time=$2
    local threshold=$3

    echo -n "$test_name: ${response_time}s "

    # Convert to milliseconds for comparison
    response_ms=$(echo "$response_time * 1000" | bc)
    threshold_ms=$(echo "$threshold * 1000" | bc)

    if (( $(echo "$response_ms < $threshold_ms" | bc -l) )); then
        echo -e "${GREEN}✓ PASS${NC} (< ${threshold}s)"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (threshold: ${threshold}s)"
        TESTS_FAILED=$((TESTS_FAILED + 1))
        return 1
    fi
}

# 1. Response Time Tests
echo -e "${YELLOW}[1/5] Response Time Tests${NC}"
echo "-----------------------------------"

HEALTH_TIME=$(measure_response_time "")
check_performance "Health check" "$HEALTH_TIME" "1.0"

LOGIN_TIME=$(measure_response_time "/auth/login" "POST" '{"username":"test","password":"test"}')
check_performance "Login endpoint" "$LOGIN_TIME" "2.0"

echo ""

# 2. Concurrent Requests Test
echo -e "${YELLOW}[2/5] Concurrent Requests Test${NC}"
echo "-----------------------------------"

echo "Sending 20 concurrent requests..."
START_TIME=$(date +%s.%N)

for i in {1..20}; do
    curl -s -o /dev/null "${API_URL}" &
done

wait

END_TIME=$(date +%s.%N)
DURATION=$(echo "$END_TIME - $START_TIME" | bc)

echo -n "20 concurrent requests completed in ${DURATION}s "

if (( $(echo "$DURATION < 5.0" | bc -l) )); then
    echo -e "${GREEN}✓ PASS${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}✗ FAIL${NC} (took too long)"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

echo ""

# 3. Load Test (Simple)
echo -e "${YELLOW}[3/5] Load Test (100 requests)${NC}"
echo "-----------------------------------"

echo "Sending 100 sequential requests..."
START_TIME=$(date +%s.%N)

SUCCESS_COUNT=0
for i in {1..100}; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${API_URL}")
    if [ "$STATUS" == "200" ]; then
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    fi
done

END_TIME=$(date +%s.%N)
DURATION=$(echo "$END_TIME - $START_TIME" | bc)
AVG_TIME=$(echo "scale=4; $DURATION / 100" | bc)

echo "Completed in ${DURATION}s"
echo "Average response time: ${AVG_TIME}s"
echo "Success rate: ${SUCCESS_COUNT}/100"

if [ $SUCCESS_COUNT -ge 95 ]; then
    echo -e "${GREEN}✓ PASS${NC} (95%+ success rate)"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}✗ FAIL${NC} (< 95% success rate)"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

echo ""

# 4. Memory/Resource Check
echo -e "${YELLOW}[4/5] Resource Usage Check${NC}"
echo "-----------------------------------"

if command -v docker &> /dev/null; then
    echo "Docker container stats:"
    docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" 2>/dev/null | grep sicoe || echo "No sicoe containers running"
    echo -e "${GREEN}✓ PASS${NC} (info only)"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${YELLOW}⚠️  Docker not available${NC}"
fi

echo ""

# 5. Database Query Performance
echo -e "${YELLOW}[5/5] Database Performance (Indirect)${NC}"
echo "-----------------------------------"

echo "Testing endpoint that queries database..."

# Try to login first to get a token
LOGIN_RESPONSE=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"Admin@123"}' \
    "${API_URL}/auth/login" 2>/dev/null || echo "")

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4 || echo "")

if [ ! -z "$TOKEN" ]; then
    USERS_TIME=$(curl -s -w '%{time_total}\n' -o /dev/null -H "Authorization: Bearer $TOKEN" "${API_URL}/users")
    check_performance "List users (DB query)" "$USERS_TIME" "1.5"

    AUDIT_TIME=$(curl -s -w '%{time_total}\n' -o /dev/null -H "Authorization: Bearer $TOKEN" "${API_URL}/audit")
    check_performance "List audit logs (DB query)" "$AUDIT_TIME" "1.5"
else
    echo -e "${YELLOW}⚠️  Cannot test - admin user not available${NC}"
fi

echo ""

# Summary
echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}Performance Test Summary${NC}"
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
    echo -e "${GREEN}✓ Performance is acceptable${NC}"
    exit 0
elif [ $SUCCESS_RATE -ge 60 ]; then
    echo -e "${YELLOW}⚠️  Performance needs improvement${NC}"
    exit 1
else
    echo -e "${RED}✗ Performance is poor${NC}"
    exit 1
fi
