# 🐳 Guia de Setup Docker - SICOE

## ✅ Problema Resolvido

**Erro Original:**
```
relation "ssv_aud_action" does not exist
```

**Causa:** O banco PostgreSQL subia sem tabelas, mas o backend tentava acessá-las imediatamente.

**Solução Implementada:** O Dockerfile agora executa **migrations** e **seeds** automaticamente antes de iniciar a aplicação.

---

## 🚀 Como Testar a Solução

### 1️⃣ Parar e Limpar Containers Existentes

```bash
cd /home/victor/app-sicoe/sicoe-local

# Parar todos os containers
docker-compose down

# Remover volume do banco (CUIDADO: apaga dados!)
docker volume rm sicoe-postgres-data

# Verificar que foi removido
docker volume ls | grep sicoe
```

### 2️⃣ Rebuildar o Backend com as Novas Configurações

```bash
# Rebuildar o container do backend
docker-compose build --no-cache backend
```

### 3️⃣ Subir os Containers

```bash
# Subir todos os serviços
docker-compose up -d

# OU para ver os logs em tempo real:
docker-compose up
```

### 4️⃣ Verificar os Logs

```bash
# Ver logs do backend (onde migrations e seeds aparecem)
docker-compose logs -f backend

# Ver logs do PostgreSQL
docker-compose logs -f postgres

# Ver logs de todos os serviços
docker-compose logs -f
```

**✅ Você deve ver no log do backend:**
```
🔄 Aguardando banco de dados estar pronto...
🔄 Executando migrations...
✅ Migrations executadas com sucesso
🌱 Executando seeds...
✅ Seeds executados com sucesso
🚀 Iniciando aplicação SICOE...
```

### 5️⃣ Testar a Aplicação

```bash
# Verificar health do backend
curl http://localhost:3000/api/v1

# Acessar frontend
# Abra no navegador: http://localhost:5173
```

---

## 📁 Arquivos Modificados

1. **`sicoe-backend/Dockerfile`**
   - ✅ Instalado `ts-node` e `typeorm` globalmente
   - ✅ Copiado arquivos necessários para migrations (data-source.ts, migrations/, seeds/)
   - ✅ Configurado entrypoint script

2. **`sicoe-backend/docker-entrypoint.sh`** (NOVO)
   - ✅ Script que executa migrations → seeds → aplicação
   - ✅ Tratamento de erros caso migrations/seeds já existam

---

## 🔧 Comandos Úteis

### Ver Status dos Containers
```bash
docker-compose ps
```

### Reiniciar Apenas o Backend
```bash
docker-compose restart backend
```

### Executar Migrations Manualmente (se necessário)
```bash
docker-compose exec backend npm run migration:run
```

### Executar Seeds Manualmente (se necessário)
```bash
docker-compose exec backend npm run seed:run
```

### Acessar Shell do Container Backend
```bash
docker-compose exec backend sh
```

### Acessar PostgreSQL
```bash
docker-compose exec postgres psql -U sicoe_user -d sicoe_db
```

Dentro do PostgreSQL:
```sql
-- Listar todas as tabelas
\dt

-- Ver dados de usuários
SELECT * FROM ssv_user;

-- Ver grupos
SELECT * FROM ssv_group;

-- Ver ações de auditoria
SELECT * FROM ssv_aud_action;
```

---

## 🐛 Troubleshooting

### Problema: Migrations não executam
**Solução:**
```bash
# Verificar logs detalhados
docker-compose logs backend | grep -i migration

# Executar manualmente
docker-compose exec backend npm run migration:run
```

### Problema: Seeds falham
**Solução:**
```bash
# Verificar se migrations rodaram primeiro
docker-compose exec postgres psql -U sicoe_user -d sicoe_db -c "\dt"

# Executar seeds manualmente
docker-compose exec backend npm run seed:run
```

### Problema: "Permission denied" no entrypoint.sh
**Solução:**
```bash
# Dar permissão localmente
chmod +x /home/victor/app-sicoe/sicoe-backend/docker-entrypoint.sh

# Rebuildar
docker-compose build --no-cache backend
```

### Problema: Container backend fica reiniciando
**Solução:**
```bash
# Ver logs completos
docker-compose logs backend

# Verificar se o banco está pronto
docker-compose exec postgres pg_isready -U sicoe_user
```

---

## 📊 Estrutura do Banco Após Setup

Após o setup bem-sucedido, o banco terá:

### Tabelas Criadas (via migrations):
- `ssv_user` - Usuários
- `ssv_group` - Grupos/Perfis
- `ssv_user_group` - Relação usuários ↔ grupos
- `ssv_establishment` - Estabelecimentos
- `ssv_estab_region` - Regiões
- `ssv_estab_state` - Estados
- `ssv_estab_attachment` - Anexos de estabelecimentos
- `ssv_user_establishment` - Relação usuários ↔ estabelecimentos
- `ssv_email` - Emails enviados
- `ssv_audit` - Logs de auditoria
- `ssv_aud_action` - Ações de auditoria
- `ssv_aud_object` - Objetos de auditoria
- `ssv_permission` - Permissões
- `ssv_content_type` - Tipos de conteúdo
- `ssv_group_permission` - Relação grupos ↔ permissões

### Dados Iniciais (via seeds):
- ✅ 5 Grupos: Administrador, Auditor, Gerente Regional, Usuário, Sem Acesso
- ✅ 4 Permissões: read, create, update, delete
- ✅ 7 Ações de Auditoria: Criação, Edição, Exclusão, Consulta, Login, Logout, Erro
- ✅ 5 Objetos de Auditoria: Usuário, Estabelecimento, Email, Auditoria, Anexo
- ✅ Regiões e Estados do Brasil
- ✅ Usuários de teste (opcional, conforme test-data-seed.ts)
- ✅ Estabelecimentos de teste (opcional)

---

## ✅ Checklist de Validação

Após seguir os passos acima, confirme:

- [ ] Container `sicoe-postgres` está rodando
- [ ] Container `sicoe-backend` está rodando (sem reiniciar)
- [ ] Container `sicoe-frontend` está rodando
- [ ] Logs do backend mostram "✅ Migrations executadas com sucesso"
- [ ] Logs do backend mostram "✅ Seeds executados com sucesso"
- [ ] Logs do backend mostram "🚀 Iniciando aplicação SICOE..."
- [ ] `curl http://localhost:3000/api/v1` retorna resposta
- [ ] Frontend acessível em `http://localhost:5173`
- [ ] Login funciona (usuário de teste dos seeds)
- [ ] Página de usuários lista dados do banco

---

## 🎉 Sucesso!

Se todos os checkpoints acima estiverem OK, o problema foi **100% resolvido** e o projeto agora pode ser clonado e executado em **qualquer máquina** com Docker instalado, sem necessidade de setup manual do banco de dados.

---

## 📝 Próximos Passos (Opcional)

Para ambientes de **produção**, considere:

1. **Migrations automáticas apenas em DEV**: Em produção, executar migrations manualmente por segurança
2. **Seeds condicionais**: Verificar se dados já existem antes de inserir
3. **Healthcheck melhorado**: Adicionar endpoint `/health` que verifica conexão com banco
4. **Variáveis de ambiente**: Criar arquivos `.env.local`, `.env.dev`, `.env.prod`

---

**Documentação atualizada em:** 2026-03-02
**Autor:** Claude Code
**Versão:** 1.0
