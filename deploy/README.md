# SICOE - DevOps Configuration

Este diretório contém todas as configurações de DevOps para os ambientes **Dev** e **Prod** do SICOE.

## 📋 Índice

- [Arquitetura](#arquitetura)
- [Ambientes](#ambientes)
- [CI/CD Pipelines](#cicd-pipelines)
- [Deploy](#deploy)
- [Backup e Restore](#backup-e-restore)
- [Monitoramento](#monitoramento)
- [Troubleshooting](#troubleshooting)

---

## 🏗️ Arquitetura

### Stack Tecnológica

**Backend:**
- NestJS 10.4.15
- TypeORM 0.3.20
- PostgreSQL 16.6
- Node.js 22.21.0

**Frontend:**
- React 18
- Vite 7.3.1
- TypeScript 5.6.2
- Nginx 1.27

**Infraestrutura:**
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- GitHub Container Registry (imagens)

### Estrutura de Ambientes

```
SICOE
├── Local (docker-compose.yml)
│   ├── PostgreSQL 16.6
│   ├── Backend (NestJS)
│   └── Frontend (React + Nginx)
│
├── Development (dev)
│   ├── PostgreSQL 16.6
│   ├── Backend (container registry)
│   └── Frontend (container registry)
│
└── Production (prod)
    ├── PostgreSQL 16.6
    ├── Backend (container registry)
    ├── Frontend (container registry)
    └── SSL/TLS (nginx)
```

---

## 🌍 Ambientes

### Local

**Localização:** `/sicoe-local/`

**Propósito:** Desenvolvimento local com Docker Compose

**Configuração:**
```bash
cd ../sicoe-local
cp .env.example .env
# Editar .env com suas configurações
docker compose up -d
```

**Acessos:**
- Frontend: http://localhost:5173
- Backend: http://localhost:3000/api/v1
- PostgreSQL: localhost:5432

### Development

**Localização:** `/deploy/dev/`

**Propósito:** Ambiente de testes e homologação

**Configuração:**
```bash
cd dev
cp .env.example .env
# Editar .env com configurações de dev
./scripts/deploy-dev.sh
```

**Características:**
- Deploy automático via GitHub Actions (branch `develop`)
- Logs detalhados ativados
- Migrations automáticas
- Healthchecks configurados

### Production

**Localização:** `/deploy/prod/`

**Propósito:** Ambiente de produção

**Configuração:**
```bash
cd prod
cp .env.example .env
# Editar .env com configurações de produção (SENHAS FORTES!)
./scripts/deploy-prod.sh
```

**Características:**
- Deploy automático via GitHub Actions (branch `main`)
- Backup automático antes de cada deploy
- Healthchecks com retries
- Resource limits configurados
- SSL/TLS obrigatório

---

## 🔄 CI/CD Pipelines

### GitHub Actions

**Localização:** `/.github/workflows/`

#### CI Pipeline (`ci.yml`)

**Trigger:** Pull Requests e Push para `develop`

**Jobs:**
1. **backend-ci**
   - Lint (ESLint)
   - Testes unitários
   - Build
   - Security audit (npm audit)

2. **frontend-ci**
   - Lint (ESLint)
   - Type check (TypeScript)
   - Build
   - Security audit (npm audit)

3. **docker-build**
   - Build de imagens Docker
   - Cache com GitHub Actions

**Duração média:** 5-8 minutos

#### CD Dev Pipeline (`cd-dev.yml`)

**Trigger:** Push para `develop`

**Etapas:**
1. Build e push de imagens para registry
2. Deploy no servidor de dev
3. Execução de migrations
4. Health checks

**Duração média:** 8-12 minutos

#### CD Prod Pipeline (`cd-prod.yml`)

**Trigger:** Push para `main` ou tags `v*.*.*`

**Etapas:**
1. Backup do banco de dados
2. Build e push de imagens para registry
3. Deploy no servidor de produção
4. Execução de migrations
5. Health checks com retries
6. Validação final

**Duração média:** 12-18 minutos

### Secrets Necessários

Configure os seguintes secrets no GitHub:

**Development:**
- `DEV_SERVER_HOST`: IP ou hostname do servidor dev
- `DEV_SERVER_USER`: Usuário SSH
- `DEV_SERVER_SSH_KEY`: Chave SSH privada
- `DEV_API_URL`: URL da API de dev

**Production:**
- `PROD_SERVER_HOST`: IP ou hostname do servidor prod
- `PROD_SERVER_USER`: Usuário SSH
- `PROD_SERVER_SSH_KEY`: Chave SSH privada
- `PROD_API_URL`: URL da API de produção

---

## 🚀 Deploy

### Deploy Manual - Development

```bash
cd deploy/scripts
./deploy-dev.sh
```

**O script faz:**
1. Pull das imagens mais recentes
2. Para containers antigos
3. Inicia novos containers
4. Verifica health checks
5. Executa migrations
6. Limpa imagens antigas

### Deploy Manual - Production

```bash
cd deploy/scripts
./deploy-prod.sh
```

**O script faz:**
1. **Confirmação manual** (requer digitar 'yes')
2. **Backup automático** do banco
3. Pull das imagens mais recentes
4. Para containers antigos
5. Inicia novos containers
6. Aguarda health checks (com retries)
7. Executa migrations
8. Validação final
9. Limpa imagens antigas

**⚠️ IMPORTANTE:**
- O deploy de produção sempre cria backup automático
- Mantém os últimos 7 backups
- Requer confirmação manual para evitar deploys acidentais

---

## 💾 Backup e Restore

### Backup Manual

**Development:**
```bash
cd deploy/scripts
./backup-db.sh dev
```

**Production:**
```bash
cd deploy/scripts
./backup-db.sh prod
```

**Características:**
- Backups comprimidos (.sql.gz)
- Mantém últimos 30 dias automaticamente
- Timestamp no nome do arquivo
- Armazenado em `/deploy/{env}/backups/`

### Restore Manual

**⚠️ ATENÇÃO: Operação destrutiva!**

```bash
cd deploy/scripts
./restore-db.sh <environment> <backup-file>

# Exemplo:
./restore-db.sh prod ../prod/backups/backup_20260216_120000.sql.gz
```

**O script faz:**
1. Pede confirmação (digite 'yes')
2. Cria backup de segurança
3. Descomprime o arquivo de backup
4. Dropa o banco atual
5. Cria novo banco
6. Restaura o backup
7. Reinicia o backend

### Backup Automático

**Production:** Backup automático antes de cada deploy

**Schedule:** Configure um cron job no servidor:

```cron
# Backup diário às 2h da manhã
0 2 * * * /opt/sicoe/deploy/scripts/backup-db.sh prod >> /var/log/sicoe-backup.log 2>&1
```

---

## 📊 Monitoramento

### Health Checks

Todos os serviços possuem health checks configurados:

**PostgreSQL:**
- Comando: `pg_isready`
- Intervalo: 10s
- Timeout: 5s
- Retries: 5

**Backend:**
- Endpoint: `http://localhost:3000/api/v1`
- Intervalo: 30s
- Timeout: 10s
- Retries: 3 (dev) / 5 (prod)

**Frontend:**
- Endpoint: `http://localhost/`
- Intervalo: 30s
- Timeout: 10s
- Retries: 3 (dev) / 5 (prod)

### Logs

**Ver logs em tempo real:**
```bash
# Todos os serviços
docker compose logs -f

# Apenas backend
docker compose logs -f backend

# Apenas frontend
docker compose logs -f frontend

# Últimas 100 linhas
docker compose logs --tail=100 backend
```

**Logs persistentes:**
- Backend: `/deploy/{env}/logs/`
- Nginx: logs do container frontend

### Status dos Serviços

```bash
# Ver status de todos os containers
docker compose ps

# Ver uso de recursos
docker stats

# Ver health status
docker inspect <container-name> | grep -A 10 "Health"
```

---

## 🔧 Troubleshooting

### Backend não inicia

**Verificar logs:**
```bash
docker compose logs backend
```

**Problemas comuns:**
1. **Erro de conexão com banco:**
   - Verificar variáveis `DB_*` no .env
   - Verificar se PostgreSQL está healthy: `docker compose ps`
   - Reiniciar: `docker compose restart postgres backend`

2. **Erro de migrations:**
   - Executar manualmente: `docker compose exec backend npm run migration:run`
   - Reverter: `docker compose exec backend npm run migration:revert`

3. **Porta em uso:**
   - Verificar: `netstat -tlnp | grep 3000`
   - Matar processo ou mudar porta no .env

### Frontend não carrega

**Verificar logs:**
```bash
docker compose logs frontend
```

**Problemas comuns:**
1. **Erro 502 Bad Gateway:**
   - Backend não está respondendo
   - Verificar health do backend
   - Verificar variável `VITE_API_BASE_URL`

2. **API_BASE_URL incorreta:**
   - Verificar .env: `VITE_API_BASE_URL`
   - Rebuild: `docker compose up -d --build frontend`

### Banco de dados corrompido

**Opção 1: Restore de backup**
```bash
./deploy/scripts/restore-db.sh <env> <backup-file>
```

**Opção 2: Reset completo (⚠️ PERDE DADOS)**
```bash
docker compose down -v
docker compose up -d
docker compose exec backend npm run migration:run
```

### Deploy falhou

**GitHub Actions:**
1. Ir para Actions no GitHub
2. Encontrar o workflow que falhou
3. Verificar os logs de cada step
4. Corrigir o problema
5. Re-executar: "Re-run all jobs"

**Deploy manual falhou:**
1. Verificar logs do script
2. Verificar status dos containers: `docker compose ps`
3. Verificar logs dos serviços
4. Se necessário, fazer rollback:
   ```bash
   docker compose down
   # Restaurar backup
   ./scripts/restore-db.sh <env> <backup-file>
   # Deploy versão anterior
   docker compose up -d
   ```

### Performance degradada

**Verificar recursos:**
```bash
# CPU e memória
docker stats

# Disco
df -h
docker system df
```

**Limpar recursos:**
```bash
# Limpar imagens não utilizadas
docker image prune -a

# Limpar volumes não utilizados (⚠️ CUIDADO)
docker volume prune

# Limpar tudo não utilizado
docker system prune -a
```

**Aumentar recursos (docker-compose):**
Editar `docker-compose.{env}.yml`:
```yaml
deploy:
  resources:
    limits:
      cpus: '4'  # Aumentar
      memory: 4G  # Aumentar
```

---

## 📝 Checklist de Deploy

### Antes do Deploy

- [ ] Código revisado e aprovado
- [ ] Testes passando (CI green)
- [ ] Changelog atualizado
- [ ] Variáveis de ambiente conferidas
- [ ] Backup recente disponível
- [ ] Notificar equipe (prod)

### Durante o Deploy

- [ ] Executar script de deploy
- [ ] Aguardar health checks
- [ ] Verificar logs
- [ ] Testar endpoints principais

### Após o Deploy

- [ ] Verificar aplicação funcionando
- [ ] Testar funcionalidades críticas
- [ ] Monitorar logs por 15min
- [ ] Confirmar backup criado
- [ ] Notificar conclusão (prod)

---

## 🆘 Suporte

**Documentação adicional:**
- Backend: `/sicoe-backend/README.md`
- Frontend: `/sicoe-frontend/README.md`
- Local: `/sicoe-local/README.md`

**Em caso de emergência:**
1. Fazer rollback para versão anterior
2. Restaurar backup do banco
3. Notificar equipe de desenvolvimento
4. Investigar logs e causa raiz
