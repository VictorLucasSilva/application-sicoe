# 🔄 Checklist de Migração do Projeto SICOE

## ⚠️ Arquivos que PODEM DAR PROBLEMA na Migração

### 🔴 **CRÍTICOS - Causarão erro se não existirem**

#### 1. **Arquivos `.env` (NÃO estão no git)**
**Localização:**
- `sicoe-backend/.env`
- `sicoe-frontend/.env`
- `sicoe-local/.env`
- `deploy/dev/.env`
- `deploy/prod/.env`

**Problema:**
- ❌ Esses arquivos contêm credenciais e **NÃO são versionados no git**
- ❌ Na outra máquina, o projeto **NÃO vai funcionar** sem eles

**Solução:**
```bash
# Na nova máquina, copiar os .env.example e renomear
cp sicoe-backend/.env.example sicoe-backend/.env
cp sicoe-frontend/.env.example sicoe-frontend/.env
cp sicoe-local/.env.example sicoe-local/.env

# Depois editar com as credenciais corretas
```

---

#### 2. **`node_modules/` (Ignorado pelo git)**
**Localização:**
- `sicoe-backend/node_modules/`
- `sicoe-frontend/node_modules/`

**Problema:**
- ❌ Pasta com ~500MB+ de dependências **NÃO está no git**
- ❌ Projeto não roda sem essas dependências

**Solução:**
```bash
# Backend
cd sicoe-backend
npm install

# Frontend
cd sicoe-frontend
npm install
```

---

#### 3. **`dist/` e `build/` (Ignorados pelo git)**
**Localização:**
- `sicoe-backend/dist/`
- `sicoe-frontend/dist/`

**Problema:**
- ❌ Código compilado **NÃO está no git**
- ❌ Aplicação precisa ser compilada na nova máquina

**Solução:**
```bash
# Backend
cd sicoe-backend
npm run build

# Frontend
cd sicoe-frontend
npm run build
```

---

### 🟡 **MÉDIOS - Podem causar inconsistências**

#### 4. **Volumes do Docker (Dados locais)**
**Localização:**
- Volume `sicoe-postgres-data` (dados do PostgreSQL)

**Problema:**
- ⚠️ Banco de dados local **NÃO é migrado automaticamente**
- ⚠️ Na nova máquina, o banco estará **vazio**

**Solução:**
- ✅ Com o fix implementado (migrations/seeds automáticos), o banco será criado automaticamente
- ⚠️ Mas dados de desenvolvimento **NÃO serão migrados**

**Opção 1 - Começar do zero (recomendado para dev):**
```bash
cd sicoe-local
docker-compose up -d
# Migrations e seeds rodarão automaticamente
```

**Opção 2 - Migrar dados (se necessário):**
```bash
# Na máquina original
docker-compose exec postgres pg_dump -U sicoe_user sicoe_db > backup.sql

# Copiar backup.sql para nova máquina

# Na nova máquina
cat backup.sql | docker-compose exec -T postgres psql -U sicoe_user sicoe_db
```

---

#### 5. **Arquivos de configuração do IDE**
**Localização:**
- `.vscode/` (ignorado)
- `.idea/` (ignorado)

**Problema:**
- ⚠️ Configurações de debug, extensions, etc não migram

**Solução:**
- Reconfigurar manualmente ou compartilhar via git (remover do .gitignore)

---

#### 6. **Arquivos de log**
**Localização:**
- `*.log` (ignorados)
- `logs/` (se existir, ignorado)

**Problema:**
- ⚠️ Logs de desenvolvimento não migram

**Solução:**
- Normal, logs são locais

---

### 🟢 **BAIXOS - Atenção mas não crítico**

#### 7. **Cache do npm**
**Localização:**
- `~/.npm/` (global)

**Problema:**
- ⚠️ Primeira instalação pode ser lenta sem cache

**Solução:**
- Normal, npm baixa os pacotes automaticamente

---

#### 8. **Configurações Git locais**
**Localização:**
- `.git/config` (local)

**Problema:**
- ⚠️ Configurações de usuário, credenciais, remotes customizados

**Solução:**
```bash
# Reconfigurar git na nova máquina
git config user.name "Seu Nome"
git config user.email "seu@email.com"
```

---

## ✅ **PASSO A PASSO: Migração Completa para Outra Máquina**

### **1️⃣ Clonar o Repositório**
```bash
git clone https://github.com/VictorLucasSilva/application-sicoe.git
cd application-sicoe
```

### **2️⃣ Criar Arquivos de Ambiente**
```bash
# Backend
cp sicoe-backend/.env.example sicoe-backend/.env

# Frontend
cp sicoe-frontend/.env.example sicoe-frontend/.env

# Docker Local
cp sicoe-local/.env.example sicoe-local/.env
```

