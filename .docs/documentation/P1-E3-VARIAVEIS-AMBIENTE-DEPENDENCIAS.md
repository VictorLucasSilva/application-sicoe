# VARIÁVEIS DE AMBIENTE E DEPENDÊNCIAS DO PROJETO SICOE

**Data:** 2026-03-05
**Processo:** P1 - Etapa 1.3 (Atualizado)
**Status:** ✅ Concluído

---

## 1. VARIÁVEIS DE AMBIENTE (DESENVOLVIMENTO - AZURE)

### 1.1 Backend

#### Aplicação

```
NODE_ENV=development
Arquivo: sicoe-backend/.env
Descrição: Define o ambiente de execução (development, production, local)

PORT=3000
Arquivo: sicoe-backend/.env
Descrição: Porta HTTP onde o servidor NestJS irá rodar

APP_NAME=SICOE Backend
Arquivo: sicoe-backend/.env
Descrição: Nome da aplicação backend (usado em logs e mensagens)
```

---

#### Banco de Dados PostgreSQL (Azure)

```
DB_TYPE=postgres
Arquivo: sicoe-backend/.env
Descrição: Tipo de banco de dados (sempre postgres)

DB_HOST=<azure-postgres-host>.postgres.database.azure.com
Arquivo: sicoe-backend/.env
Descrição: Host do Azure Database for PostgreSQL (Flexible Server)

DB_PORT=5432
Arquivo: sicoe-backend/.env
Descrição: Porta de conexão do PostgreSQL (padrão 5432)

DB_USERNAME=sicoe_dev_user
Arquivo: sicoe-backend/.env
Descrição: Usuário de acesso ao banco de dados de desenvolvimento

DB_PASSWORD=change-this-secure-password-dev
Arquivo: sicoe-backend/.env
Descrição: Senha do usuário do banco de dados (mínimo 16 caracteres)

DB_DATABASE=sicoe_dev_db
Arquivo: sicoe-backend/.env
Descrição: Nome do database/schema no PostgreSQL

DB_SYNCHRONIZE=false
Arquivo: sicoe-backend/.env
Descrição: Se true, TypeORM sincroniza schema automaticamente (SEMPRE false em prod)

DB_LOGGING=true
Arquivo: sicoe-backend/.env
Descrição: Habilita logs de queries SQL do TypeORM (útil em dev)

DB_SSL=true
Arquivo: sicoe-backend/.env, sicoe-backend/src/data-source.ts, sicoe-backend/src/config/database.config.ts
Descrição: Habilita conexão SSL/TLS com PostgreSQL (obrigatório no Azure)

DB_SSL_REJECT_UNAUTHORIZED=true
Arquivo: sicoe-backend/.env, sicoe-backend/src/data-source.ts, sicoe-backend/src/config/database.config.ts
Descrição: Valida certificado SSL do servidor (true em produção)
```

---

#### Autenticação JWT

```
JWT_SECRET=change-this-jwt-secret-key-minimum-32-chars-dev
Arquivo: sicoe-backend/.env, sicoe-backend/src/modules/auth/auth.service.ts
Descrição: Chave secreta para assinar tokens JWT (mínimo 32 caracteres)

JWT_EXPIRATION=1h
Arquivo: sicoe-backend/.env, sicoe-backend/src/modules/auth/auth.service.ts
Descrição: Tempo de expiração do access token (1h = 1 hora)

JWT_REFRESH_EXPIRATION=7d
Arquivo: sicoe-backend/.env
Descrição: Tempo de expiração do refresh token (7d = 7 dias)
```

---

#### Azure Active Directory (EntraID)

