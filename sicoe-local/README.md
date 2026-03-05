# SICOE - Ambiente Local

## Cenários Suportados

### Cenário 1: Local com Azure (Desenvolvimento) - PADRÃO

Roda aplicação localmente conectando em Azure PostgreSQL e Azure Blob Storage de desenvolvimento.

**Comando:**
```bash
docker-compose up -d
```

**Pré-requisitos:**
- Criar arquivo `.env` com credenciais Azure
- Recursos Azure criados (PostgreSQL + Storage Account)

**Arquivo .env:**
```bash
DB_HOST=<azure-host>.postgres.database.azure.com
DB_USERNAME=sicoe_dev_user
DB_PASSWORD=<password>
DB_DATABASE=sicoe_dev_db
JWT_SECRET=<secret>
AZURE_STORAGE_CONNECTION_STRING=<connection-string>
```

---

### Cenário 2: Totalmente Local

Roda aplicação localmente com PostgreSQL container e storage local.

**Comando:**
```bash
docker-compose --profile local-only up -d
```

**Arquivo .env:**
```bash
DB_HOST=postgres
DB_USERNAME=sicoe_user
DB_PASSWORD=sicoe_password
DB_DATABASE=sicoe_db
DB_SSL=false
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=sicoe-jwt-secret-key-development-2024
AZURE_STORAGE_CONNECTION_STRING=
```

---

## Configurações Default

O `docker-compose.yml` está configurado com valores default para **desenvolvimento (Azure)**:

```yaml
DB_HOST: <azure-postgres-host>.postgres.database.azure.com
DB_SSL: true
DB_SSL_REJECT_UNAUTHORIZED: true
AZURE_STORAGE_MEDIA_CONTAINER: media
AZURE_STORAGE_GENERIC_CONTAINER: storage
```

Para rodar totalmente local, use o profile `local-only` e sobrescreva via `.env`.

---

## Comandos Úteis

**Ver logs:**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

**Parar:**
```bash
docker-compose down
```

**Rebuild:**
```bash
docker-compose up -d --build
```

**Migrations:**
```bash
docker-compose exec backend npm run migration:run
```

**Seeds:**
```bash
docker-compose exec backend npm run seed:run
```

---

## Estrutura de Portas

- Backend: `3000`
- Frontend: `5173`
- PostgreSQL: `5432` (apenas com profile local-only)
