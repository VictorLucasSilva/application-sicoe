# 📊 MAPEAMENTO COMPLETO DE VARIÁVEIS DE AMBIENTE - SICOE

> **Última Atualização:** 2026-03-02
> **Projeto:** SICOE - Sistema de Controle de Estabelecimentos
> **Arquitetura:** NestJS (Backend) + React/Vite (Frontend) + PostgreSQL

---

## 📁 1. ESTRUTURA DE ARQUIVOS

```
/home/victor/app-sicoe/
│
├── sicoe-backend/
│   ├── .env                    → LOCAL (desenvolvimento direto)
│   ├── .env.development        → AZURE DEV (laboratório)
│   ├── .env.production         → AZURE PROD (produção)
│   └── .env.example            → Template
│
├── sicoe-frontend/
│   ├── .env                    → LOCAL (Vite dev server)
│   ├── .env.development        → AZURE DEV (build para laboratório)
│   ├── .env.production         → AZURE PROD (build para produção)
│   ├── .env.local              → DOCKER LOCAL (build para sicoe-local)
│   └── .env.example            → Template
│
├── sicoe-local/
│   ├── .env                    → DOCKER COMPOSE LOCAL (orquestração)
│   ├── .env.example            → Template
│   └── docker-compose.yml      → Orquestra 3 containers
│
└── deploy/
    ├── dev/
    │   ├── .env                → DEPLOY DEV (GitHub Actions)
    │   ├── .env.example        → Template
    │   └── docker-compose.dev.yml
    └── prod/
        ├── .env                → DEPLOY PROD (GitHub Actions)
        ├── .env.example        → Template
        └── docker-compose.prod.yml
```

---

## 🔄 2. FLUXOS DOS AMBIENTES

### 2.1 AMBIENTE LOCAL (Desenvolvimento Rápido)

