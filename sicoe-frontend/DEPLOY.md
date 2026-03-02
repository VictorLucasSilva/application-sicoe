# SICOE Frontend - Guia de Deploy

## 📋 Pré-requisitos

- Node.js 20+
- npm ou yarn
- Docker (opcional, para deploy containerizado)

## 🚀 Deploy Local

### 1. Instalar Dependências
```bash
npm install
```

### 2. Build para Produção
```bash
npm run build:prod
```

Os arquivos otimizados serão gerados em `/dist`

### 3. Preview do Build
```bash
npm run preview
```

## 🐳 Deploy com Docker

### 1. Build da Imagem
```bash
npm run docker:build
```

### 2. Executar Container
```bash
npm run docker:run
```

Aplicação estará disponível em `http://localhost:3001`

### 3. Usando Docker Compose
```bash
npm run docker:compose
```

Para parar:
```bash
npm run docker:down
```

## 🌐 Deploy em Produção

### Variáveis de Ambiente

Criar arquivo `.env.production`:

```env
VITE_API_BASE_URL=https://api.producao.com/api/v1
VITE_ENV=production
```

### Nginx

O arquivo `nginx.conf` já está configurado com:
- Gzip compression
- Security headers
- Cache de assets estáticos
- Suporte a React Router
- Proxy reverso para API

### Segurança

Antes do deploy, garanta:
- [ ] Variáveis de ambiente configuradas
- [ ] HTTPS configurado
- [ ] CORS configurado no backend
- [ ] Rate limiting no nginx
- [ ] Firewall configurado

## 📊 Build Optimization

O Vite automaticamente:
- ✅ Minifica JavaScript e CSS
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Asset optimization
- ✅ Source maps (desabilitadas em prod)

## 🔍 Monitoramento

### Health Check
```bash
curl http://localhost:3001
```

### Logs do Docker
```bash
docker logs sicoe-frontend
```

### Build Stats
```bash
npm run build:prod -- --analyze
```

## 🏗️ CI/CD

Exemplo de GitHub Actions:

```yaml
name: Deploy Frontend

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '20'
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Run Tests
        run: npm run test:run
      
      - name: Build
        run: npm run build:prod
      
      - name: Build Docker Image
        run: docker build -t sicoe-frontend:${{ github.sha }} .
      
      - name: Push to Registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push sicoe-frontend:${{ github.sha }}
```

## 📝 Checklist de Deploy

- [ ] Testes passando (`npm run test:run`)
- [ ] Lint sem erros (`npm run lint`)
- [ ] Build de produção bem-sucedido
- [ ] Variáveis de ambiente configuradas
- [ ] Backup do ambiente anterior
- [ ] Documentação atualizada
- [ ] Rollback plan definido

## 🆘 Troubleshooting

### Build falha
```bash
# Limpar cache
rm -rf node_modules dist
npm install
npm run build
```

### Docker não inicia
```bash
# Verificar logs
docker logs sicoe-frontend

# Verificar portas em uso
lsof -i :3001
```

### API não conecta
Verificar:
1. VITE_API_BASE_URL no .env
2. CORS no backend
3. Proxy no nginx.conf

## 📞 Suporte

Para problemas de deploy, entre em contato com a equipe de DevOps.