```
AZURE_AD_TENANT_ID=your-azure-tenant-id
Arquivo: sicoe-backend/.env, sicoe-backend/src/modules/auth/strategies/msal.strategy.ts
Descrição: ID do tenant/diretório do Azure AD da organização

AZURE_AD_CLIENT_ID=your-azure-client-id
Arquivo: sicoe-backend/.env, sicoe-backend/src/modules/auth/strategies/msal.strategy.ts
Descrição: ID da aplicação registrada no Azure AD (App Registration)

AZURE_AD_CLIENT_SECRET=your-azure-client-secret
Arquivo: sicoe-backend/.env, sicoe-backend/src/modules/auth/strategies/msal.strategy.ts
Descrição: Secret da aplicação Azure AD (Client Secret/Certificate)

AZURE_AD_REDIRECT_URI=https://dev-api.sicoe.example.com/auth/callback
Arquivo: sicoe-backend/.env, sicoe-backend/src/modules/auth/auth.controller.ts
Descrição: URL de callback após autenticação no Azure AD
```

---

#### CORS

```
CORS_ORIGIN=https://dev.sicoe.example.com
Arquivo: sicoe-backend/.env, sicoe-backend/src/main.ts, sicoe-backend/src/config/security.config.ts
Descrição: Origem permitida para requisições CORS (URL do frontend)

CORS_CREDENTIALS=true
Arquivo: sicoe-backend/.env, sicoe-backend/src/main.ts
Descrição: Permite envio de cookies/credenciais em requisições CORS
```

---

#### Rate Limiting (Throttler)

```
THROTTLE_TTL=60
Arquivo: sicoe-backend/.env, sicoe-backend/src/config/security.config.ts
Descrição: Janela de tempo (segundos) para rate limiting (60s)

THROTTLE_LIMIT=10
Arquivo: sicoe-backend/.env, sicoe-backend/src/config/security.config.ts
Descrição: Número máximo de requisições por TTL (10 req/60s)
```

---

#### Email SMTP

```
EMAIL_HOST=smtp.office365.com
Arquivo: sicoe-backend/.env
Descrição: Host do servidor SMTP para envio de emails (Office 365)

EMAIL_PORT=587
Arquivo: sicoe-backend/.env
Descrição: Porta SMTP (587 para STARTTLS, 465 para SSL)

EMAIL_USER=noreply@sicoe.com
Arquivo: sicoe-backend/.env
Descrição: Usuário/email de autenticação no servidor SMTP

EMAIL_PASSWORD=<email-password>
Arquivo: sicoe-backend/.env
Descrição: Senha do usuário SMTP (usar App Password se disponível)

EMAIL_FROM=SICOE <noreply@sicoe.com>
Arquivo: sicoe-backend/.env, sicoe-backend/src/modules/email/email.service.ts
Descrição: Email e nome do remetente padrão das mensagens
```

---

#### Azure Blob Storage

```
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=<storage-account-name>;AccountKey=<storage-account-key>;EndpointSuffix=core.windows.net
Arquivo: sicoe-backend/.env, sicoe-backend/src/modules/storage/storage.service.ts
Descrição: Connection string completa da Storage Account do Azure (contém credenciais)

AZURE_STORAGE_MEDIA_CONTAINER=media
Arquivo: sicoe-backend/.env, sicoe-backend/src/modules/storage/storage.service.ts
Descrição: Nome do container para arquivos PDF do projeto (media)

AZURE_STORAGE_GENERIC_CONTAINER=storage
Arquivo: sicoe-backend/.env, sicoe-backend/src/modules/storage/storage.service.ts
Descrição: Nome do container genérico para outros arquivos (storage endpoint)
```

---

#### GitHub Container Registry

```
GITHUB_REPOSITORY=your-org/sicoe
Arquivo: deploy/dev/.env
Descrição: Repositório GitHub no formato org/repo (para CI/CD e deploy)
```

---

**Total Backend:** 34 variáveis

---

### 1.2 Frontend

```
VITE_API_BASE_URL=https://dev-api.sicoe.example.com/api/v1
Arquivo: sicoe-frontend/.env, sicoe-frontend/src/services/api/axios.config.ts
Descrição: URL base da API backend (usada pelo axios para todas as requisições)

VITE_ENV=development
Arquivo: sicoe-frontend/.env
Descrição: Ambiente do frontend (development, production, local)

NODE_ENV=development
Arquivo: sicoe-frontend/.env
Descrição: Ambiente do Node.js (usado pelo Vite para otimizações)

VITE_APP_NAME=SICOE - Desenvolvimento
Arquivo: sicoe-frontend/.env
Descrição: Nome da aplicação exibido no navegador e meta tags
```