```
┌─────────────────────────────────────────────────────────────┐
│                    AMBIENTE LOCAL                            │
│                                                              │
│  Desenvolvedor                                              │
│       ↓                                                      │
│  cd sicoe-local/                                            │
│  docker-compose up --build                                  │
│       ↓                                                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Docker Compose lê: sicoe-local/.env                  │  │
│  └──────────────────────────────────────────────────────┘  │
│       ↓                                                      │
│  ┌───────────────┬────────────────┬─────────────────────┐  │
│  │               │                │                     │  │
│  │  PostgreSQL   │    Backend     │     Frontend        │  │
│  │  :5432        │    :3000       │     :5173 (Nginx)   │  │
│  │               │                │                     │  │
│  │  Recebe:      │  Recebe:       │  Recebe (build):    │  │
│  │  DB_USERNAME  │  DB_HOST       │  VITE_API_BASE_URL  │  │
│  │  DB_PASSWORD  │  DB_USERNAME   │  VITE_ENV=local     │  │
│  │  DB_DATABASE  │  DB_PASSWORD   │                     │  │
│  │               │  JWT_SECRET    │                     │  │
│  │  Cria tabelas │  CORS_ORIGIN   │  Frontend chama:    │  │
│  │  via TypeORM  │  DB_SYNC=true  │  http://localhost:  │  │
│  │  (auto)       │                │  3000/api/v1        │  │
│  └───────────────┴────────────────┴─────────────────────┘  │
│                                                              │
│  Acesso:                                                     │
│  • Frontend: http://localhost:5173                          │
│  • Backend: http://localhost:3000/api/v1                    │
│  • DB: localhost:5432                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Fluxo de Dados:**
1. Docker Compose lê `sicoe-local/.env`
2. Cria 3 containers na rede `sicoe-network`
3. PostgreSQL sobe primeiro (healthcheck: `pg_isready`)
4. Backend aguarda PostgreSQL estar healthy
5. Backend cria tabelas automaticamente (`DB_SYNCHRONIZE=true`)
6. Frontend aguarda Backend estar healthy
7. Frontend serve build estático via Nginx na porta 5173

**Arquivos Envolvidos:**
- `sicoe-local/.env` → Variáveis de orquestração
- `sicoe-local/docker-compose.yml` → Definição dos containers
- `sicoe-backend/Dockerfile` → Build do backend
- `sicoe-frontend/Dockerfile` → Build do frontend

---

### 2.2 AMBIENTE DEVELOPMENT (Azure - Laboratório)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AMBIENTE DEVELOPMENT (AZURE)                      │
│                                                                      │
│  Desenvolvedor                                                       │
│       ↓                                                              │
│  git push origin develop                                            │
│       ↓                                                              │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ GitHub Actions (.github/workflows/deploy-dev.yml)            │  │
│  │   • Faz build do Backend com .env.development                │  │
│  │   • Faz build do Frontend com .env.development               │  │
│  │   • Publica imagens no GitHub Container Registry (GHCR)      │  │
│  │     - ghcr.io/[repo]/backend:develop                         │  │
│  │     - ghcr.io/[repo]/frontend:develop                        │  │
│  └──────────────────────────────────────────────────────────────┘  │
│       ↓                                                              │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Azure Container Instances ou Azure Web Apps                  │  │
│  │   • Puxa imagens do GHCR                                     │  │
│  │   • Usa deploy/dev/.env para variáveis de runtime           │  │
│  └──────────────────────────────────────────────────────────────┘  │
│       ↓                                                              │
│  ┌────────────────┬─────────────────┬──────────────────────────┐  │
│  │                │                 │                          │  │
│  │  Azure DB      │   Backend       │   Frontend               │  │
│  │  PostgreSQL    │   App Service   │   App Service            │  │
│  │                │                 │                          │  │
│  │  Host:         │  Conecta:       │  Build com:              │  │
│  │  sicoe-dev.    │  sicoe-dev...   │  VITE_API_BASE_URL=      │  │
│  │  postgres...   │  (SSL obrig.)   │  https://sicoe-dev.      │  │
│  │                │                 │  azurewebsites.net/api/  │  │
│  │  SSL: true     │  Usa:           │                          │  │
│  │  Reject: false │  JWT_SECRET     │  Usa:                    │  │
│  │                │  CORS_ORIGIN    │  Azure Blob Storage      │  │
│  │                │  AZURE_AD_*     │  (sicoedevstg)           │  │
│  │                │  SendGrid       │                          │  │
│  └────────────────┴─────────────────┴──────────────────────────┘  │
│                                                                      │
│  Acesso:                                                             │
│  • Frontend: https://sicoe-dev-frontend.azurewebsites.net           │
│  • Backend: https://sicoe-dev.azurewebsites.net/api/v1              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Fluxo de Dados:**
1. Push para branch `develop` dispara GitHub Actions
2. CI/CD faz build usando `.env.development` de cada projeto
3. Imagens publicadas no GitHub Container Registry
4. Azure puxa imagens e cria containers
5. Variáveis de `deploy/dev/.env` são injetadas em runtime
6. Backend conecta ao Azure Database for PostgreSQL (SSL obrigatório)
7. Frontend acessa backend via HTTPS

**Arquivos Envolvidos:**
- `sicoe-backend/.env.development` → Build-time + Runtime
- `sicoe-frontend/.env.development` → Build-time (VITE vars)
- `deploy/dev/.env` → Runtime (Azure)
- `.github/workflows/deploy-dev.yml` → CI/CD

**Características:**
- SSL: Obrigatório (certificado auto-assinado permitido)
- Logging: Habilitado (debug)
- Rate Limiting: 100 req/min
- Azure AD: Configurado
- Blob Storage: `sicoedevstg` (desenvolvimento)
- Email: SendGrid (dev)

---

### 2.3 AMBIENTE PRODUCTION (Azure - Produção)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AMBIENTE PRODUCTION (AZURE)                       │
│                                                                      │
│  Administrador                                                       │
│       ↓                                                              │
│  git push origin main (ou tag release)                              │
│       ↓                                                              │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ GitHub Actions (.github/workflows/deploy-prod.yml)           │  │
│  │   • Faz build do Backend com .env.production                 │  │
│  │   • Faz build do Frontend com .env.production                │  │
│  │   • Publica imagens no GitHub Container Registry (GHCR)      │  │
│  │     - ghcr.io/[repo]/backend:latest                          │  │
│  │     - ghcr.io/[repo]/frontend:latest                         │  │
│  │   • Testes automatizados obrigatórios                        │  │
│  └──────────────────────────────────────────────────────────────┘  │
│       ↓                                                              │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Azure Container Instances ou Azure Kubernetes (AKS)          │  │
│  │   • Puxa imagens do GHCR                                     │  │
│  │   • Usa deploy/prod/.env para variáveis de runtime          │  │
│  │   • Health checks obrigatórios                               │  │
│  └──────────────────────────────────────────────────────────────┘  │
│       ↓                                                              │
│  ┌────────────────┬─────────────────┬──────────────────────────┐  │
│  │                │                 │                          │  │
│  │  Azure DB      │   Backend       │   Frontend               │  │
│  │  PostgreSQL    │   App Service   │   App Service            │  │
│  │                │   (Premium)     │   (Premium)              │  │
│  │                │                 │                          │  │
│  │  Host:         │  Conecta:       │  Build com:              │  │
│  │  sicoe-prod.   │  sicoe-prod...  │  VITE_API_BASE_URL=      │  │
│  │  postgres...   │  (SSL obrig.)   │  https://sicoe.          │  │
│  │                │                 │  azurewebsites.net/api/  │  │
│  │  SSL: true     │  Usa:           │                          │  │
│  │  Reject: true  │  JWT_SECRET     │  Usa:                    │  │
│  │  Logging: off  │  CORS_ORIGIN    │  Azure Blob Storage      │  │
│  │                │  AZURE_AD_*     │  (sicoeprodstg)          │  │
│  │                │  SendGrid       │                          │  │
│  │                │  Throttle:200   │                          │  │
│  └────────────────┴─────────────────┴──────────────────────────┘  │
│                                                                      │
│  Acesso:                                                             │
│  • Frontend: https://sicoe-frontend.azurewebsites.net               │
│  • Backend: https://sicoe.azurewebsites.net/api/v1                  │
│                                                                      │
│  Monitoramento:                                                      │
│  • Azure Application Insights                                       │
│  • Azure Monitor                                                     │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Fluxo de Dados:**
1. Push para branch `main` ou criação de tag dispara GitHub Actions
2. CI/CD executa testes obrigatórios antes do build
3. Build usando `.env.production` de cada projeto
4. Imagens publicadas com tag `latest` no GHCR
5. Azure puxa imagens e cria containers com health checks
6. Variáveis de `deploy/prod/.env` injetadas em runtime
7. Backend conecta ao Azure Database (SSL rigoroso)
8. Monitoramento ativo via Application Insights

**Arquivos Envolvidos:**
- `sicoe-backend/.env.production` → Build-time + Runtime
- `sicoe-frontend/.env.production` → Build-time (VITE vars)
- `deploy/prod/.env` → Runtime (Azure)
- `.github/workflows/deploy-prod.yml` → CI/CD

**Características:**
- SSL: Obrigatório (certificado validado)
- Logging: Desabilitado (performance)
- Rate Limiting: 200 req/min
- Azure AD: Produção
- Blob Storage: `sicoeprodstg` (produção)
- Email: SendGrid (produção)
- Segurança máxima

---

## 📋 3. TABELA COMPARATIVA DE AMBIENTES

| Aspecto | LOCAL | DEVELOPMENT | PRODUCTION |
|---------|-------|-------------|------------|
| **Localização** | Docker Local | Azure Dev | Azure Prod |
| **Database Host** | `localhost:5432` | `sicoe-dev.postgres.database.azure.com` | `sicoe-prod.postgres.database.azure.com` |
| **Database SSL** | ❌ Não | ✅ Sim (permissivo) | ✅ Sim (restritivo) |
| **DB_SSL_REJECT_UNAUTHORIZED** | N/A | `false` | `true` |
| **DB_LOGGING** | ✅ `true` | ✅ `true` | ❌ `false` |
| **DB_SYNCHRONIZE** | ✅ `true` (auto-create tables) | ❌ `false` | ❌ `false` |
| **Rate Limiting** | 10 req/min | 100 req/min | 200 req/min |
| **CORS Origin** | `http://localhost:5173` | `https://sicoe-dev-frontend...` | `https://sicoe-frontend...` |
| **JWT Secret** | Simples (dev) | Seguro (32+ chars) | Muito Seguro (64+ chars) |
| **Email Provider** | SMTP Genérico | SendGrid (dev) | SendGrid (prod) |
| **Blob Storage** | Emulador Azurite | `sicoedevstg` | `sicoeprodstg` |
| **Frontend URL** | `http://localhost:5173` | `https://sicoe-dev-frontend.azurewebsites.net` | `https://sicoe-frontend.azurewebsites.net` |
| **Backend URL** | `http://localhost:3000` | `https://sicoe-dev.azurewebsites.net` | `https://sicoe.azurewebsites.net` |
| **Deploy Method** | `docker-compose up` | GitHub Actions → GHCR → Azure | GitHub Actions → GHCR → Azure |
| **Monitoramento** | Docker Logs | Azure Monitor | Application Insights + Monitor |
| **Health Checks** | Docker Health | Azure Health Probes | Azure Health Probes + Alertas |

