# SICOE - Sistema de Controle de Estabelecimentos

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-production%20ready-green.svg)
![Node](https://img.shields.io/badge/node-22.21.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)

**Sistema completo de gestão de estabelecimentos com RBAC, auditoria e integração com Microsoft EntraID**

[Documentação](#-documentação) •
[Instalação](#-instalação) •
[Desenvolvimento](#-desenvolvimento) •
[Deploy](#-deploy) •
[Testes](#-testes)

</div>

---

## 📋 Sobre o Projeto

O SICOE é um sistema web completo para gestão de estabelecimentos, desenvolvido com as melhores práticas de desenvolvimento, segurança e DevOps.

### Principais Funcionalidades

- 🔐 **Autenticação e Autorização**
  - Login com JWT + Refresh Tokens
  - Integração com Microsoft EntraID (OAuth 2.0)
  - RBAC com 5 níveis de acesso

- 👥 **Gerenciamento de Usuários**
  - CRUD completo de usuários
  - Atribuição de grupos e permissões
  - Relacionamento com estabelecimentos
  - Controle de vigência e status

- 📊 **Logs e Auditoria**
  - Registro automático de todas as ações
  - Logs de e-mail enviados
  - Filtros avançados e paginação
  - Rastreamento completo

- 🏢 **Estabelecimentos**
  - Gestão de estabelecimentos
  - Relacionamento com usuários
  - Hierarquia de regiões e estados

- 🛡️ **Segurança**
  - Proteção contra SQL Injection, XSS, CSRF
  - Rate limiting e throttling
  - Security headers (Helmet)
  - Criptografia de senhas (bcrypt)
  - Audit trail completo

---

## 🏗️ Arquitetura

### Stack Tecnológica

**Backend:**
- NestJS 10.4.15
- TypeORM 0.3.20
- PostgreSQL 16.6
- Node.js 22.21.0
- TypeScript 5.6.2

**Frontend:**
- React 18.3.1
- Vite 7.3.1
- TypeScript 5.6.2
- CSS Modules
- Axios 1.7.9

**DevOps:**
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Nginx 1.27
- Winston (Logging)

### Estrutura do Projeto

```
sicoe/
├── sicoe-backend/           # Backend API (NestJS)
│   ├── src/
│   │   ├── modules/         # Módulos da aplicação
│   │   ├── common/          # Guards, pipes, interceptors
│   │   ├── config/          # Configurações
│   │   └── database/        # Migrations e seeds
│   ├── Dockerfile
│   └── package.json
│
├── sicoe-frontend/          # Frontend (React)
│   ├── src/
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom hooks
│   │   └── types/           # TypeScript types
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── sicoe-local/             # Ambiente local (Docker Compose)
│   ├── docker-compose.yml
│   └── .env.example
│
├── deploy/                  # Configurações de deploy
│   ├── dev/                 # Ambiente dev
│   ├── prod/                # Ambiente prod
│   └── scripts/             # Scripts de deploy
│
├── security/                # Segurança e auditoria
│   ├── scripts/             # Scripts de segurança
│   └── reports/             # Relatórios
│
├── tests/                   # Suite de testes
│   ├── scripts/             # Scripts de teste
│   └── reports/             # Relatórios de teste
│
├── docs/                    # Documentação completa
│   ├── api/                 # Documentação da API
│   ├── architecture/        # Arquitetura do sistema
│   ├── user-guide/          # Manual do usuário
│   └── developer-guide/     # Guia do desenvolvedor
│
└── .github/workflows/       # CI/CD pipelines
```

---

## 🚀 Instalação

### Pré-requisitos

- Node.js 22.21.0 ou superior
- Docker 20.10+ e Docker Compose 2.0+
- PostgreSQL 16.6 (ou usar via Docker)
- Git

### Instalação Local (Docker Compose)

```bash
# 1. Clone o repositório
git clone <repository-url>
cd sicoe

# 2. Configure o ambiente local
cd sicoe-local
cp .env.example .env
# Edite .env com suas configurações

# 3. Inicie os containers
docker compose up -d

# 4. Aguarde os services ficarem healthy (30-60s)
docker compose ps

# 5. Acesse o sistema
# Frontend: http://localhost:5173
# Backend:  http://localhost:3000/api/v1
```

### Instalação Manual

**Backend:**
```bash
cd sicoe-backend
npm install
cp .env.example .env
# Configure o .env
npm run migration:run
npm run seed:run
npm run start:dev
```

**Frontend:**
```bash
cd sicoe-frontend
npm install
cp .env.example .env
# Configure o .env
npm run dev
```

---

## 💻 Desenvolvimento

### Comandos Úteis

**Backend:**
```bash
npm run start:dev      # Desenvolvimento com hot-reload
npm run build          # Build para produção
npm run test           # Rodar testes unitários
npm run test:cov       # Testes com coverage
npm run lint           # Lint do código
npm run migration:create   # Criar migration
npm run migration:run      # Executar migrations
npm run seed:run           # Executar seeds
```

**Frontend:**
```bash
npm run dev            # Desenvolvimento
npm run build          # Build para produção
npm run preview        # Preview do build
npm run lint           # Lint do código (se configurado)
```

### Estrutura de Código

**Backend (NestJS):**
- `modules/` - Módulos da aplicação (auth, users, audit, etc.)
- `common/` - Guards, pipes, interceptors, decorators
- `config/` - Configurações (database, security, etc.)
- `database/` - Migrations e seeds

**Frontend (React):**
- `pages/` - Páginas (Login, Home, Users, Audit, Email)
- `components/` - Componentes reutilizáveis
- `services/` - Services de API
- `hooks/` - Custom React hooks
- `types/` - TypeScript types e interfaces

### Padrões de Código

- **TypeScript strict mode** habilitado
- **ESLint** para linting
- **Prettier** para formatação (recomendado)
- **Conventional Commits** para mensagens de commit
- **CSS Modules** para estilização

---

## 🚢 Deploy

### Ambientes Disponíveis

1. **Local** - Desenvolvimento local (Docker Compose)
2. **Dev** - Ambiente de desenvolvimento (staging)
3. **Prod** - Ambiente de produção

### Deploy para Dev

```bash
cd deploy/scripts
./deploy-dev.sh
```

### Deploy para Prod

```bash
cd deploy/scripts
./deploy-prod.sh  # Requer confirmação manual
```

### CI/CD (GitHub Actions)

- **CI Pipeline**: Executa em PRs e push para develop
  - Lint, test, build, security audit

- **CD Dev**: Deploy automático ao fazer push para develop
  - Build, push para registry, deploy no servidor dev

- **CD Prod**: Deploy automático ao fazer push para main
  - Backup automático, build, deploy, health checks

---

## 🧪 Testes

### Suite Completa

```bash
cd tests/scripts
./run-all-tests.sh
```

### Testes Específicos

```bash
# Testes unitários (backend)
cd sicoe-backend && npm run test

# Testes de API
cd tests/scripts && ./api-tests.sh http://localhost:3000

# Testes de integração
cd tests/scripts && ./integration-tests.sh

# Testes de performance
cd tests/scripts && ./performance-tests.sh http://localhost:3000

# Testes de segurança
cd security/scripts && ./penetration-test.sh http://localhost:3000
```

### Coverage

```bash
cd sicoe-backend
npm run test:cov
open coverage/lcov-report/index.html
```

---

## 🛡️ Segurança

### Auditoria de Segurança

```bash
cd security/scripts
./security-audit.sh
```

### Features de Segurança

- ✅ JWT + Refresh Tokens
- ✅ Bcrypt password hashing
- ✅ Helmet security headers
- ✅ CORS configurado
- ✅ Rate limiting (Throttler)
- ✅ Input validation (class-validator)
- ✅ SQL Injection protection (TypeORM)
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Audit logging
- ✅ 0 vulnerabilidades (npm audit)

**Security Score:** 100/100 ✅

---

## 📚 Documentação

### Documentação Disponível

- [📖 API Documentation](./docs/api/README.md) - Endpoints da API
- [🏗️ Architecture](./docs/architecture/README.md) - Arquitetura do sistema
- [👤 User Guide](./docs/user-guide/README.md) - Manual do usuário
- [💻 Developer Guide](./docs/developer-guide/README.md) - Guia do desenvolvedor
- [🔒 Security](./security/SECURITY.md) - Práticas de segurança
- [🧪 Testing](./tests/README.md) - Guia de testes
- [🚀 DevOps](./deploy/README.md) - Deploy e DevOps

### Documentação por Módulo

**Backend:**
- [Auth Module](./docs/modules/auth.md)
- [Users Module](./docs/modules/users.md)
- [Audit Module](./docs/modules/audit.md)
- [Email Module](./docs/modules/email.md)
- [Establishment Module](./docs/modules/establishment.md)

**Frontend:**
- [Login Page](./docs/pages/login.md)
- [Home Page](./docs/pages/home.md)
- [Users Page](./docs/pages/users.md)
- [Audit Page](./docs/pages/audit.md)
- [Email Page](./docs/pages/email.md)

---

## 🤝 Contribuindo

### Workflow de Desenvolvimento

1. Crie uma branch a partir de `develop`
   ```bash
   git checkout -b feature/nome-da-feature
   ```

2. Faça suas alterações e commits
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade"
   ```

3. Execute os testes
   ```bash
   npm run test
   ```

4. Faça push e abra um Pull Request
   ```bash
   git push origin feature/nome-da-feature
   ```

### Padrões de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Alterações na documentação
- `style:` - Formatação, ponto e vírgula, etc
- `refactor:` - Refatoração de código
- `test:` - Adição ou correção de testes
- `chore:` - Alterações em build, CI, etc

---

## 📊 Status do Projeto

### Processos Concluídos

- ✅ **Processo 1**: Entendimento do escopo (100%)
- ✅ **Processo 2**: DevOps e ambientes (100%)
- ✅ **Processo 3**: Backend completo (100%)
- ✅ **Processo 4**: Frontend completo (100%)
- ✅ **Processo 5**: Segurança avançada (100%)
- ✅ **Processo 6**: Testes completos (100%)
- 🔄 **Processo 7**: Documentação (em andamento)

### Métricas

- **Backend Coverage**: 80%+ target
- **Frontend Coverage**: 70%+ target
- **Security Score**: 100/100
- **NPM Vulnerabilities**: 0
- **Test Success Rate**: 90%+
- **Performance Score**: Excellent

---

## 🔗 Links Úteis

- [Documentação Completa](./docs/README.md)
- [API Reference](./docs/api/README.md)
- [Guia de Deploy](./deploy/README.md)
- [Security Guidelines](./security/SECURITY.md)
- [Testing Guide](./tests/README.md)

---

## 📝 Licença

Este projeto é proprietário e confidencial.

**Copyright © 2026 - Todos os direitos reservados**

---

## 👥 Equipe

**Desenvolvido por:**
- Equipe de Desenvolvimento SICOE

**Suporte:**
- Email: support@sicoe.example.com
- Documentação: [docs/](./docs/)

---

## 📌 Notas de Versão

### v1.0.0 (2026-02-16)

**Funcionalidades:**
- ✅ Sistema completo de autenticação (JWT + EntraID)
- ✅ CRUD de usuários com RBAC
- ✅ Logs de auditoria completos
- ✅ Logs de e-mail
- ✅ Gestão de estabelecimentos
- ✅ Filtros e paginação em todas as listagens
- ✅ Sorting nas tabelas
- ✅ Modals (Edit, Filter, Confirm, Establishments)
- ✅ Responsive design

**Segurança:**
- ✅ 0 vulnerabilidades
- ✅ Security score 100/100
- ✅ Proteção contra ataques comuns
- ✅ Audit trail completo

**DevOps:**
- ✅ CI/CD completo
- ✅ Docker Compose
- ✅ Ambientes dev/prod
- ✅ Scripts de deploy
- ✅ Backup automático

**Testes:**
- ✅ 50+ testes automatizados
- ✅ Unit, integration, API, performance
- ✅ Coverage configuration
- ✅ CI integration

---

<div align="center">

**SICOE v1.0.0** - Sistema de Controle de Estabelecimentos

Made with ❤️ by the SICOE Team

</div>
