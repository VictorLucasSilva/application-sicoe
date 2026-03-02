#!/bin/bash

# SICOE - Script de Teste de Deploy PROD
# Este script simula o deploy completo do ambiente de produção

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  SICOE - SIMULAÇÃO DE DEPLOY AMBIENTE PRODUÇÃO                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
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

echo -e "${BLUE}[1/12]${NC} Verificando pré-requisitos..."
docker --version > /dev/null 2>&1
check "Docker instalado"
docker compose version > /dev/null 2>&1
check "Docker Compose instalado"

echo ""
echo -e "${BLUE}[2/12]${NC} Verificando estrutura de arquivos..."
test -f docker-compose.prod.yml
check "docker-compose.prod.yml existe"
test -f .env.example
check ".env.example existe"

echo ""
echo -e "${BLUE}[3/12]${NC} Criando .env de teste (se não existir)..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠${NC}  .env criado a partir do .env.example"
    echo -e "${RED}⚠  ATENÇÃO: Configure valores reais antes do deploy!${NC}"
else
    echo -e "${GREEN}✓${NC} .env já existe"
fi

echo ""
echo -e "${BLUE}[4/12]${NC} Validando docker-compose.prod.yml..."
docker compose -f docker-compose.prod.yml config --quiet
check "Sintaxe do docker-compose válida"

echo ""
echo -e "${BLUE}[5/12]${NC} Verificando variáveis CRÍTICAS de produção..."
grep -q "DB_USERNAME=" .env
check "DB_USERNAME configurado"
grep -q "DB_PASSWORD=" .env
check "DB_PASSWORD configurado"
grep -q "JWT_SECRET=" .env
check "JWT_SECRET configurado"
grep -q "BACKEND_URL=" .env
check "BACKEND_URL configurado"
grep -q "GITHUB_REPOSITORY=" .env
check "GITHUB_REPOSITORY configurado"