---

## 🔑 4. VARIÁVEIS PRINCIPAIS POR ARQUIVO

### 4.1 Backend Local (`sicoe-backend/.env`)
```bash
NODE_ENV=local
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=sicoe_user
DB_PASSWORD=sicoe_password_secure_123
DB_DATABASE=sicoe_db
DB_SYNCHRONIZE=false
DB_LOGGING=true
JWT_SECRET=sicoe-jwt-secret-key-development-2024
CORS_ORIGIN=http://localhost:5174
```

### 4.2 Backend Development (`sicoe-backend/.env.development`)
```bash
NODE_ENV=development
PORT=3000
DB_HOST=sicoe-dev.postgres.database.azure.com
DB_USERNAME=sicoe_admin@sicoe-dev
DB_PASSWORD=your-azure-db-password-dev
DB_DATABASE=sicoe_db_dev
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=sicoe-jwt-secret-development-change-in-production
AZURE_AD_CLIENT_ID=your-client-id-dev
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=...
CORS_ORIGIN=https://sicoe-dev-frontend.azurewebsites.net
```

### 4.3 Backend Production (`sicoe-backend/.env.production`)
```bash
NODE_ENV=production
PORT=3000
DB_HOST=sicoe-prod.postgres.database.azure.com
DB_USERNAME=sicoe_admin@sicoe-prod
DB_PASSWORD=your-azure-db-password-prod
DB_DATABASE=sicoe_db_prod
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=true
DB_LOGGING=false
JWT_SECRET=your-strong-jwt-secret-production-change-this
AZURE_AD_CLIENT_ID=your-client-id-prod
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=...
CORS_ORIGIN=https://sicoe-frontend.azurewebsites.net
THROTTLE_LIMIT=200
```

