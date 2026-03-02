# SICOE - API Documentation

## 📋 Overview

Esta documentação descreve todos os endpoints da API REST do SICOE, incluindo autenticação, autorização, request/response schemas e exemplos de uso.

**Base URL:** `http://localhost:3000/api/v1`

**Versão:** 1.0.0

---

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Após o login, o token deve ser incluído no header `Authorization` de todas as requisições protegidas.

**Header Format:**
```
Authorization: Bearer {access_token}
```

**Token Expiration:**
- Access Token: 1 hora
- Refresh Token: 7 dias

---

## 📚 Índice

1. [Authentication](#authentication)
2. [Users](#users)
3. [Establishments](#establishments)
4. [Audit Logs](#audit-logs)
5. [Email Logs](#email-logs)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)
8. [RBAC - Grupos e Permissões](#rbac)

---

## Authentication

### POST /auth/login

Realiza login e retorna access token e refresh token.

**Access:** Público (não requer autenticação)

**Request:**
```json
{
  "username": "admin",
  "password": "Admin@123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@sicoe.com",
    "first_name": "Administrator",
    "last_name": "System",
    "groups": [
      {
        "id": 1,
        "nm_group": "Administrador"
      }
    ]
  }
}
```

**Errors:**
- `401 Unauthorized` - Credenciais inválidas
- `400 Bad Request` - Dados inválidos

**Example (curl):**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}'
```

---

### POST /auth/register

Registra novo usuário no sistema (apenas para testes em desenvolvimento).

**Access:** Público

**Request:**
```json
{
  "username": "newuser",
  "password": "Pass@123",
  "email": "newuser@example.com",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "username": "newuser",
  "email": "newuser@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "flg_active": true
}
```

**Errors:**
- `409 Conflict` - Username ou email já existe
- `400 Bad Request` - Validação falhou

---

### POST /auth/refresh

Renova o access token usando refresh token.

**Access:** Público

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
- `401 Unauthorized` - Refresh token inválido ou expirado

---

### GET /auth/profile

Retorna perfil do usuário autenticado.

**Access:** Autenticado

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@sicoe.com",
  "first_name": "Administrator",
  "last_name": "System",
  "num_employee": "EMP001",
  "flg_active": true,
  "flg_status_email": true,
  "dt_expiration": null,
  "ts_last_login": "2026-02-16T10:30:00Z",
  "groups": [
    {
      "id": 1,
      "nm_group": "Administrador"
    }
  ],
  "establishments": []
}
```

**Errors:**
- `401 Unauthorized` - Token inválido ou expirado

---

### POST /auth/logout

Realiza logout e invalida o refresh token.

**Access:** Autenticado

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

---

## Users

### GET /users

Lista todos os usuários com filtros e paginação.

**Access:** Autenticado (todos os grupos)

**Query Parameters:**
- `page` (number, default: 1) - Página atual
- `limit` (number, default: 10) - Itens por página
- `search` (string) - Busca por nome ou login
- `group` (number) - Filtrar por ID do grupo
- `establishment` (number) - Filtrar por ID do estabelecimento
- `active` (boolean) - Filtrar por status ativo
- `sort` (string) - Campo para ordenação (ex: "username", "-created_at")

**Example Request:**
```bash
GET /api/v1/users?page=1&limit=10&search=admin&active=true&sort=-ts_creation
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "username": "admin",
      "email": "admin@sicoe.com",
      "first_name": "Administrator",
      "last_name": "System",
      "num_employee": "EMP001",
      "flg_active": true,
      "flg_status_email": true,
      "dt_expiration": null,
      "ts_last_login": "2026-02-16T10:30:00Z",
      "ts_creation": "2026-01-01T00:00:00Z",
      "ts_updated": "2026-02-16T10:30:00Z",
      "groups": [
        {
          "id": 1,
          "nm_group": "Administrador"
        }
      ],
      "establishments": []
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

**Errors:**
- `401 Unauthorized` - Não autenticado

---

### GET /users/:id

Busca usuário por ID.

**Access:** Autenticado (todos os grupos)

**Response (200 OK):**
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@sicoe.com",
  "first_name": "Administrator",
  "last_name": "System",
  "num_employee": "EMP001",
  "flg_active": true,
  "flg_status_email": true,
  "dt_expiration": null,
  "ts_last_login": "2026-02-16T10:30:00Z",
  "groups": [
    {
      "id": 1,
      "nm_group": "Administrador"
    }
  ],
  "establishments": []
}
```

**Errors:**
- `404 Not Found` - Usuário não encontrado
- `401 Unauthorized` - Não autenticado

---

### POST /users

Cria novo usuário.

**Access:** Apenas Administrador

**Request:**
```json
{
  "username": "user1",
  "password": "Pass@123",
  "email": "user1@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "num_employee": "EMP002",
  "flg_active": true,
  "flg_status_email": true,
  "dt_expiration": "2027-12-31",
  "group_ids": [2],
  "establishment_ids": [1]
}
```

**Validation Rules:**
- `username`: Required, min 3 chars, max 256 chars, unique
- `password`: Required, min 8 chars, must contain uppercase, lowercase, number, special char
- `email`: Required, valid email format, unique
- `first_name`: Required, max 256 chars
- `last_name`: Required, max 256 chars
- `num_employee`: Optional, max 100 chars
- `group_ids`: Optional, array of group IDs
- `establishment_ids`: Optional, array of establishment IDs

**Response (201 Created):**
```json
{
  "id": 2,
  "username": "user1",
  "email": "user1@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "num_employee": "EMP002",
  "flg_active": true,
  "groups": [
    {
      "id": 2,
      "nm_group": "Auditor"
    }
  ],
  "establishments": [
    {
      "id": 1,
      "nm_establishment": "Hospital Central"
    }
  ]
}
```

**Errors:**
- `403 Forbidden` - Usuário não é Administrador
- `409 Conflict` - Username ou email já existe
- `400 Bad Request` - Validação falhou

---

### PATCH /users/:id

Atualiza usuário existente.

**Access:** Apenas Administrador

**Request:**
```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane.smith@example.com",
  "flg_active": true,
  "dt_expiration": "2027-12-31"
}
```

**Response (200 OK):**
```json
{
  "id": 2,
  "username": "user1",
  "email": "jane.smith@example.com",
  "first_name": "Jane",
  "last_name": "Smith",
  "flg_active": true,
  "dt_expiration": "2027-12-31",
  "ts_updated": "2026-02-16T11:00:00Z"
}
```

**Errors:**
- `403 Forbidden` - Usuário não é Administrador
- `404 Not Found` - Usuário não encontrado
- `400 Bad Request` - Validação falhou

---

### DELETE /users/:id

Remove usuário (soft delete - seta flg_active = false).

**Access:** Apenas Administrador

**Response (200 OK):**
```json
{
  "message": "User deleted successfully"
}
```

**Errors:**
- `403 Forbidden` - Usuário não é Administrador
- `404 Not Found` - Usuário não encontrado

---

### POST /users/:id/groups

Adiciona grupos ao usuário.

**Access:** Apenas Administrador

**Request:**
```json
{
  "group_ids": [2, 3]
}
```

**Response (200 OK):**
```json
{
  "id": 2,
  "username": "user1",
  "groups": [
    {
      "id": 2,
      "nm_group": "Auditor"
    },
    {
      "id": 3,
      "nm_group": "Gerente Regional"
    }
  ]
}
```

**Errors:**
- `403 Forbidden` - Usuário não é Administrador
- `404 Not Found` - Usuário ou grupo não encontrado

---

### DELETE /users/:id/groups/:groupId

Remove grupo do usuário.

**Access:** Apenas Administrador

**Response (200 OK):**
```json
{
  "message": "Group removed successfully"
}
```

**Errors:**
- `403 Forbidden` - Usuário não é Administrador
- `404 Not Found` - Usuário ou grupo não encontrado

---

### POST /users/:id/establishments

Adiciona estabelecimentos ao usuário.

**Access:** Apenas Administrador

**Request:**
```json
{
  "establishment_ids": [1, 2]
}
```

**Response (200 OK):**
```json
{
  "id": 2,
  "username": "user1",
  "establishments": [
    {
      "id": 1,
      "nm_establishment": "Hospital Central"
    },
    {
      "id": 2,
      "nm_establishment": "Clínica Norte"
    }
  ]
}
```

**Errors:**
- `403 Forbidden` - Usuário não é Administrador
- `404 Not Found` - Usuário ou estabelecimento não encontrado

---

### DELETE /users/:id/establishments/:establishmentId

Remove estabelecimento do usuário.

**Access:** Apenas Administrador

**Response (200 OK):**
```json
{
  "message": "Establishment removed successfully"
}
```

**Errors:**
- `403 Forbidden` - Usuário não é Administrador
- `404 Not Found` - Usuário ou estabelecimento não encontrado

---

## Establishments

### GET /establishments

Lista todos os estabelecimentos com filtros e paginação.

**Access:** Autenticado (todos os grupos)

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `search` (string) - Busca por nome
- `region` (number) - Filtrar por região
- `state` (number) - Filtrar por estado
- `active` (boolean) - Filtrar por status ativo
- `sort` (string) - Campo para ordenação

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "nm_establishment": "Hospital Central",
      "cd_establishment": "HC001",
      "flg_active": true,
      "region": {
        "id": 1,
        "nm_region": "Região Sul"
      },
      "state": {
        "id": 1,
        "nm_state": "Paraná",
        "sg_state": "PR"
      },
      "ts_creation": "2026-01-01T00:00:00Z",
      "ts_updated": "2026-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

### GET /establishments/:id

Busca estabelecimento por ID.

**Access:** Autenticado (todos os grupos)

**Response (200 OK):**
```json
{
  "id": 1,
  "nm_establishment": "Hospital Central",
  "cd_establishment": "HC001",
  "flg_active": true,
  "region": {
    "id": 1,
    "nm_region": "Região Sul"
  },
  "state": {
    "id": 1,
    "nm_state": "Paraná",
    "sg_state": "PR"
  },
  "users": [
    {
      "id": 2,
      "username": "user1",
      "first_name": "John",
      "last_name": "Doe"
    }
  ],
  "units": [],
  "documents": []
}
```

**Errors:**
- `404 Not Found` - Estabelecimento não encontrado

---

### POST /establishments

Cria novo estabelecimento.

**Access:** Apenas Administrador

**Request:**
```json
{
  "nm_establishment": "Clínica Norte",
  "cd_establishment": "CN001",
  "flg_active": true,
  "fk_region": 1,
  "fk_state": 1
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "nm_establishment": "Clínica Norte",
  "cd_establishment": "CN001",
  "flg_active": true,
  "region": {
    "id": 1,
    "nm_region": "Região Sul"
  },
  "state": {
    "id": 1,
    "nm_state": "Paraná",
    "sg_state": "PR"
  }
}
```

**Errors:**
- `403 Forbidden` - Usuário não é Administrador
- `400 Bad Request` - Validação falhou

---

### PATCH /establishments/:id

Atualiza estabelecimento existente.

**Access:** Apenas Administrador

**Response (200 OK):**
```json
{
  "id": 2,
  "nm_establishment": "Clínica Norte Atualizada",
  "cd_establishment": "CN001",
  "flg_active": true,
  "ts_updated": "2026-02-16T11:00:00Z"
}
```

**Errors:**
- `403 Forbidden` - Usuário não é Administrador
- `404 Not Found` - Estabelecimento não encontrado

---

### DELETE /establishments/:id

Remove estabelecimento (soft delete).

**Access:** Apenas Administrador

**Response (200 OK):**
```json
{
  "message": "Establishment deleted successfully"
}
```

**Errors:**
- `403 Forbidden` - Usuário não é Administrador
- `404 Not Found` - Estabelecimento não encontrado

---

## Audit Logs

### GET /audit

Lista logs de auditoria com filtros e paginação.

**Access:** Autenticado (todos os grupos)

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `user_id` (number) - Filtrar por usuário
- `action_id` (number) - Filtrar por ação (1=Criação, 2=Alteração, etc.)
- `object_id` (number) - Filtrar por objeto (1=Usuário, 2=Anexo, etc.)
- `start_date` (date) - Data inicial (YYYY-MM-DD)
- `end_date` (date) - Data final (YYYY-MM-DD)
- `search` (string) - Busca em descrição
- `sort` (string) - Campo para ordenação (default: "-ts_action")

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "tx_description": "Login realizado com sucesso",
      "ts_action": "2026-02-16T10:30:00Z",
      "user": {
        "id": 1,
        "username": "admin",
        "first_name": "Administrator"
      },
      "action": {
        "id": 6,
        "nm_action": "Login"
      },
      "object": {
        "id": 1,
        "nm_object": "Usuário"
      }
    },
    {
      "id": 2,
      "tx_description": "Usuário 'user1' criado",
      "ts_action": "2026-02-16T10:45:00Z",
      "user": {
        "id": 1,
        "username": "admin",
        "first_name": "Administrator"
      },
      "action": {
        "id": 1,
        "nm_action": "Criação"
      },
      "object": {
        "id": 1,
        "nm_object": "Usuário"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 2,
    "totalPages": 1
  }
}
```

**Errors:**
- `401 Unauthorized` - Não autenticado

**Example Request:**
```bash
curl http://localhost:3000/api/v1/audit?page=1&limit=10&action_id=1&start_date=2026-02-01&end_date=2026-02-28 \
  -H "Authorization: Bearer {token}"
```

---

## Email Logs

### GET /email

Lista logs de e-mails enviados com filtros e paginação.

**Access:** Autenticado (todos os grupos)

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `type` (string) - Tipo de e-mail
- `object` (string) - Objeto do e-mail
- `destination` (string) - Destinatário
- `start_date` (date) - Data inicial de envio
- `end_date` (date) - Data final de envio
- `sort` (string) - Campo para ordenação (default: "-ts_sent")

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "tp_email": "Boas-vindas",
      "tx_object": "Bem-vindo ao SICOE",
      "tx_destination": "user1@example.com",
      "tx_body": "Olá John, bem-vindo ao sistema SICOE...",
      "flg_sent": true,
      "ts_sent": "2026-02-16T10:45:00Z",
      "ts_creation": "2026-02-16T10:45:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

**Errors:**
- `401 Unauthorized` - Não autenticado

---

## Error Handling

A API retorna erros no seguinte formato:

**Error Response:**
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [
    {
      "field": "email",
      "message": "email must be a valid email"
    },
    {
      "field": "password",
      "message": "password must be at least 8 characters"
    }
  ]
}
```

**HTTP Status Codes:**
- `200 OK` - Sucesso
- `201 Created` - Recurso criado com sucesso
- `400 Bad Request` - Validação falhou ou dados inválidos
- `401 Unauthorized` - Não autenticado ou token inválido
- `403 Forbidden` - Sem permissão para acessar recurso
- `404 Not Found` - Recurso não encontrado
- `409 Conflict` - Conflito (ex: username já existe)
- `429 Too Many Requests` - Rate limit excedido
- `500 Internal Server Error` - Erro no servidor

---

## Rate Limiting

A API possui rate limiting para proteger contra abusos:

**Global Rate Limit:**
- **TTL:** 60 segundos
- **Limite:** 60 requisições por minuto

**Auth Endpoints (login, register):**
- **TTL:** 60 segundos
- **Limite:** 10 requisições por minuto

**Response Headers:**
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1645012800
```

**Rate Limit Exceeded (429):**
```json
{
  "statusCode": 429,
  "message": "Too Many Requests",
  "error": "ThrottlerException"
}
```

---

## RBAC

### Grupos e Permissões

O sistema possui 5 grupos com diferentes níveis de acesso:

**1. Administrador**
- Acesso total a todos os recursos
- Pode criar, editar e deletar usuários
- Pode gerenciar estabelecimentos
- Pode visualizar todos os logs

**2. Auditor**
- Acesso somente leitura a todos os recursos
- Pode visualizar usuários, estabelecimentos e logs
- Não pode criar, editar ou deletar

**3. Gerente Regional**
- Acesso somente leitura aos recursos
- Pode visualizar estabelecimentos de sua região
- Pode visualizar logs de auditoria

**4. Usuário**
- Acesso limitado
- Pode visualizar seu próprio perfil
- Pode visualizar estabelecimentos vinculados

**5. Sem Acesso**
- Nenhum acesso ao sistema
- Usuário inativo

### Endpoints por Grupo

| Endpoint | Administrador | Auditor | Gerente | Usuário | Sem Acesso |
|----------|---------------|---------|---------|---------|------------|
| POST /auth/login | ✓ | ✓ | ✓ | ✓ | ✗ |
| GET /auth/profile | ✓ | ✓ | ✓ | ✓ | ✗ |
| GET /users | ✓ | ✓ | ✓ | ✓ | ✗ |
| POST /users | ✓ | ✗ | ✗ | ✗ | ✗ |
| PATCH /users/:id | ✓ | ✗ | ✗ | ✗ | ✗ |
| DELETE /users/:id | ✓ | ✗ | ✗ | ✗ | ✗ |
| GET /establishments | ✓ | ✓ | ✓ | ✓ | ✗ |
| POST /establishments | ✓ | ✗ | ✗ | ✗ | ✗ |
| PATCH /establishments/:id | ✓ | ✗ | ✗ | ✗ | ✗ |
| GET /audit | ✓ | ✓ | ✓ | ✓ | ✗ |
| GET /email | ✓ | ✓ | ✓ | ✓ | ✗ |

---

## Paginação

Todos os endpoints de listagem suportam paginação:

**Query Parameters:**
- `page` (number, default: 1) - Página atual
- `limit` (number, default: 10, max: 100) - Itens por página

**Response Meta:**
```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

## Ordenação (Sorting)

Endpoints de listagem suportam ordenação:

**Query Parameter:**
- `sort` (string) - Campo para ordenar (prefixo `-` para desc)

**Examples:**
- `?sort=username` - Ordena por username ASC
- `?sort=-ts_creation` - Ordena por data de criação DESC
- `?sort=first_name,last_name` - Ordena por múltiplos campos

---

## Filtros

### Users Filters
- `search` - Busca em username, first_name, last_name, email
- `group` - ID do grupo
- `establishment` - ID do estabelecimento
- `active` - true/false

### Audit Filters
- `user_id` - ID do usuário
- `action_id` - ID da ação (1-7)
- `object_id` - ID do objeto (1-4)
- `start_date` - Data inicial (YYYY-MM-DD)
- `end_date` - Data final (YYYY-MM-DD)
- `search` - Busca em descrição

### Email Filters
- `type` - Tipo de e-mail
- `object` - Objeto do e-mail
- `destination` - Destinatário
- `start_date` - Data inicial de envio
- `end_date` - Data final de envio

---

## Health Check

### GET /health

Verifica saúde da API e database.

**Access:** Público

**Response (200 OK):**
```json
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "database": {
      "status": "up"
    }
  }
}
```

---

## Swagger/OpenAPI

A documentação interativa da API está disponível em:

**URL:** `http://localhost:3000/api/docs`

**Features:**
- Documentação interativa
- Testar endpoints diretamente
- Schemas de request/response
- Exemplos de uso

---

## Exemplos de Uso

### Fluxo Completo de Autenticação

```bash
# 1. Login
TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}' \
  | jq -r '.access_token')

# 2. Acessar recurso protegido
curl -s http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer $TOKEN"

# 3. Renovar token
REFRESH_TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}' \
  | jq -r '.refresh_token')

NEW_TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refresh_token\":\"$REFRESH_TOKEN\"}" \
  | jq -r '.access_token')
```

### CRUD Completo de Usuário

```bash
# 1. Criar usuário
USER_ID=$(curl -s -X POST http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "password": "Pass@123",
    "email": "newuser@example.com",
    "first_name": "New",
    "last_name": "User",
    "group_ids": [2]
  }' | jq -r '.id')

# 2. Buscar usuário
curl -s http://localhost:3000/api/v1/users/$USER_ID \
  -H "Authorization: Bearer $TOKEN"

# 3. Atualizar usuário
curl -s -X PATCH http://localhost:3000/api/v1/users/$USER_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Updated",
    "flg_active": true
  }'

# 4. Adicionar grupo
curl -s -X POST http://localhost:3000/api/v1/users/$USER_ID/groups \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"group_ids": [3]}'

# 5. Deletar usuário
curl -s -X DELETE http://localhost:3000/api/v1/users/$USER_ID \
  -H "Authorization: Bearer $TOKEN"
```

### Filtros e Paginação Avançados

```bash
# Buscar usuários ativos do grupo Auditor, paginado
curl -s "http://localhost:3000/api/v1/users?page=1&limit=5&group=2&active=true&sort=-ts_creation" \
  -H "Authorization: Bearer $TOKEN"

# Buscar logs de auditoria de Login do último mês
curl -s "http://localhost:3000/api/v1/audit?action_id=6&start_date=2026-01-01&end_date=2026-01-31&sort=-ts_action" \
  -H "Authorization: Bearer $TOKEN"

# Buscar e-mails enviados para um destinatário
curl -s "http://localhost:3000/api/v1/email?destination=user@example.com&sort=-ts_sent" \
  -H "Authorization: Bearer $TOKEN"
```

---

## Postman Collection

Uma collection do Postman está disponível em `/docs/api/SICOE.postman_collection.json` com todos os endpoints configurados e exemplos de uso.

**Como importar:**
1. Abra o Postman
2. File > Import
3. Selecione o arquivo `SICOE.postman_collection.json`
4. Configure a variável `base_url` para `http://localhost:3000/api/v1`
5. Execute o request de Login para obter o token
6. O token será automaticamente usado nos próximos requests

---

## Versionamento

A API utiliza versionamento via URL:

**Current Version:** `v1`
**Base URL:** `/api/v1`

Versões futuras serão disponibilizadas em URLs separadas (ex: `/api/v2`) para manter compatibilidade retroativa.

---

## Suporte

**Documentação:**
- [Main README](../../README.md)
- [Architecture](../architecture/README.md)
- [Developer Guide](../developer-guide/README.md)

**Issues:**
- Reporte bugs e sugestões no repositório do projeto

---

**Last Updated:** 2026-02-16
**Version:** 1.0.0
