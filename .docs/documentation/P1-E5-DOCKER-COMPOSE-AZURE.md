# DOCKER COMPOSE - CONFIGURAÇÃO AZURE

**Data:** 2026-03-05
**Processo:** P1 - Etapa 1.5
**Status:** ✅ Concluído

---

## 1. CONFIGURAÇÃO REALIZADA

### 1.1 Ordem de Prioridade das Variáveis

```
1. Variáveis de ambiente (.env ou sistema operacional)
2. Valores default conforme tipo:
   - DB e Storage: DESENVOLVIMENTO (Azure)
   - Demais: LOCAL
```

### 1.2 Valores Default

**DB e Storage (Azure Dev):**
```yaml
DB_HOST: <azure-postgres-host>.postgres.database.azure.com
DB_PORT: 5432
DB_USERNAME: sicoe_dev_user
DB_PASSWORD: change-password
DB_DATABASE: sicoe_dev_db
DB_SSL: true
DB_SSL_REJECT_UNAUTHORIZED: true
AZURE_STORAGE_CONNECTION_STRING: (vazio)
AZURE_STORAGE_MEDIA_CONTAINER: media
AZURE_STORAGE_GENERIC_CONTAINER: storage
```

**Demais Variáveis (Local):**
```yaml
NODE_ENV: local
JWT_SECRET: sicoe-jwt-secret-key-development-2024
CORS_ORIGIN: http://localhost:5173
```

---

## 2. CENÁRIOS SUPORTADOS

### 2.1 Cenário 1: Azure Dev (SEM .env)

**Descrição:** Roda localmente conectando em Azure PostgreSQL + Azure Blob Storage (dev)

**Comando:**
```bash
cd sicoe-local
docker-compose up -d
```

**Comportamento:**
- DB: Tenta conectar em Azure (precisa configurar host real no código)
- Storage: Usa Azure (precisa connection string)
- Demais: Valores locais (NODE_ENV=local, JWT local, CORS local)

**Pré-requisitos:**
- Recursos Azure criados
- Ajustar `<azure-postgres-host>` no docker-compose.yml com host real
- Configurar AZURE_STORAGE_CONNECTION_STRING

---

### 2.2 Cenário 2: Totalmente Local (COM .env.local)

**Descrição:** Roda tudo localmente (postgres container + storage local)

**Comando:**
```bash
cd sicoe-local
docker-compose --profile local-only up -d
```

**Arquivo .env necessário (.env.local):**
```bash
NODE_ENV=local
DB_HOST=postgres
DB_USERNAME=sicoe_user
DB_PASSWORD=sicoe_password
DB_DATABASE=sicoe_db
DB_SSL=false
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=sicoe-jwt-secret-key-development-2024
AZURE_STORAGE_CONNECTION_STRING=
```

**Serviços:**
- ✅ postgres (container local)
- ✅ backend (conecta postgres local)
- ✅ frontend

---

## 3. ESTRUTURA DO DOCKER-COMPOSE.YML

### 3.1 Serviço postgres

```yaml
profiles:
  - local-only
```

**Comportamento:**
- Apenas sobe com `--profile local-only`
- Padrão: NÃO sobe (usa Azure dev como default)

---

### 3.2 Serviço backend

**Variáveis DB e Storage (Default = Azure Dev):**
```yaml
DB_HOST: ${DB_HOST:-<azure-postgres-host>.postgres.database.azure.com}
DB_USERNAME: ${DB_USERNAME:-sicoe_dev_user}
DB_PASSWORD: ${DB_PASSWORD:-change-password}
DB_DATABASE: ${DB_DATABASE:-sicoe_dev_db}
DB_SSL: ${DB_SSL:-true}
DB_SSL_REJECT_UNAUTHORIZED: ${DB_SSL_REJECT_UNAUTHORIZED:-true}
AZURE_STORAGE_CONNECTION_STRING: ${AZURE_STORAGE_CONNECTION_STRING:-}
```

**Variáveis Demais (Default = Local):**
```yaml
NODE_ENV: ${NODE_ENV:-local}
JWT_SECRET: ${JWT_SECRET:-sicoe-jwt-secret-key-development-2024}
CORS_ORIGIN: ${CORS_ORIGIN:-http://localhost:5173}
```

**Comportamento:**
- Se `.env` define variável → usa esse valor (prioridade 1)
- Se não define → usa default específico por tipo (prioridade 2)

---

### 3.3 Serviço frontend