### 4.4 Frontend Local (`sicoe-frontend/.env`)
```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_ENV=development
NODE_ENV=development
```

### 4.5 Frontend Development (`sicoe-frontend/.env.development`)
```bash
VITE_API_BASE_URL=https://sicoe-dev.azurewebsites.net/api/v1
VITE_ENV=development
VITE_APP_NAME=SICOE - Development
VITE_AZURE_STORAGE_URL=https://sicoedevstg.blob.core.windows.net
VITE_AZURE_STORAGE_CONTAINER=sicoe-files-dev
NODE_ENV=development
```

### 4.6 Frontend Production (`sicoe-frontend/.env.production`)
```bash
VITE_API_BASE_URL=https://sicoe.azurewebsites.net/api/v1
VITE_ENV=production
VITE_APP_NAME=SICOE - Sistema de Controle de Estabelecimentos
VITE_AZURE_STORAGE_URL=https://sicoeprodstg.blob.core.windows.net
VITE_AZURE_STORAGE_CONTAINER=sicoe-files-prod
NODE_ENV=production
```

### 4.7 Docker Local (`sicoe-local/.env`)
```bash
NODE_ENV=local
DB_USERNAME=sicoe_user
DB_PASSWORD=sicoe_password_secure_123
DB_DATABASE=sicoe_db
DB_PORT=5432
DB_SYNCHRONIZE=true
BACKEND_PORT=3000
FRONTEND_PORT=5173
VITE_API_BASE_URL=http://localhost:3000/api/v1
JWT_SECRET=your-jwt-secret-key-change-this-in-production-minimum-32-chars
CORS_ORIGIN=http://localhost:5173
```

