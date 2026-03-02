#!/bin/bash

# SICOE - Script de Testes de Integração Completo
# Sprint 3 - Validação Backend ↔ Frontend

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Contadores
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# URLs
BACKEND_URL="http://localhost:3000/api/v1"
FRONTEND_URL="http://localhost:5173"

# Funções auxiliares
print_header() {
    echo -e "\n${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║ $1${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}\n"
}

print_test() {
    echo -e "${YELLOW}[TEST $TOTAL_TESTS]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓ PASSOU${NC} - $1\n"
    ((PASSED_TESTS++))
}

print_failure() {
    echo -e "${RED}✗ FALHOU${NC} - $1"
    echo -e "${RED}   Erro: $2${NC}\n"
    ((FAILED_TESTS++))
}

test_endpoint() {
    local method=$1
    local endpoint=$2
    local expected_status=$3
    local description=$4
    local data=$5

    ((TOTAL_TESTS++))
    print_test "$description"

    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$BACKEND_URL$endpoint")
    elif [ "$method" = "POST" ] || [ "$method" = "PATCH" ]; then
        response=$(curl -s -w "\n%{http_code}" -X "$method" -H "Content-Type: application/json" -d "$data" "$BACKEND_URL$endpoint")
    elif [ "$method" = "DELETE" ]; then
        response=$(curl -s -w "\n%{http_code}" -X DELETE "$BACKEND_URL$endpoint")
    fi

    status_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | head -n -1)

    if [ "$status_code" = "$expected_status" ]; then
        print_success "$description (Status: $status_code)"
    else
        print_failure "$description" "Esperado $expected_status, recebido $status_code"
        echo "   Response: $body"
    fi
}

# ============================================================
# INÍCIO DOS TESTES
# ============================================================

print_header "SICOE - TESTES DE INTEGRAÇÃO COMPLETOS"

# ============================================================
# 1. TESTES DE CONECTIVIDADE
# ============================================================

print_header "1. TESTES DE CONECTIVIDADE"

((TOTAL_TESTS++))
print_test "Backend está acessível"
if curl -s "$BACKEND_URL" > /dev/null 2>&1; then
    print_success "Backend respondendo em $BACKEND_URL"
else
    print_failure "Backend não está acessível" "Sem resposta"
fi

((TOTAL_TESTS++))
print_test "Frontend está acessível"
if curl -s "$FRONTEND_URL" > /dev/null 2>&1; then
    print_success "Frontend respondendo em $FRONTEND_URL"
else
    print_failure "Frontend não está acessível" "Sem resposta"
fi

((TOTAL_TESTS++))
print_test "Database está acessível"
if docker exec sicoe-postgres psql -U sicoe_user -d sicoe_db -c "SELECT 1" > /dev/null 2>&1; then
    print_success "PostgreSQL respondendo"
else
    print_failure "Database não está acessível" "Sem resposta"
fi

# ============================================================
# 2. TESTES DE ENDPOINTS - USERS
# ============================================================

print_header "2. TESTES DE ENDPOINTS - USERS"

# Nota: Endpoints protegidos retornam 401 sem autenticação (esperado)
test_endpoint "GET" "/users" "401" "Listar usuários (sem auth - esperado 401)"
test_endpoint "GET" "/users/1" "401" "Buscar usuário por ID (sem auth - esperado 401)"

# ============================================================
# 3. TESTES DE ENDPOINTS - ESTABLISHMENTS
# ============================================================

print_header "3. TESTES DE ENDPOINTS - ESTABLISHMENTS"

test_endpoint "GET" "/establishments" "401" "Listar estabelecimentos (sem auth - esperado 401)"
test_endpoint "GET" "/establishments/1" "401" "Buscar estabelecimento por ID (sem auth - esperado 401)"

# ============================================================
# 4. TESTES DE ENDPOINTS - EMAIL
# ============================================================

print_header "4. TESTES DE ENDPOINTS - EMAIL"

test_endpoint "GET" "/email" "401" "Listar logs de email (sem auth - esperado 401)"

# ============================================================
# 5. TESTES DE ENDPOINTS - AUDIT
# ============================================================

print_header "5. TESTES DE ENDPOINTS - AUDIT"

test_endpoint "GET" "/audit" "401" "Listar logs de auditoria (sem auth - esperado 401)"

# ============================================================
# 6. TESTES DE PAGINAÇÃO
# ============================================================

print_header "6. TESTES DE PAGINAÇÃO"

test_endpoint "GET" "/users?page=1&limit=10" "401" "Paginação - page=1, limit=10 (sem auth - esperado 401)"
test_endpoint "GET" "/users?page=2&limit=5" "401" "Paginação - page=2, limit=5 (sem auth - esperado 401)"
test_endpoint "GET" "/users?page=1&limit=50" "401" "Paginação - page=1, limit=50 (sem auth - esperado 401)"

# ============================================================
# 7. TESTES DE ORDENAÇÃO
# ============================================================

print_header "7. TESTES DE ORDENAÇÃO"

test_endpoint "GET" "/users?sortBy=username&sortOrder=ASC" "401" "Ordenação - username ASC (sem auth - esperado 401)"
test_endpoint "GET" "/users?sortBy=username&sortOrder=DESC" "401" "Ordenação - username DESC (sem auth - esperado 401)"
test_endpoint "GET" "/email?sortBy=tsSent&sortOrder=DESC" "401" "Ordenação - tsSent DESC (sem auth - esperado 401)"

# ============================================================
# 8. TESTES DE FILTROS
# ============================================================

print_header "8. TESTES DE FILTROS"

