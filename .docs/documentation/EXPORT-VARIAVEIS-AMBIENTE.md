# EXPORT DE VARIÁVEIS DE AMBIENTE

**Data:** 2026-03-05
**Documento:** Export de variáveis para ambientes Local e Azure Dev

---

## 1. AMBIENTE LOCAL (Full Local)

### 1.1 Backend - Local

```bash
export NODE_ENV=local

export DB_HOST=postgres
export DB_PORT=5432
export DB_USERNAME=sicoe_user
export DB_PASSWORD=sicoe_password
export DB_DATABASE=sicoe_db
export DB_SYNCHRONIZE=false
export DB_LOGGING=true
export DB_SSL=false
export DB_SSL_REJECT_UNAUTHORIZED=false

export JWT_SECRET=sicoe-jwt-secret-key-development-2024
export JWT_EXPIRATION=1h
export JWT_REFRESH_EXPIRATION=7d

export CORS_ORIGIN=http://localhost:5173
export CORS_CREDENTIALS=true

export THROTTLE_TTL=60
export THROTTLE_LIMIT=10

export AZURE_STORAGE_CONNECTION_STRING=
export AZURE_STORAGE_MEDIA_CONTAINER=media
export AZURE_STORAGE_GENERIC_CONTAINER=storage
```

### 1.2 Frontend - Local

```bash
export VITE_API_BASE_URL=http://localhost:3000/api/v1
export VITE_ENV=local
export VITE_APP_NAME="SICOE - Local"
```

### 1.3 Comando para Carregar (Local)

```bash
cd /home/victor/app-sicoe/sicoe-local
source export-env-local.sh
```

---

## 2. AMBIENTE AZURE DEV (Desenvolvimento)

### 2.1 Backend - Azure Dev

```bash
export NODE_ENV=development
export APP_NAME="SICOE Backend"

export DB_HOST=<azure-postgres-host>.postgres.database.azure.com
export DB_PORT=5432
export DB_USERNAME=sicoe_dev_user
export DB_PASSWORD=<secure-password>
export DB_DATABASE=sicoe_dev_db
export DB_SYNCHRONIZE=false
export DB_LOGGING=true
export DB_SSL=true
export DB_SSL_REJECT_UNAUTHORIZED=true

export JWT_SECRET=<jwt-secret-minimum-32-chars>
export JWT_EXPIRATION=1h
export JWT_REFRESH_EXPIRATION=7d

export AZURE_AD_TENANT_ID=<tenant-id>
export AZURE_AD_CLIENT_ID=<client-id>
export AZURE_AD_CLIENT_SECRET=<client-secret>
export AZURE_AD_REDIRECT_URI=http://localhost:3000/auth/callback

export CORS_ORIGIN=http://localhost:5173
export CORS_CREDENTIALS=true

export THROTTLE_TTL=60
export THROTTLE_LIMIT=10

export EMAIL_HOST=smtp.office365.com
export EMAIL_PORT=587
export EMAIL_USER=<email-user>
export EMAIL_PASSWORD=<email-password>
export EMAIL_FROM="SICOE <noreply@sicoe.com>"

export AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=<account-name>;AccountKey=<account-key>;EndpointSuffix=core.windows.net"
export AZURE_STORAGE_MEDIA_CONTAINER=media
export AZURE_STORAGE_GENERIC_CONTAINER=storage

export GITHUB_REPOSITORY=your-org/sicoe
```

### 2.2 Frontend - Azure Dev

```bash
export VITE_API_BASE_URL=http://localhost:3000/api/v1
export VITE_ENV=development
export VITE_APP_NAME="SICOE - Desenvolvimento"
```

### 2.3 Comando para Carregar (Azure Dev)

```bash
cd /home/victor/app-sicoe/sicoe-local
source export-env-azure-dev.sh
```

⚠️ **ATENÇÃO:** Substitua todos os valores `<placeholders>` pelas credenciais reais do Azure antes de usar!

---

## 3. TABELA COMPARATIVA

| Variável | Local | Azure Dev |
|----------|-------|-----------|
| **NODE_ENV** | local | development |
| **DB_HOST** | postgres | <azure-postgres-host>.postgres.database.azure.com |
| **DB_USERNAME** | sicoe_user | sicoe_dev_user |
| **DB_PASSWORD** | sicoe_password | <secure-password> |
| **DB_DATABASE** | sicoe_db | sicoe_dev_db |
| **DB_SSL** | false | true |
| **DB_SSL_REJECT_UNAUTHORIZED** | false | true |
| **JWT_SECRET** | sicoe-jwt-secret-key-development-2024 | <jwt-secret-minimum-32-chars> |
| **AZURE_STORAGE_CONNECTION_STRING** | (vazio) | DefaultEndpointsProtocol=https;... |
| **VITE_ENV** | local | development |

---

## 4. USO COM DOCKER COMPOSE

### 4.1 Local (com postgres container)

```bash
cd sicoe-local
docker-compose --profile local-only up -d
```

### 4.2 Azure Dev (sem postgres container)

```bash
cd sicoe-local
docker-compose up -d
```

---

## 5. USO SEM DOCKER (Desenvolvimento Direto)

### 5.1 Backend Local

```bash
cd sicoe-backend
source ../sicoe-local/export-env-local.sh
npm run start:dev
```

### 5.2 Frontend Local

```bash
cd sicoe-frontend
source ../sicoe-local/export-env-local.sh
npm run dev
```

### 5.3 Backend Azure Dev

```bash
cd sicoe-backend
source ../sicoe-local/export-env-azure-dev.sh
npm run start:dev
```

### 5.4 Frontend Azure Dev

```bash
cd sicoe-frontend
source ../sicoe-local/export-env-azure-dev.sh
npm run dev
```

---

## 6. CHECKLIST DE CONFIGURAÇÃO

### Local ✅
- [x] DB_HOST=postgres
- [x] DB_SSL=false
- [x] AZURE_STORAGE_CONNECTION_STRING=(vazio)
- [x] Postgres container rodando

### Azure Dev ⚠️
- [ ] Substituir `<azure-postgres-host>` com host real
- [ ] Substituir `<secure-password>` com senha real
- [ ] Substituir `<jwt-secret-minimum-32-chars>` com secret real (min 32 chars)
- [ ] Substituir `<tenant-id>`, `<client-id>`, `<client-secret>` do Azure AD
- [ ] Substituir `<email-user>` e `<email-password>` do SMTP
- [ ] Substituir `<account-name>` e `<account-key>` do Azure Storage
- [ ] Configurar Firewall Rules no Azure PostgreSQL
- [ ] Criar containers `media` e `storage` no Azure Blob Storage

---

**Gerado por:** Claude Code
**Data:** 2026-03-05