---

## 🚀 5. COMO USAR CADA AMBIENTE

### 5.1 Rodar Localmente com Docker

```bash
# 1. Entrar no diretório
cd /home/victor/app-sicoe/sicoe-local

# 2. (Opcional) Editar variáveis
nano .env

# 3. Subir containers
docker-compose up --build -d

# 4. Ver logs
docker logs sicoe-backend -f
docker logs sicoe-frontend -f
docker logs sicoe-postgres -f

# 5. Acessar
# Frontend: http://localhost:5173
# Backend: http://localhost:3000/api/v1
# Database: localhost:5432

# 6. Parar containers
docker-compose down

# 7. Parar e remover volumes (apaga dados)
docker-compose down -v
```

### 5.2 Deploy para Development (Azure)

```bash
# 1. Configurar .env de development
cd /home/victor/app-sicoe/sicoe-backend
nano .env.development  # Adicionar credenciais Azure reais

cd /home/victor/app-sicoe/sicoe-frontend
nano .env.development  # Adicionar URLs Azure

# 2. (Se usando docker-compose) Deploy manual
cd /home/victor/app-sicoe/deploy/dev
nano .env  # Configurar variáveis do deploy
docker-compose -f docker-compose.dev.yml up -d

# 3. (Se usando GitHub Actions) Push para develop
git checkout develop
git push origin develop
# GitHub Actions fará o deploy automaticamente
```

### 5.3 Deploy para Production (Azure)

```bash
# 1. Configurar .env de produção
cd /home/victor/app-sicoe/sicoe-backend
nano .env.production  # Adicionar credenciais Azure de produção

cd /home/victor/app-sicoe/sicoe-frontend
nano .env.production  # Adicionar URLs de produção

# 2. Criar tag de release
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# 3. Ou push para main (se configurado)
git checkout main
git merge develop
git push origin main
# GitHub Actions fará o deploy automaticamente
```

### 5.4 Build Manual do Frontend

```bash
cd /home/victor/app-sicoe/sicoe-frontend

# Para local
npm run dev  # Usa .env automaticamente

# Para desenvolvimento (build estático)
npm run build  # Usa .env.development se NODE_ENV=development

# Para produção (build estático)
NODE_ENV=production npm run build  # Usa .env.production

# Preview do build
npm run preview
```

---

## ⚠️ 6. SEGURANÇA E BOAS PRÁTICAS

### 6.1 Variáveis Sensíveis (NUNCA COMITAR)

❌ **NUNCA comitar no Git:**
- `DB_PASSWORD`
- `JWT_SECRET`
- `AZURE_AD_CLIENT_SECRET`
- `AZURE_STORAGE_CONNECTION_STRING`
- `EMAIL_PASSWORD` (SendGrid API Key)

