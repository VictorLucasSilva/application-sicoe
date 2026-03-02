#!/bin/sh
set -e

echo "🔄 Aguardando banco de dados estar pronto..."
sleep 5

echo "🔄 Executando migrations..."
if npm run migration:run; then
  echo "✅ Migrations executadas com sucesso"
else
  echo "⚠️  Migrations falharam ou já foram executadas"
fi

echo "🌱 Executando seeds..."
if npm run seed:run; then
  echo "✅ Seeds executados com sucesso"
else
  echo "⚠️  Seeds falharam ou já foram executados"
fi

echo "🚀 Iniciando aplicação SICOE..."
exec node dist/main
