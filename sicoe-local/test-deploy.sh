#!/bin/bash

# SICOE - Script de Teste de Deploy Local
# Este script simula o deploy completo do ambiente local

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  SICOE - SIMULAÇÃO DE DEPLOY AMBIENTE LOCAL                   ║"
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

echo -e "${BLUE}[1/8]${NC} Verificando pré-requisitos..."
docker --version > /dev/null 2>&1
check "Docker instalado"
docker compose version > /dev/null 2>&1
check "Docker Compose instalado"

echo ""
echo -e "${BLUE}[2/8]${NC} Verificando estrutura de arquivos..."
test -f docker-compose.yml
check "docker-compose.yml existe"
test -f .env
check ".env existe"
test -d postgresql
check "Diretório postgresql/ existe"
test -f postgresql/init.sql
check "Script de inicialização do banco existe"

echo ""
echo -e "${BLUE}[3/8]${NC} Verificando Dockerfiles..."
test -f ../sicoe-backend/Dockerfile
check "Backend Dockerfile existe"
test -f ../sicoe-frontend/Dockerfile
check "Frontend Dockerfile existe"

echo ""
echo -e "${BLUE}[4/8]${NC} Validando docker-compose.yml..."
docker compose config --quiet
check "Sintaxe do docker-compose válida"

echo ""
echo -e "${BLUE}[5/8]${NC} Verificando variáveis de ambiente..."
grep -q "DB_USERNAME=" .env
check "DB_USERNAME configurado"
grep -q "DB_PASSWORD=" .env
check "DB_PASSWORD configurado"
grep -q "VITE_API_BASE_URL=" .env
check "VITE_API_BASE_URL configurado"
grep -q "JWT_SECRET=" .env
check "JWT_SECRET configurado"

echo ""
echo -e "${BLUE}[6/8]${NC} Verificando portas disponíveis..."
! nc -z localhost 5432 2>/dev/null
check "Porta 5432 (PostgreSQL) disponível"
! nc -z localhost 3000 2>/dev/null
check "Porta 3000 (Backend) disponível"
! nc -z localhost 5173 2>/dev/null
check "Porta 5173 (Frontend) disponível"

echo ""
echo -e "${BLUE}[7/8]${NC} Verificando configurações do frontend..."
cd ../sicoe-frontend
test -f Dockerfile
check "Frontend Dockerfile existe"
test -f nginx.conf
check "nginx.conf existe"
test -f vite.config.ts
check "vite.config.ts existe"

echo ""
echo -e "${BLUE}[8/8]${NC} Verificando build args no docker-compose..."
cd ../sicoe-local
grep -q "VITE_API_BASE_URL" docker-compose.yml
check "Build arg VITE_API_BASE_URL configurado"
grep -q "VITE_ENV" docker-compose.yml
check "Build arg VITE_ENV configurado"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo -e "${GREEN}✓ TODOS OS TESTES PASSARAM!${NC}"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo -e "${YELLOW}Próximos passos para deploy real:${NC}"
echo ""
echo "1. Build das imagens:"
echo "   docker compose build --no-cache"
echo ""
echo "2. Iniciar serviços:"
echo "   docker compose up -d"
echo ""
echo "3. Ver logs:"
echo "   docker compose logs -f"
echo ""
echo "4. Verificar status:"
echo "   docker compose ps"
echo ""
echo "5. Acessar aplicação:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3000/api/v1"
echo ""
echo -e "${YELLOW}Para parar:${NC}"
echo "   docker compose down"
echo ""