**Build Args:**
```yaml
VITE_API_BASE_URL: http://localhost:3000/api/v1
VITE_ENV: development
```

**Fixos** (não variáveis, sempre desenvolvimento)

---

## 4. ARQUIVO .env (AZURE DEV)

### 4.1 Obrigatório

```bash
DB_HOST=<azure-host>.postgres.database.azure.com
DB_USERNAME=sicoe_dev_user
DB_PASSWORD=<secure-password>
DB_DATABASE=sicoe_dev_db
JWT_SECRET=<minimum-32-chars>
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=<account>;AccountKey=<key>;EndpointSuffix=core.windows.net
```

### 4.2 Opcional (já tem defaults)

```bash
DB_PORT=5432
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=true
DB_LOGGING=true
AZURE_STORAGE_MEDIA_CONTAINER=media
AZURE_STORAGE_GENERIC_CONTAINER=storage
CORS_ORIGIN=http://localhost:5173
```

---

## 5. ARQUIVO .env (LOCAL ONLY)

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

## 6. VERIFICAÇÃO DE CONFIGURAÇÕES

### 6.1 PostgreSQL Azure

**Arquivo:** `sicoe-backend/src/data-source.ts`
**Linha:** 18-20

```typescript
ssl: process.env.DB_SSL === 'true' ? {
  rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
} : false,
```

**Status:** ✅ Configurado corretamente

---

### 6.2 Azure Blob Storage

**Arquivo:** `sicoe-backend/src/modules/storage/storage.service.ts`
**Linha:** 11-14

```typescript
const connectionString = this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');
this.mediaContainer = this.configService.get<string>('AZURE_STORAGE_MEDIA_CONTAINER', 'media');
this.genericContainer = this.configService.get<string>('AZURE_STORAGE_GENERIC_CONTAINER', 'storage');
```

**Status:** ✅ Configurado corretamente

**Containers:**
- ✅ `media` - PDFs do projeto
- ✅ `storage` - Arquivos genéricos

---

### 6.3 Database Config

**Arquivo:** `sicoe-backend/src/config/database.config.ts`
**Linha:** 21-25

```typescript
ssl: useSsl
  ? {
      rejectUnauthorized: configService.get<string>('DB_SSL_REJECT_UNAUTHORIZED', 'false') === 'true',
    }
  : false,
```

**Status:** ✅ Configurado corretamente

---

## 7. COMANDOS

### 7.1 Azure Dev (Padrão)

```bash
# Iniciar
cd sicoe-local
docker-compose up -d

# Logs
docker-compose logs -f backend

# Migrations
docker-compose exec backend npm run migration:run

# Seeds
docker-compose exec backend npm run seed:run

# Parar
docker-compose down
```

---

### 7.2 Local Only

```bash
# Iniciar (com postgres local)
cd sicoe-local
docker-compose --profile local-only up -d

# Logs
docker-compose logs -f postgres
docker-compose logs -f backend

# Parar
docker-compose --profile local-only down
```

---

## 8. TROUBLESHOOTING

### 8.1 Backend não conecta ao Azure PostgreSQL

**Verificar:**
1. Firewall Rules no Azure PostgreSQL
2. Variável `DB_HOST` no .env
3. Variável `DB_SSL=true`
4. Credenciais corretas

**Testar conexão:**
```bash
docker-compose exec backend npx typeorm query "SELECT version()"
```

---

### 8.2 Backend não conecta ao Azure Blob Storage

**Verificar:**
1. `AZURE_STORAGE_CONNECTION_STRING` no .env
2. Permissões da Storage Account
3. Container criado

**Testar:**
```bash
curl http://localhost:3000/api/v1/storage/test
```

---

### 8.3 Postgres local não sobe

**Problema:** Profile não ativado

**Solução:**
```bash
docker-compose --profile local-only up -d
```

---

## 9. RESUMO

| Item | Status | Observação |
|------|--------|------------|
| **PostgreSQL Azure** | ✅ OK | SSL configurado (data-source.ts + database.config.ts) |
| **Azure Blob Storage** | ✅ OK | 2 containers (media + storage) |
| **Docker Compose** | ✅ OK | Suporta Azure dev (padrão) e local-only |
| **Variáveis Ambiente** | ✅ OK | Prioridade: .env → Azure dev → Local |
| **Build Backend** | ✅ OK | Compilado com sucesso |

---

**Gerado por:** Claude Code (Análise Processo P1-E5)
**Data:** 2026-03-05
