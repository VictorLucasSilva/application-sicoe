
set -e

echo "Starting SICOE Backend..."
echo "Environment: $NODE_ENV"
echo "Database Host: $DB_HOST"

if [ "$DB_HOST" = "postgres" ]; then
  echo "Waiting for PostgreSQL to be ready..."
  until nc -z postgres 5432; do
    echo "PostgreSQL is unavailable - sleeping"
    sleep 2
  done
  echo "PostgreSQL is up - continuing"

  echo "Running migrations..."
  npm run migration:run || echo "Migrations already applied or failed"

  echo "Running seeds..."
  npm run seed:run || echo "Seeds already applied or failed"
fi

exec node dist/main.js
