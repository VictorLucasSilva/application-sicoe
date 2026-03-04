#!/bin/bash

# Script para criar usuário Azure no PostgreSQL local
# Permite usar credenciais Azure com PostgreSQL local

echo "🔧 Criando usuário Azure no PostgreSQL local..."

# Criar usuário e database
docker exec sicoe-postgres psql -U sicoe_user -d sicoe_db -c "
CREATE USER usr_painel_estabelecimentos WITH PASSWORD 'z7eY-MWTt';
CREATE DATABASE painel_estabelecimentos_db OWNER usr_painel_estabelecimentos;
GRANT ALL PRIVILEGES ON DATABASE painel_estabelecimentos_db TO usr_painel_estabelecimentos;
"

echo "✅ Usuário usr_painel_estabelecimentos criado!"
echo ""
echo "Agora pode conectar com as credenciais do Azure no PostgreSQL local:"
echo "  DB_HOST=postgres"
echo "  DB_USERNAME=usr_painel_estabelecimentos"
echo "  DB_PASSWORD=z7eY-MWTt"
echo "  DB_DATABASE=painel_estabelecimentos_db"