### **3️⃣ Editar Variáveis de Ambiente (SE NECESSÁRIO)**

**sicoe-backend/.env:**
- Verificar `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD`
- Atualizar `JWT_SECRET` (para produção)
- Configurar Azure AD (se houver)

**sicoe-frontend/.env:**
- Verificar `VITE_API_BASE_URL`

**sicoe-local/.env:**
- Verificar portas (3000, 5173, 5432)
- Ajustar se houver conflito

### **4️⃣ Opção A: Rodar com Docker (RECOMENDADO)**
```bash
cd sicoe-local

# Subir todos os serviços
docker-compose up -d

# Verificar logs (migrations e seeds automáticos)
docker-compose logs -f backend
```

**✅ PRONTO!** Aplicação rodando:
- Backend: http://localhost:3000/api/v1
- Frontend: http://localhost:5173
- PostgreSQL: localhost:5432

---

### **4️⃣ Opção B: Rodar Localmente (Sem Docker)**

**Backend:**
```bash
cd sicoe-backend
npm install
npm run build
npm run migration:run
npm run seed:run
npm run start:dev
```

**Frontend:**
```bash
cd sicoe-frontend
npm install
npm run dev
```

**PostgreSQL:**
- Instalar PostgreSQL manualmente
- Criar database `sicoe_db`
- Ajustar credenciais no `.env`

---

## 📋 **Checklist de Validação Pós-Migração**

Execute na nova máquina:

- [ ] Repositório clonado com sucesso
- [ ] Arquivos `.env` criados e editados
- [ ] Docker instalado e rodando (se usar Docker)
- [ ] `docker-compose up -d` executado (se Docker)
- [ ] Backend iniciou sem erros
- [ ] Frontend iniciou sem erros
- [ ] PostgreSQL conectado e tabelas criadas
- [ ] Acesso ao frontend: http://localhost:5173
- [ ] Acesso ao backend: http://localhost:3000/api/v1
- [ ] Login funciona
- [ ] Dados de seed aparecem nas páginas

---

## 🚨 **Erros Comuns e Soluções**

### Erro: "relation ssv_aud_action does not exist"
**Causa:** Migrations não rodaram
**Solução:**
```bash
docker-compose exec backend npm run migration:run
docker-compose exec backend npm run seed:run
docker-compose restart backend
```

### Erro: "Cannot connect to database"
**Causa:** PostgreSQL não está rodando ou credenciais erradas
**Solução:**
```bash
# Verificar se PostgreSQL está rodando
docker-compose ps

# Verificar logs
docker-compose logs postgres

# Verificar credenciais no .env
```

### Erro: "Port 3000 already in use"
**Causa:** Outra aplicação usando a porta
**Solução:**
```bash
# Editar sicoe-local/.env
BACKEND_PORT=3001

# Ou matar o processo na porta
lsof -ti:3000 | xargs kill -9
```

### Erro: "Module not found"
**Causa:** node_modules não instalado
**Solução:**
```bash
cd sicoe-backend && npm install
cd sicoe-frontend && npm install
```

---

## 📦 **Arquivos Essenciais para Backup Manual**

Se quiser fazer backup completo (não apenas git):

### **Dados que VALEM A PENA copiar manualmente:**
```
sicoe-backend/.env          (credenciais)
sicoe-frontend/.env         (configuração)
sicoe-local/.env            (portas/configs)
```

### **Dados do Banco (se necessário):**
```bash
# Exportar
docker-compose exec postgres pg_dump -U sicoe_user sicoe_db > backup-$(date +%Y%m%d).sql

# Copiar backup-*.sql para nova máquina
```

### **Dados que NÃO PRECISA copiar:**
```
node_modules/     (reinstalar com npm install)
dist/             (recompilar com npm run build)
.git/             (vem no clone)
*.log             (logs locais)
```

---

## 🎯 **Resumo: Top 5 Problemas Mais Comuns**

| # | Problema | Causa | Solução Rápida |
|---|----------|-------|----------------|
| 1 | ❌ Banco sem tabelas | Migrations não rodaram | `npm run migration:run && npm run seed:run` |
| 2 | ❌ Variáveis de ambiente | .env não existe | `cp .env.example .env` |
| 3 | ❌ Módulos não encontrados | node_modules ausente | `npm install` |
| 4 | ❌ Porta em uso | Conflito de portas | Editar `.env` ou matar processo |
| 5 | ❌ Credenciais inválidas | .env com valores default | Editar .env com credenciais reais |

---

**Última atualização:** 2026-03-02
**Autor:** Claude Code
**Versão:** 1.0
