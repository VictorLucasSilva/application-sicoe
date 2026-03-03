# ===================================
# SICOE - Configuração DEV/LAB
# ===================================
# PowerShell script para Windows
# Execute: .\setup-env-dev.ps1

Write-Host "🔧 Configurando variáveis de ambiente DEV/LAB..." -ForegroundColor Green
Write-Host ""

# Environment
$env:NODE_ENV = "development"

# Database (Azure PostgreSQL)
# ⚠️  IMPORTANTE: Substitua os valores abaixo com as credenciais reais do Azure
$env:DB_HOST = "<SEU-SERVIDOR>.postgres.database.azure.com"
$env:DB_PORT = "5432"
$env:DB_USERNAME = "<SEU-USUARIO>"
$env:DB_PASSWORD = "<SUA-SENHA>"
$env:DB_DATABASE = "<SEU-DATABASE>"
$env:DB_SSL = "true"
$env:DB_SSL_REJECT_UNAUTHORIZED = "false"
$env:DB_SYNCHRONIZE = "false"
$env:DB_LOGGING = "true"

# Azure Storage
# ⚠️  IMPORTANTE: Substitua com a connection string real do Azure Portal > Storage Account > Access Keys
$env:AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=<ACCOUNT-NAME>;AccountKey=<ACCESS-KEY>;EndpointSuffix=core.windows.net"
$env:AZURE_MEDIA_CONTAINER = "media"

# JWT
$env:JWT_SECRET = "sicoe-dev-secret-change-in-prod"

# CORS
$env:CORS_ORIGIN = "http://localhost:5173"

Write-Host "✅ Variáveis configuradas!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Variáveis carregadas:" -ForegroundColor Yellow
Write-Host "  NODE_ENV: $env:NODE_ENV"
Write-Host "  DB_HOST: $env:DB_HOST"
Write-Host "  DB_DATABASE: $env:DB_DATABASE"
Write-Host "  AZURE_MEDIA_CONTAINER: $env:AZURE_MEDIA_CONTAINER"
Write-Host ""
Write-Host "🚀 Para rodar o projeto:" -ForegroundColor Cyan
Write-Host "  docker compose up -d"
Write-Host ""
Write-Host "🧪 Para testar:" -ForegroundColor Cyan
Write-Host "  curl http://localhost:3000/api/v1/health/all"
Write-Host ""