✅ **Sempre usar:**
- Arquivos `.env.example` com valores placeholder
- `.gitignore` incluindo `*.env` (exceto `.env.example`)
- Azure Key Vault para produção
- GitHub Secrets para CI/CD

### 6.2 Checklist de Segurança

**Local:**
- [ ] Usar senhas simples apenas para dev
- [ ] `DB_SYNCHRONIZE=true` permitido
- [ ] Logging habilitado

**Development:**
- [ ] `JWT_SECRET` mínimo 32 caracteres
- [ ] `DB_SSL=true`
- [ ] `DB_SSL_REJECT_UNAUTHORIZED=false` (certificado auto-assinado OK)
- [ ] Rate limiting moderado (100 req/min)
- [ ] Logging habilitado para debug

**Production:**
- [ ] `JWT_SECRET` mínimo 64 caracteres (muito forte)
- [ ] `DB_SSL=true`
- [ ] `DB_SSL_REJECT_UNAUTHORIZED=true` (certificado validado)
- [ ] `DB_LOGGING=false` (performance)
- [ ] Rate limiting alto (200 req/min)
- [ ] Azure AD obrigatório
- [ ] Monitoramento ativo

### 6.3 Rotação de Secrets

**Recomendação:**
- JWT Secret: Rotacionar a cada 90 dias
- Database Password: Rotacionar a cada 180 dias
- Azure AD Client Secret: Rotacionar conforme política Azure
- SendGrid API Key: Rotacionar a cada 90 dias

---

## 📚 7. REFERÊNCIAS

### Arquivos de Configuração
- `sicoe-backend/src/config/database.config.ts` - Lê variáveis de DB
- `sicoe-backend/src/config/security.config.ts` - Lê CORS e JWT
- `sicoe-backend/src/config/env.validation.ts` - Valida variáveis obrigatórias
- `sicoe-frontend/vite.config.ts` - Configuração Vite
- `sicoe-local/docker-compose.yml` - Orquestração local

### Documentação
- [NestJS Configuration](https://docs.nestjs.com/techniques/configuration)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Docker Compose Environment Variables](https://docs.docker.com/compose/environment-variables/)
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/)
- [Azure Blob Storage](https://docs.microsoft.com/azure/storage/blobs/)

---

## 📝 8. HISTÓRICO DE MUDANÇAS

| Data | Versão | Mudanças |
|------|--------|----------|
| 2026-03-02 | 1.0 | Criação do documento de mapeamento completo |
| 2026-03-01 | 0.9 | Sistema local funcionando com Docker |
| 2026-02-27 | 0.8 | Integração backend + frontend completa |
| 2026-02-26 | 0.5 | Estrutura inicial do projeto |

---

## 🎯 9. PRÓXIMOS PASSOS

### Configuração Pendente

**Azure Development:**
- [ ] Criar Azure Database for PostgreSQL (sicoe-dev)
- [ ] Criar Azure Blob Storage (sicoedevstg)
- [ ] Configurar Azure AD App Registration (dev)
- [ ] Configurar SendGrid API Key (dev)
- [ ] Atualizar `.env.development` com valores reais

**Azure Production:**
- [ ] Criar Azure Database for PostgreSQL (sicoe-prod)
- [ ] Criar Azure Blob Storage (sicoeprodstg)
- [ ] Configurar Azure AD App Registration (prod)
- [ ] Configurar SendGrid API Key (prod)
- [ ] Atualizar `.env.production` com valores reais

**CI/CD:**
- [ ] Configurar GitHub Actions para deploy-dev.yml
- [ ] Configurar GitHub Actions para deploy-prod.yml
- [ ] Adicionar secrets no GitHub (Azure credentials)
- [ ] Configurar GitHub Container Registry (GHCR)

**Monitoramento:**
- [ ] Configurar Azure Application Insights
- [ ] Configurar Azure Monitor Alerts
- [ ] Configurar logs centralizados

---

**Documento Mantido Por:** Equipe SICOE
**Contato:** sicoe-dev@example.com