**Total Frontend:** 4 variáveis

---

**TOTAL GERAL:** 38 variáveis de ambiente

---

## 2. DEPENDÊNCIAS

### 2.1 Frontend (sicoe-frontend)

#### Dependencies (6)
```
axios@^1.13.5
date-fns@^4.1.0
react@^19.2.0
react-dom@^19.2.0
react-router-dom@^7.13.0
swiper@^12.1.2
zustand@^5.0.11
```

#### DevDependencies (19)
```
@eslint/js@^9.39.1
@testing-library/jest-dom@^6.9.1
@testing-library/react@^16.3.2
@testing-library/user-event@^14.6.1
@types/node@^24.10.13
@types/react@^19.2.7
@types/react-dom@^19.2.3
@types/react-router-dom@^5.3.3
@vitejs/plugin-react@^5.1.1
@vitest/ui@^4.0.18
eslint@^9.39.1
eslint-plugin-react-hooks@^7.0.1
eslint-plugin-react-refresh@^0.4.24
globals@^16.5.0
jsdom@^28.1.0
typescript@~5.9.3
typescript-eslint@^8.48.0
vite@^7.3.1
vitest@^4.0.18
```

**Total Frontend:** 25 dependências

---

### 2.2 Backend (sicoe-backend)

#### Dependencies (27)
```
@azure/msal-node@^5.0.4
@azure/storage-blob@^12.31.0
@nestjs/common@^11.0.1
@nestjs/config@^4.0.3
@nestjs/core@^11.0.1
@nestjs/jwt@^11.0.2
@nestjs/mapped-types@^2.1.0
@nestjs/passport@^11.0.5
@nestjs/platform-express@^11.0.1
@nestjs/throttler@^6.5.0
@nestjs/typeorm@^11.0.0
bcrypt@^6.0.0
class-sanitizer@^1.0.1
class-transformer@^0.5.1
class-validator@^0.14.3
dotenv@^17.3.1
helmet@^8.1.0
helmet-csp@^4.0.0
passport@^0.7.0
passport-custom@^1.1.1
passport-jwt@^4.0.1
pg@^8.18.0
reflect-metadata@^0.2.2
rxjs@^7.8.1
typeorm@^0.3.28
winston@^3.19.0
winston-daily-rotate-file@^5.0.0
```

#### DevDependencies (24)
```
@eslint/eslintrc@^3.2.0
@eslint/js@^9.18.0
@nestjs/cli@^11.0.0
@nestjs/schematics@^11.0.0
@nestjs/testing@^11.0.1
@types/bcrypt@^6.0.0
@types/express@^5.0.0
@types/jest@^30.0.0
@types/multer@^2.0.0
@types/node@^22.19.11
@types/passport-jwt@^4.0.1
@types/supertest@^6.0.2
eslint@^9.18.0
eslint-config-prettier@^10.0.1
eslint-plugin-prettier@^5.2.2
globals@^16.0.0
jest@^30.0.0
prettier@^3.4.2
source-map-support@^0.5.21
supertest@^7.0.0
ts-jest@^29.2.5
ts-loader@^9.5.2
ts-node@^10.9.2
tsconfig-paths@^4.2.0
typescript@^5.7.3
typescript-eslint@^8.20.0
```

**Total Backend:** 51 dependências

---

## 3. AZURE BLOB STORAGE - CONTAINERS

### 3.1 Container "media" (PDFs do Projeto)

```
Nome: media
Uso: Armazenar arquivos PDF dos estabelecimentos
Access Level: Private
Variável: AZURE_STORAGE_MEDIA_CONTAINER
Métodos:
  - uploadFile(fileName, buffer, 'application/pdf', 'media')
  - downloadFile(fileName, 'media')
  - deleteFile(fileName, 'media')
  - listFiles('media')
```

