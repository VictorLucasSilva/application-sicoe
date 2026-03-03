#!/bin/bash

# ===================================
# SICOE - Configuração DEV/LAB
# ===================================
# Bash script para Linux/Mac
# Execute: source ./setup-env-dev.sh

echo "🔧 Configurando variáveis de ambiente DEV/LAB..."
echo ""

# Environment
export NODE_ENV="development"

# Database (Azure PostgreSQL)
# ⚠️  IMPORTANTE: Substitua os valores abaixo com as credenciais reais do Azure
export DB_HOST="<SEU-SERVIDOR>.postgres.database.azure.com"
export DB_PORT="5432"
export DB_USERNAME="<SEU-USUARIO>"
export DB_PASSWORD="<SUA-SENHA>"
export DB_DATABASE="<SEU-DATABASE>"
export DB_SSL="true"
export DB_SSL_REJECT_UNAUTHORIZED="false"
export DB_SYNCHRONIZE="false"
export DB_LOGGING="true"

# Azure Storage
# ⚠️  IMPORTANTE: Substitua com a connection string real do Azure Portal > Storage Account > Access Keys
export AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=<ACCOUNT-NAME>;AccountKey=<ACCESS-KEY>;EndpointSuffix=core.windows.net"
export AZURE_MEDIA_CONTAINER="media"

# JWT
export JWT_SECRET="sicoe-dev-secret-change-in-prod"

# CORS
export CORS_ORIGIN="http://localhost:5173"

echo "✅ Variáveis configuradas!"
echo ""
echo "📋 Variáveis carregadas:"
echo "  NODE_ENV: $NODE_ENV"
echo "  DB_HOST: $DB_HOST"
echo "  DB_DATABASE: $DB_DATABASE"
echo "  AZURE_MEDIA_CONTAINER: $AZURE_MEDIA_CONTAINER"
echo ""
echo "🚀 Para rodar o projeto:"
echo "  docker compose up -d"
echo ""
echo "🧪 Para testar:"
echo "  curl http://localhost:3000/api/v1/health/all"
echo ""