test_endpoint "GET" "/users?search=admin" "401" "Filtro - busca por 'admin' (sem auth - esperado 401)"
test_endpoint "GET" "/email?destination=test@example.com" "401" "Filtro - email por destino (sem auth - esperado 401)"
test_endpoint "GET" "/audit?login=admin" "401" "Filtro - audit por login (sem auth - esperado 401)"

# ============================================================
# 9. TESTES DO DATABASE
# ============================================================

print_header "9. TESTES DO DATABASE"

((TOTAL_TESTS++))
print_test "Contar tabelas no banco"
table_count=$(docker exec sicoe-postgres psql -U sicoe_user -d sicoe_db -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';" 2>/dev/null | tr -d ' ')
if [ "$table_count" -gt 10 ]; then
    print_success "Database tem $table_count tabelas"
else
    print_failure "Database com poucas tabelas" "Encontradas: $table_count"
fi

((TOTAL_TESTS++))
print_test "Verificar tabela ssv_users"
if docker exec sicoe-postgres psql -U sicoe_user -d sicoe_db -c "\d ssv_users" > /dev/null 2>&1; then
    print_success "Tabela ssv_users existe"
else
    print_failure "Tabela ssv_users não encontrada" "Tabela não existe"
fi

((TOTAL_TESTS++))
print_test "Verificar tabela ssv_email"
if docker exec sicoe-postgres psql -U sicoe_user -d sicoe_db -c "\d ssv_email" > /dev/null 2>&1; then
    print_success "Tabela ssv_email existe"
else
    print_failure "Tabela ssv_email não encontrada" "Tabela não existe"
fi

((TOTAL_TESTS++))
print_test "Verificar tabela ssv_audit"
if docker exec sicoe-postgres psql -U sicoe_user -d sicoe_db -c "\d ssv_audit" > /dev/null 2>&1; then
    print_success "Tabela ssv_audit existe"
else
    print_failure "Tabela ssv_audit não encontrada" "Tabela não existe"
fi

# ============================================================
# 10. TESTES DE ROTAS DO FRONTEND
# ============================================================

print_header "10. TESTES DE ROTAS DO FRONTEND"

((TOTAL_TESTS++))
print_test "Rota raiz (/)"
if curl -s "$FRONTEND_URL/" | grep -q "sicoe-frontend"; then
    print_success "Rota / está acessível"
else
    print_failure "Rota / não responde corretamente" "Conteúdo inválido"
fi

# Note: SPAs retornam 200 para todas as rotas (handled by React Router)
((TOTAL_TESTS++))
print_test "Rota /login"
if curl -s "$FRONTEND_URL/login" | grep -q "sicoe-frontend"; then
    print_success "Rota /login está acessível (SPA)"
else
    print_failure "Rota /login não responde" "Conteúdo inválido"
fi

((TOTAL_TESTS++))
print_test "Rota /users"
if curl -s "$FRONTEND_URL/users" | grep -q "sicoe-frontend"; then
    print_success "Rota /users está acessível (SPA)"
else
    print_failure "Rota /users não responde" "Conteúdo inválido"
fi

((TOTAL_TESTS++))
print_test "Rota /email"
if curl -s "$FRONTEND_URL/email" | grep -q "sicoe-frontend"; then
    print_success "Rota /email está acessível (SPA)"
else
    print_failure "Rota /email não responde" "Conteúdo inválido"
fi

((TOTAL_TESTS++))
print_test "Rota /audit"
if curl -s "$FRONTEND_URL/audit" | grep -q "sicoe-frontend"; then
    print_success "Rota /audit está acessível (SPA)"
else
    print_failure "Rota /audit não responde" "Conteúdo inválido"
fi

# ============================================================
# 11. TESTES DE RECURSOS DOS CONTAINERS
# ============================================================

print_header "11. TESTES DE RECURSOS DOS CONTAINERS"

((TOTAL_TESTS++))
print_test "Container postgres está rodando"
if docker ps | grep -q "sicoe-postgres.*Up.*healthy"; then
    print_success "PostgreSQL container healthy"
else
    print_failure "PostgreSQL container não está healthy" "Status incorreto"
fi

((TOTAL_TESTS++))
print_test "Container backend está rodando"
if docker ps | grep -q "sicoe-backend.*Up.*healthy"; then
    print_success "Backend container healthy"
else
    print_failure "Backend container não está healthy" "Status incorreto"
fi

((TOTAL_TESTS++))
print_test "Container frontend está rodando"
if docker ps | grep -q "sicoe-frontend.*Up.*healthy"; then
    print_success "Frontend container healthy"
else
    print_failure "Frontend container não está healthy" "Status incorreto"
fi

# ============================================================
# RELATÓRIO FINAL
# ============================================================

print_header "RELATÓRIO FINAL"

echo -e "${BLUE}Total de Testes:${NC} $TOTAL_TESTS"
echo -e "${GREEN}Testes Passados:${NC} $PASSED_TESTS"
echo -e "${RED}Testes Falhados:${NC} $FAILED_TESTS"

PASS_RATE=$((PASSED_TESTS * 100 / TOTAL_TESTS))
echo -e "${BLUE}Taxa de Sucesso:${NC} $PASS_RATE%"

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "\n${GREEN}╔════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✓ TODOS OS TESTES PASSARAM COM SUCESSO!  ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════╝${NC}\n"
    exit 0
else
    echo -e "\n${YELLOW}╔════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║  ⚠ ALGUNS TESTES FALHARAM              ║${NC}"
    echo -e "${YELLOW}╚════════════════════════════════════════╝${NC}\n"
    exit 1
fi
