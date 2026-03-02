# SICOE - Ambiente Local (Docker Compose)

Este diretório contém a configuração do ambiente local usando Docker Compose.

## Pré-requisitos

- Docker 20.10+
- Docker Compose 2.0+
- Portas disponíveis: 3000 (backend), 5173 (frontend), 5432 (postgres)

## Configuração

1. Copiar arquivo de exemplo:
   ```bash
   cp .env.example .env
   ```

2. Editar `.env` com as configurações desejadas

## Comandos

### Iniciar ambiente
```bash
docker compose up -d
```

### Ver logs
```bash
docker compose logs -f
```

### Parar ambiente
```bash
docker compose down
```

### Parar e remover volumes (CUIDADO: apaga dados)
```bash
docker compose down -v
```

### Rebuild após mudanças
```bash
docker compose up -d --build
```

### Ver status dos serviços
```bash
docker compose ps
```

## Acessos

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api/v1
- **PostgreSQL**: localhost:5432
  - Database: sicoe_db
  - User: sicoe_user
  - Password: (ver .env)

## Healthchecks

Todos os serviços possuem healthchecks configurados:
- PostgreSQL: Verifica conexão com banco
- Backend: Verifica endpoint /api/v1
- Frontend: Verifica servidor nginx

## Troubleshooting

### Backend não conecta ao banco
```bash
docker compose logs postgres
docker compose restart backend
```

### Frontend não carrega
```bash
docker compose logs frontend
docker compose restart frontend
```

### Rebuild completo
```bash
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

## Estrutura de Volumes

- `sicoe-postgres-data`: Dados persistentes do PostgreSQL
