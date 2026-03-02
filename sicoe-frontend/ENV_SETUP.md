# 🔐 Configuração de Variáveis de Ambiente - SICOE Frontend

## 📋 Variáveis Obrigatórias

### Para Build (Build-time)
Estas variáveis são necessárias durante o build do projeto:

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_API_BASE_URL` | URL base da API backend | `http://localhost:3000/api/v1` |
| `VITE_ENV` | Ambiente de execução | `development` ou `production` |

## 🏠 Ambiente Local (Desenvolvimento)

### Opção 1: Arquivo .env (local)
```bash
# Copiar o exemplo
cp .env.example .env

# Editar com suas configurações
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_ENV=development
```

### Opção 2: Variáveis do Sistema
```bash
# Linux/Mac
export VITE_API_BASE_URL=http://localhost:3000/api/v1
export VITE_ENV=development
npm run dev

# Windows (PowerShell)
$env:VITE_API_BASE_URL="http://localhost:3000/api/v1"
$env:VITE_ENV="development"
npm run dev
```

## 🐳 Docker Compose (Local)

```bash
# 1. Criar arquivo .env na raiz do projeto
cat > .env << 'EOL'
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_ENV=development
FRONTEND_PORT=3001
NODE_ENV=production
EOL

# 2. Subir com docker-compose
docker-compose up --build
```

## 🏢 Ambiente de Desenvolvimento (DevOps)

### CI/CD (GitHub Actions, GitLab CI, etc.)
```yaml
# Exemplo GitHub Actions
env:
  VITE_API_BASE_URL: ${{ secrets.DEV_API_URL }}
  VITE_ENV: development

# Exemplo GitLab CI
variables:
  VITE_API_BASE_URL: "${DEV_API_URL}"
  VITE_ENV: "development"
```

### Kubernetes
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: frontend-config
data:
  VITE_API_BASE_URL: "https://api-dev.sicoe.com/api/v1"
  VITE_ENV: "development"
```

### Docker
```bash
docker build \
  --build-arg VITE_API_BASE_URL=https://api-dev.sicoe.com/api/v1 \
  --build-arg VITE_ENV=development \
  -t sicoe-frontend:dev .

docker run -p 3001:80 sicoe-frontend:dev
```

## 🚀 Ambiente de Produção

### Kubernetes (Recomendado)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sicoe-frontend
spec:
  template:
    spec:
      containers:
      - name: frontend
        image: sicoe-frontend:latest
        env:
        - name: VITE_API_BASE_URL
          valueFrom:
            secretKeyRef:
              name: sicoe-secrets
              key: api-url
        - name: VITE_ENV
          value: "production"
```

### Docker
```bash
# Build
docker build \
  --build-arg VITE_API_BASE_URL=https://api.sicoe.com/api/v1 \
  --build-arg VITE_ENV=production \
  -t sicoe-frontend:prod .

# Run
docker run -d \
  -p 80:80 \
  --name sicoe-frontend \
  sicoe-frontend:prod
```

### Docker Compose (Produção)
```yaml
version: '3.8'
services:
  frontend:
    image: sicoe-frontend:${VERSION:-latest}
    build:
      args:
        - VITE_API_BASE_URL=${PROD_API_URL}
        - VITE_ENV=production
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## ⚠️ Segurança

### ❌ NUNCA FAÇA:
- ✗ Commitar arquivos `.env` com valores reais
- ✗ Expor secrets em logs ou código
- ✗ Usar valores hardcoded em produção

### ✅ SEMPRE FAÇA:
- ✓ Use variáveis de ambiente do sistema
- ✓ Mantenha secrets em vaults (HashiCorp Vault, AWS Secrets Manager)
- ✓ Use `.env.example` apenas como template
- ✓ Configure diferentes valores para dev/staging/prod
- ✓ Rotate secrets periodicamente

## 🔍 Verificação

### Verificar variáveis durante build:
```bash
npm run build
# Vite mostrará as variáveis VITE_* detectadas
```

### Verificar em runtime (DevTools):
```javascript
console.log(import.meta.env.VITE_API_BASE_URL);
console.log(import.meta.env.VITE_ENV);
```

## 📝 Checklist de Deploy

- [ ] Variáveis de ambiente configuradas no servidor
- [ ] `.env` **NÃO** está commitado no repositório
- [ ] Valores de produção diferentes de desenvolvimento
- [ ] HTTPS configurado para produção
- [ ] Secrets armazenados de forma segura
- [ ] CI/CD configurado com secrets corretos
- [ ] Healthcheck funcionando
- [ ] Logs não expõem informações sensíveis

## 🆘 Troubleshooting

### Build falha: "VITE_API_BASE_URL is undefined"
```bash
# Verificar se variável está definida
echo $VITE_API_BASE_URL

# Se não, defina:
export VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### Docker build falha
```bash
# Passar variáveis explicitamente
docker build \
  --build-arg VITE_API_BASE_URL=$VITE_API_BASE_URL \
  --build-arg VITE_ENV=$VITE_ENV \
  .
```

### API não conecta
1. Verificar se `VITE_API_BASE_URL` está correto
2. Verificar CORS no backend
3. Verificar rede entre frontend e backend
4. Verificar firewall/security groups