### 3.2 Container "storage" (Genérico)

```
Nome: storage
Uso: Armazenar arquivos diversos via endpoint /storage
Access Level: Private
Variável: AZURE_STORAGE_GENERIC_CONTAINER
Métodos:
  - uploadFile(fileName, buffer, contentType, 'storage')
  - downloadFile(fileName, 'storage')
  - deleteFile(fileName, 'storage')
  - listFiles('storage')
```

---

## 4. REQUISITOS DO SISTEMA

### 4.1 Software Necessário

#### Obrigatórios
```
Node.js >= 20.x LTS
npm >= 10.x
PostgreSQL >= 16.x (Azure Database for PostgreSQL)
Azure CLI >= 2.x
Docker >= 24.x
Docker Compose >= 2.x
```

#### Recomendados
```
Git >= 2.x
Visual Studio Code
Postman/Insomnia (testes de API)
Azure Storage Explorer (gerenciar Blob Storage)
Azure Data Studio (gerenciar PostgreSQL)
```

---

## 5. RESUMO QUANTITATIVO

| Item | Quantidade |
|------|------------|
| Variáveis de Ambiente Backend | 34 |
| Variáveis de Ambiente Frontend | 4 |
| **Total Variáveis** | **38** |
| | |
| Dependências Frontend (prod) | 6 |
| Dependências Frontend (dev) | 19 |
| Dependências Backend (prod) | 27 |
| Dependências Backend (dev) | 24 |
| **Total Dependências** | **76** |
| | |
| Containers Azure Blob Storage | 2 |
| **Total Geral** | **116 itens** |

---

## 6. OBSERVAÇÕES

### 6.1 Variáveis Sensíveis (NÃO comitar)

```
DB_PASSWORD
JWT_SECRET
AZURE_AD_CLIENT_SECRET
EMAIL_PASSWORD
AZURE_STORAGE_CONNECTION_STRING
```

### 6.2 Variáveis Adicionadas (Etapa 1.4)

```
DB_SSL - Habilita SSL no PostgreSQL (obrigatório Azure)
DB_SSL_REJECT_UNAUTHORIZED - Valida certificado SSL
AZURE_STORAGE_MEDIA_CONTAINER - Container PDFs
AZURE_STORAGE_GENERIC_CONTAINER - Container genérico
```

### 6.3 Arquivos de Configuração Principais

**Backend:**
```
sicoe-backend/.env - Variáveis de ambiente
sicoe-backend/src/config/database.config.ts - Config PostgreSQL
sicoe-backend/src/config/security.config.ts - Config Helmet/CORS/Throttler
sicoe-backend/src/data-source.ts - DataSource TypeORM (migrations)
sicoe-backend/src/modules/storage/storage.service.ts - Azure Blob Storage
sicoe-backend/src/modules/auth/auth.service.ts - JWT
sicoe-backend/src/modules/auth/strategies/msal.strategy.ts - Azure AD
```

**Frontend:**
```
sicoe-frontend/.env - Variáveis de ambiente
sicoe-frontend/src/services/api/axios.config.ts - Config axios
sicoe-frontend/vite.config.ts - Config Vite
```

---

## 7. COMANDOS GIT - LIMPAR E SUBIR REPOSITÓRIOS DEVOPS

### 7.1 Remover Repositório DevOps Atual (Projeto Raiz)

```bash
# Verificar repositório atual
cd /home/victor/app-sicoe
git remote -v

# Remover remote origin (DevOps atual)
git remote remove origin

# Verificar se foi removido
git remote -v
```

---

### 7.2 Limpar e Subir Backend no DevOps (repo: api)