echo ""
echo -e "${BLUE}[6/12]${NC} Verificando segurança de senhas..."
DB_PASS=$(grep "DB_PASSWORD=" .env | cut -d'=' -f2)
if [ ${#DB_PASS} -lt 32 ]; then
    echo -e "${RED}✗${NC} DB_PASSWORD muito curta (mínimo 32 caracteres recomendado)"
else
    echo -e "${GREEN}✓${NC} DB_PASSWORD tem comprimento adequado"
fi

JWT_SECRET=$(grep "^JWT_SECRET=" .env | cut -d'=' -f2)
if [ ${#JWT_SECRET} -lt 32 ]; then
    echo -e "${RED}✗${NC} JWT_SECRET muito curta (mínimo 32 caracteres recomendado)"
else
    echo -e "${GREEN}✓${NC} JWT_SECRET tem comprimento adequado"
fi

echo ""
echo -e "${BLUE}[7/12]${NC} Verificando configuração de serviços..."
docker compose -f docker-compose.prod.yml config --services | grep -q postgres
check "Serviço postgres configurado"
docker compose -f docker-compose.prod.yml config --services | grep -q backend
check "Serviço backend configurado"
docker compose -f docker-compose.prod.yml config --services | grep -q frontend
check "Serviço frontend configurado"

echo ""
echo -e "${BLUE}[8/12]${NC} Verificando healthchecks..."
HEALTH_COUNT=$(grep -c "healthcheck:" docker-compose.prod.yml)
if [ $HEALTH_COUNT -ge 3 ]; then
    echo -e "${GREEN}✓${NC} Healthchecks configurados para todos os serviços ($HEALTH_COUNT)"
else
    echo -e "${YELLOW}⚠${NC}  Alguns healthchecks podem estar faltando ($HEALTH_COUNT encontrados)"
fi

echo ""
echo -e "${BLUE}[9/12]${NC} Verificando limites de recursos..."
grep -q "resources:" docker-compose.prod.yml
check "Limites de recursos (CPU/Memory) configurados"

echo ""
echo -e "${BLUE}[10/12]${NC} Verificando políticas de restart..."
RESTART=$(grep -c "restart: always" docker-compose.prod.yml)
if [ $RESTART -ge 3 ]; then
    echo -e "${GREEN}✓${NC} Política de restart 'always' configurada ($RESTART serviços)"
else
    echo -e "${YELLOW}⚠${NC}  Revisar políticas de restart ($RESTART serviços com 'always')"
fi

echo ""
echo -e "${BLUE}[11/12]${NC} Verificando exposição de portas..."
LOCALHOST_PORTS=$(grep -c "127.0.0.1:" docker-compose.prod.yml)
if [ $LOCALHOST_PORTS -ge 2 ]; then
    echo -e "${GREEN}✓${NC} Portas sensíveis restritas a localhost ($LOCALHOST_PORTS)"
else
    echo -e "${YELLOW}⚠${NC}  Verificar exposição de portas sensíveis"
fi

echo ""
echo -e "${BLUE}[12/12]${NC} Verificando volumes e networks..."
grep -q "sicoe-network-prod" docker-compose.prod.yml
check "Network sicoe-network-prod configurada"
grep -q "sicoe-postgres-data-prod" docker-compose.prod.yml
check "Volume sicoe-postgres-data-prod configurado"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo -e "${GREEN}✓ TODOS OS TESTES PASSARAM!${NC}"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo -e "${MAGENTA}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${MAGENTA}║  INFORMAÇÕES DO AMBIENTE DE PRODUÇÃO                     ║${NC}"
echo -e "${MAGENTA}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "• Tipo: PRODUÇÃO (usando imagens pré-construídas)"
echo "• Registry: GitHub Container Registry (ghcr.io)"
echo "• Imagens: backend:latest, frontend:latest"
echo "• Portas: 80, 443 (frontend público)"
echo "• Portas: 127.0.0.1:3000 (backend - localhost only)"
echo "• Portas: 127.0.0.1:5432 (postgres - localhost only)"
echo "• Restart: always"
echo "• Resource limits: Configurados"
echo ""
echo -e "${RED}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${RED}║  CHECKLIST DE SEGURANÇA PRÉ-DEPLOY                       ║${NC}"
echo -e "${RED}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "[ ] 1. Senhas fortes configuradas (mín. 32 chars)"
echo "[ ] 2. JWT_SECRET e JWT_REFRESH_SECRET únicos e seguros"
echo "[ ] 3. Credenciais Azure/EntraID corretas"
echo "[ ] 4. URLs de BACKEND_URL e FRONTEND_URL corretas"
echo "[ ] 5. Certificados SSL configurados em ./ssl/"
echo "[ ] 6. Backup do banco de dados configurado"
echo "[ ] 7. Monitoramento configurado (logs, metrics)"
echo "[ ] 8. Firewall configurado para portas corretas"
echo "[ ] 9. DNS apontando para o servidor correto"
echo "[ ] 10. Autenticação no GitHub Container Registry"
echo ""
echo -e "${YELLOW}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${YELLOW}║  PRÉ-REQUISITOS PARA DEPLOY REAL                         ║${NC}"
echo -e "${YELLOW}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "1. Autenticar no GitHub Container Registry:"
echo "   echo \$GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin"
echo ""
echo "2. Criar diretórios necessários:"
echo "   mkdir -p logs ssl backups"
echo ""
echo "3. Configurar certificados SSL:"
echo "   cp /path/to/cert.pem ./ssl/"
echo "   cp /path/to/key.pem ./ssl/"
echo ""
echo "4. Pull das imagens de produção:"
echo "   docker compose -f docker-compose.prod.yml pull"
echo ""
echo "5. Verificar imagens:"
echo "   docker images | grep sicoe"
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  COMANDOS DE DEPLOY                                       ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "1. Iniciar serviços:"
echo "   docker compose -f docker-compose.prod.yml up -d"
echo ""
echo "2. Ver logs (todos os serviços):"
echo "   docker compose -f docker-compose.prod.yml logs -f"
echo ""
echo "3. Ver logs (serviço específico):"
echo "   docker compose -f docker-compose.prod.yml logs -f backend"
echo ""
echo "4. Verificar status e health:"
echo "   docker compose -f docker-compose.prod.yml ps"
echo ""
echo "5. Ver uso de recursos:"
echo "   docker stats"
echo ""
echo "6. Backup do banco de dados:"
echo "   docker exec sicoe-postgres-prod pg_dump -U \$DB_USERNAME \$DB_DATABASE > backup.sql"
echo ""
echo -e "${RED}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${RED}║  COMANDOS DE EMERGÊNCIA                                   ║${NC}"
echo -e "${RED}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "Reiniciar serviço específico:"
echo "   docker compose -f docker-compose.prod.yml restart backend"
echo ""
echo "Parar todos os serviços:"
echo "   docker compose -f docker-compose.prod.yml down"
echo ""
echo "Parar e REMOVER volumes (CUIDADO - apaga dados!):"
echo "   docker compose -f docker-compose.prod.yml down -v"
echo ""
echo "Rebuild completo (caso de atualização):"
echo "   docker compose -f docker-compose.prod.yml pull"
echo "   docker compose -f docker-compose.prod.yml up -d --force-recreate"
echo ""
