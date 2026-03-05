#!/bin/bash

set -e

echo "SICOE - Ambiente Local"
echo "======================"
echo ""

echo "Parando containers existentes..."
docker compose down

echo ""
echo "Subindo containers (postgres + backend + frontend)..."
docker compose up -d

echo ""
echo "Aguardando containers ficarem prontos..."
sleep 10

echo ""
echo "Inicializando banco de dados..."
./init-database.sh

echo ""
echo "Ambiente local inicializado com sucesso!"
echo ""