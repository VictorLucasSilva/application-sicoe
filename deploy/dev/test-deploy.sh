#!/bin/bash

# SICOE - Script de Teste de Deploy DEV
# Este script simula o deploy completo do ambiente de desenvolvimento

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  SICOE - SIMULAÇÃO DE DEPLOY AMBIENTE DEV                     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função de check
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
    else
        echo -e "${RED}✗${NC} $1"
        exit 1
    fi
}

echo -e "${BLUE}[1/10]${NC} Verificando pré-requisitos..."
docker --version > /dev/null 2>&1
check "Docker instalado"
docker compose version > /dev/null 2>&1
check "Docker Compose instalado"

echo ""
echo -e "${BLUE}[2/10]${NC} Verificando estrutura de arquivos..."
test -f docker-compose.dev.yml
check "docker-compose.dev.yml existe"
test -f .env.example
check ".env.example existe"

echo ""
echo -e "${BLUE}[3/10]${NC} Criando .env de teste (se não existir)..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠${NC}  .env criado a partir do .env.example"
else
    echo -e "${GREEN}✓${NC} .env já existe"
fi

echo ""
echo -e "${BLUE}[4/10]${NC} Validando docker-compose.dev.yml..."
docker compose -f docker-compose.dev.yml config --quiet
check "Sintaxe do docker-compose válida"

echo ""
echo -e "${BLUE}[5/10]${NC} Verificando variáveis de ambiente..."
grep -q "DB_USERNAME=" .env
check "DB_USERNAME configurado"
grep -q "DB_PASSWORD=" .env
check "DB_PASSWORD configurado"
grep -q "BACKEND_URL=" .env
check "BACKEND_URL configurado"
grep -q "GITHUB_REPOSITORY=" .env
check "GITHUB_REPOSITORY configurado"

echo ""
echo -e "${BLUE}[6/10]${NC} Verificando portas do ambiente DEV..."
echo -e "${YELLOW}⚠${NC}  DEV usa portas: 80 (frontend), 443 (https), 3000 (backend), 5432 (postgres)"

echo ""
echo -e "${BLUE}[7/10]${NC} Verificando configuração de serviços..."
docker compose -f docker-compose.dev.yml config --services | grep -q postgres
check "Serviço postgres configurado"
docker compose -f docker-compose.dev.yml config --services | grep -q backend
check "Serviço backend configurado"
docker compose -f docker-compose.dev.yml config --services | grep -q frontend
check "Serviço frontend configurado"

echo ""
echo -e "${BLUE}[8/10]${NC} Verificando healthchecks..."
grep -q "healthcheck:" docker-compose.dev.yml
check "Healthchecks configurados"

echo ""
echo -e "${BLUE}[9/10]${NC} Verificando registry de imagens..."
REGISTRY=$(grep "image: ghcr.io" docker-compose.dev.yml | head -1)
if [ -n "$REGISTRY" ]; then
    echo -e "${GREEN}✓${NC} Usando GitHub Container Registry (ghcr.io)"
else
    echo -e "${YELLOW}⚠${NC}  Registry não detectado"
fi

echo ""
echo -e "${BLUE}[10/10]${NC} Verificando volumes e networks..."
grep -q "sicoe-network-dev" docker-compose.dev.yml
check "Network sicoe-network-dev configurada"
grep -q "sicoe-postgres-data-dev" docker-compose.dev.yml
check "Volume sicoe-postgres-data-dev configurado"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo -e "${GREEN}✓ TODOS OS TESTES PASSARAM!${NC}"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo -e "${YELLOW}Informações do Ambiente DEV:${NC}"
echo ""
echo "• Tipo: Desenvolvimento (usando imagens pré-construídas)"
echo "• Registry: GitHub Container Registry (ghcr.io)"
echo "• Portas: 80, 443 (frontend), 3000 (backend), 5432 (postgres)"
echo "• Restart: unless-stopped"
echo ""
echo -e "${YELLOW}Pré-requisitos para deploy real:${NC}"
echo ""
echo "1. Autenticar no GitHub Container Registry:"
echo "   echo \$GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin"
echo ""
echo "2. Garantir que as imagens existem:"
echo "   docker pull ghcr.io/\${GITHUB_REPOSITORY}/backend:develop"
echo "   docker pull ghcr.io/\${GITHUB_REPOSITORY}/frontend:develop"
echo ""
echo "3. Configurar variáveis no .env:"
echo "   - DB_USERNAME, DB_PASSWORD"
echo "   - JWT_SECRET, JWT_REFRESH_SECRET"
echo "   - AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET"
echo "   - BACKEND_URL, FRONTEND_URL"
echo ""
echo -e "${YELLOW}Comandos para deploy:${NC}"
echo ""
echo "1. Pull das imagens:"
echo "   docker compose -f docker-compose.dev.yml pull"
echo ""
echo "2. Iniciar serviços:"
echo "   docker compose -f docker-compose.dev.yml up -d"
echo ""
echo "3. Ver logs:"
echo "   docker compose -f docker-compose.dev.yml logs -f"
echo ""
echo "4. Verificar status:"
echo "   docker compose -f docker-compose.dev.yml ps"
echo ""
echo -e "${YELLOW}Para parar:${NC}"
echo "   docker compose -f docker-compose.dev.yml down"
echo ""
