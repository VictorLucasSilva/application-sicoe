#!/bin/bash

# Script para testar se o sistema está funcionando
# Execute: ./test-conexao.sh

echo "=================================================="
echo "🧪 TESTE DE CONEXÃO - SICOE"
echo "=================================================="
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verificar se variáveis estão configuradas
echo "1️⃣  Verificando variáveis de ambiente..."
echo ""

if [ -z "$DB_HOST" ]; then
    echo -e "${RED}✗ DB_HOST não configurada${NC}"
    echo ""
    echo "Execute primeiro:"
    echo "  source ./setup-env-dev.sh"
    exit 1
fi

echo -e "${GREEN}✓ Variáveis configuradas${NC}"
echo "  DB_HOST: $DB_HOST"
echo "  DB_DATABASE: $DB_DATABASE"
echo "  AZURE_MEDIA_CONTAINER: $AZURE_MEDIA_CONTAINER"
echo ""

# Verificar se containers estão rodando
echo "2️⃣  Verificando containers..."
echo ""

if ! docker ps | grep -q "sicoe-backend"; then
    echo -e "${RED}✗ Backend não está rodando${NC}"
    echo ""
    echo "Execute primeiro:"
    echo "  docker compose up -d"
    exit 1
fi

echo -e "${GREEN}✓ Backend rodando${NC}"
echo ""

# Aguardar backend ficar saudável
echo "3️⃣  Aguardando backend ficar saudável..."
echo ""

for i in {1..30}; do
    if curl -s http://localhost:3000/api/v1/health > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Backend está respondendo${NC}"
        break
    fi

    if [ $i -eq 30 ]; then
        echo -e "${RED}✗ Backend não respondeu após 30s${NC}"
        echo ""
        echo "Verifique os logs:"
        echo "  docker compose logs backend"
        exit 1
    fi

    echo -n "."
    sleep 1
done
echo ""

# Testar endpoints
echo "4️⃣  Testando endpoints..."
echo ""

# Health geral
response=$(curl -s http://localhost:3000/api/v1/health)
if echo "$response" | grep -q "ok"; then
    echo -e "${GREEN}✓ Health geral: OK${NC}"
else
    echo -e "${RED}✗ Health geral: FALHOU${NC}"
fi

# PostgreSQL
db_test=$(curl -s http://localhost:3000/api/v1/health/db)
if echo "$db_test" | grep -q '"success":true'; then
    echo -e "${GREEN}✓ PostgreSQL: CONECTADO${NC}"
    echo "$db_test" | grep -o '"host":"[^"]*"' | sed 's/"host":"/ Host: /' | sed 's/"$//'
else
    echo -e "${RED}✗ PostgreSQL: FALHOU${NC}"
    echo "$db_test" | grep -o '"message":"[^"]*"' || echo "$db_test"
fi

# Azure Storage
storage_test=$(curl -s http://localhost:3000/api/v1/health/storage)
if echo "$storage_test" | grep -q '"success":true'; then
    echo -e "${GREEN}✓ Azure Storage: CONECTADO${NC}"
    echo "$storage_test" | grep -o '"message":"[^"]*"' | sed 's/"message":"/ /' | sed 's/"$//'
else
    echo -e "${YELLOW}⚠ Azure Storage: ${NC}"
    echo "$storage_test" | grep -o '"message":"[^"]*"' || echo "$storage_test"
fi

echo ""
echo "=================================================="
echo "📊 RESULTADO"
echo "=================================================="
echo ""

# Teste completo
full_test=$(curl -s http://localhost:3000/api/v1/health/all)
overall=$(echo "$full_test" | grep -o '"overall":"[^"]*"' | sed 's/"overall":"//' | sed 's/"$//')

if [ "$overall" = "healthy" ]; then
    echo -e "${GREEN}✅ SISTEMA SAUDÁVEL${NC}"
    echo ""
    echo "Acesse:"
    echo "  Frontend: http://localhost:5173"
    echo "  Backend:  http://localhost:3000/api/v1"
    echo ""
else
    echo -e "${YELLOW}⚠️  SISTEMA COM PROBLEMAS${NC}"
    echo ""
    echo "Para diagnosticar:"
    echo "  ./diagnose-azure.sh"
    echo "  docker compose logs backend"
    echo ""
fi

echo "=================================================="