```bash
# Entrar na pasta do backend
cd /home/victor/app-sicoe/sicoe-backend

# Remover .git existente (se houver)
rm -rf .git

# Inicializar repositório Git limpo
git init

# Adicionar remote do repositório DevOps 'api'
git remote add origin https://dev.azure.com/<org>/<project>/_git/api

# Criar branch develop
git checkout -b develop

# Adicionar todos os arquivos
git add .

# Criar commit inicial
git commit -m "chore: initial commit - SICOE Backend

- NestJS 11 + TypeScript + PostgreSQL
- Azure PostgreSQL (SSL) + Azure Blob Storage
- 34 variáveis de ambiente configuradas
- 51 dependências instaladas

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Forçar push para sobrescrever repo DevOps (limpa histórico anterior)
git push -u origin develop --force
```

---

### 7.3 Limpar e Subir Frontend no DevOps (repo: client)

```bash
# Entrar na pasta do frontend
cd /home/victor/app-sicoe/sicoe-frontend

# Remover .git existente (se houver)
rm -rf .git

# Inicializar repositório Git limpo
git init

# Adicionar remote do repositório DevOps 'client'
git remote add origin https://dev.azure.com/<org>/<project>/_git/client

# Criar branch develop
git checkout -b develop

# Adicionar todos os arquivos
git add .

# Criar commit inicial
git commit -m "chore: initial commit - SICOE Frontend

- React 19 + Vite + TypeScript
- Zustand + React Router DOM 7
- 4 variáveis de ambiente configuradas
- 25 dependências instaladas

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Forçar push para sobrescrever repo DevOps (limpa histórico anterior)
git push -u origin develop --force
```

---

### 7.4 Verificar Conexões

```bash
# Backend (repo: api)
cd /home/victor/app-sicoe/sicoe-backend
git remote -v
git branch
git log --oneline

# Frontend (repo: client)
cd /home/victor/app-sicoe/sicoe-frontend
git remote -v
git branch
git log --oneline

# Raiz (sem remote)
cd /home/victor/app-sicoe
git remote -v
```

---

### 7.5 Estrutura Final

```
/home/victor/app-sicoe/               (LOCAL - sem remote DevOps)
├── sicoe-backend/                    (GIT → DevOps: api [develop])
│   ├── .git/
│   ├── src/
│   └── ...
├── sicoe-frontend/                   (GIT → DevOps: client [develop])
│   ├── .git/
│   ├── src/
│   └── ...
├── sicoe-local/                      (LOCAL - configs Docker)
├── .docs/                            (LOCAL - documentação)
└── .git/                             (LOCAL - sem remote)
```

---

### 7.6 IMPORTANTE - Confirmação Antes do Push

⚠️ **O comando `git push --force` vai SOBRESCREVER completamente o histórico dos repos DevOps.**

**Antes de executar, confirme:**
- [ ] Repositórios DevOps existem: `api` e `client`
- [ ] Você tem permissão para force push
- [ ] Backup do código antigo foi feito (se necessário)
- [ ] `.env` NÃO está sendo commitado
- [ ] `.gitignore` está correto
- [ ] Executou `git status` e revisou os arquivos

**Verificar arquivos antes do commit:**
```bash
# Backend
cd /home/victor/app-sicoe/sicoe-backend
git status

# Frontend
cd /home/victor/app-sicoe/sicoe-frontend
git status
```

---

### 7.7 Comandos Futuros (Após Setup)

**Push de alterações no Backend:**
```bash
cd /home/victor/app-sicoe/sicoe-backend
git add .
git commit -m "feat: adicionar nova funcionalidade"
git push origin develop
```

**Push de alterações no Frontend:**
```bash
cd /home/victor/app-sicoe/sicoe-frontend
git add .
git commit -m "feat: adicionar nova tela"
git push origin develop
```

**Criar branch de feature:**
```bash
# Backend
cd /home/victor/app-sicoe/sicoe-backend
git checkout -b feature/nome-da-feature
git push -u origin feature/nome-da-feature

# Frontend
cd /home/victor/app-sicoe/sicoe-frontend
git checkout -b feature/nome-da-feature
git push -u origin feature/nome-da-feature
```

---

**Gerado por:** Claude Code (Análise Processo P1-E3 - Atualizado)
**Data:** 2026-03-05
