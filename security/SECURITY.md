# SICOE - Security Best Practices

## 📋 Overview

Este documento descreve as práticas de segurança implementadas no SICOE e as diretrizes para manter o sistema seguro.

---

## 🔒 Security Features Implementadas

### 1. Autenticação e Autorização

**JWT (JSON Web Tokens)**
- Access tokens: 1 hora de validade
- Refresh tokens: 7 dias de validade
- Tokens assinados com secret de 256+ bits
- Refresh token rotation implementado

**Microsoft EntraID Integration**
- OAuth 2.0 flow
- Auto-criação de usuários autenticados
- Validação de e-mail domain

**RBAC (Role-Based Access Control)**
- 5 grupos: Administrador, Auditor, Gerente Regional, Usuário, Sem Acesso
- Permissões granulares por recurso
- Guards em todas as rotas protegidas

### 2. Proteção contra Ataques

**SQL Injection**
- ✅ TypeORM com queries parametrizadas
- ✅ Sem concatenação de strings em queries
- ✅ Input validation com class-validator
- ✅ Sanitization pipe adicional

**XSS (Cross-Site Scripting)**
- ✅ Content Security Policy (CSP) headers
- ✅ X-XSS-Protection header
- ✅ Input sanitization automática
- ✅ Output encoding no frontend

**CSRF (Cross-Site Request Forgery)**
- ✅ SameSite cookies
- ✅ Origin validation
- ✅ Custom headers requirement

**Rate Limiting**
- ✅ Throttler global: 10 req/min
- ✅ Rate limits personalizados por rota
- ✅ Login: 5 tentativas/min
- ✅ IP-based tracking

**Brute Force Protection**
- ✅ Account lockout após N tentativas
- ✅ Exponential backoff
- ✅ CAPTCHA em produção (recomendado)

### 3. Segurança de Dados

**Criptografia**
- ✅ Senhas com bcrypt (salt rounds: 10)
- ✅ HTTPS obrigatório em produção
- ✅ Secrets em variáveis de ambiente
- ✅ .env excluído do git

**Validação de Entrada**
- ✅ ValidationPipe global
- ✅ DTOs com class-validator
- ✅ Whitelist automática
- ✅ Transform habilitado

**Auditoria**
- ✅ Logs de todas as ações
- ✅ Timestamp de criação/atualização
- ✅ Rastreamento de usuário
- ✅ IP e User-Agent logging

### 4. Security Headers

**Helmet.js Configurado**
```typescript
- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy
```

### 5. Docker Security

**Container Hardening**
- ✅ Multi-stage builds (imagens mínimas)
- ✅ Non-root users
- ✅ Read-only filesystem onde possível
- ✅ Resource limits (CPU/Memory)
- ✅ Health checks

**Image Security**
- ✅ Official base images (alpine)
- ✅ Image scanning (recomendado)
- ✅ No secrets in images
- ✅ Minimal layers

### 6. Network Security

**CORS**
- ✅ Whitelist específico de origins
- ✅ Credentials habilitados apenas para origins permitidos
- ✅ Methods restritos

**Firewall**
- ✅ UFW configurado (apenas 22, 80, 443)
- ✅ Fail2ban ativo
- ✅ Internal network para serviços

---

## 🎯 Security Checklist

### Development

- [ ] Nunca commitar .env files
- [ ] Usar .env.example com valores fake
- [ ] Validar todos os inputs
- [ ] Sanitizar todos os outputs
- [ ] Usar HTTPS localmente (quando possível)
- [ ] Testar com usuários sem privilégios
- [ ] Code review focado em segurança

### Pre-Production

- [ ] Executar `npm audit`
- [ ] Executar security-audit.sh
- [ ] Executar penetration-test.sh
- [ ] Verificar logs de segurança
- [ ] Testar todos os guards
- [ ] Testar rate limiting
- [ ] Validar CORS configuration

### Production

- [ ] Secrets únicos e fortes (64+ chars)
- [ ] HTTPS obrigatório (SSL/TLS válido)
- [ ] Firewall configurado
- [ ] Fail2ban ativo
- [ ] Backups automáticos configurados
- [ ] Monitoring ativo
- [ ] Logs sendo coletados
- [ ] Automatic security updates

---

## 🛡️ Security Guidelines

### Senhas

**Requisitos Mínimos:**
- Mínimo 8 caracteres
- Pelo menos 1 maiúscula
- Pelo menos 1 minúscula
- Pelo menos 1 número
- Pelo menos 1 caractere especial

**Backend Secrets:**
- Mínimo 32 caracteres
- Caracteres aleatórios
- Nunca reutilizar
- Rotacionar periodicamente

### API Keys

**Armazenamento:**
- Sempre em variáveis de ambiente
- Nunca no código
- Nunca no frontend
- Rotacionar se expostas

**Uso:**
- Validar em cada request
- Rate limit agressivo
- Log de uso
- Revogar se suspeito

### Tokens JWT

**Best Practices:**
- Short expiration (1h)
- Refresh token rotation
- Blacklist se necessário
- Validar signature sempre
- Verificar expiration
- Verificar issuer/audience

---

## 🔍 Security Monitoring

### Logs a Monitorar

**Logs de Segurança:**
- Failed login attempts
- Rate limit violations
- Suspicious patterns detected
- 401/403 responses
- 500 errors

**Logs de Auditoria:**
- User creation/deletion
- Permission changes
- Data modifications
- Admin actions

### Alertas Críticos

**Immediate Action Required:**
- Multiple failed logins
- SQL injection attempts
- Unusual traffic patterns
- Repeated 403/401 errors
- Database connection issues

### Métricas de Segurança

**KPIs:**
- Failed login rate
- Rate limit violations/day
- Average response time
- Error rate
- Vulnerabilities found

---

## 🚨 Incident Response

### 1. Detectar

- Monitoring alerts
- Log analysis
- User reports
- Security scans

### 2. Analisar

- Collect logs
- Identify scope
- Determine impact
- Document timeline

### 3. Conter

- Block malicious IPs
- Disable compromised accounts
- Rotate secrets
- Deploy patches

### 4. Recuperar

- Restore from backup
- Reset passwords
- Verify integrity
- Monitor closely

### 5. Aprender

- Post-mortem meeting
- Update procedures
- Improve monitoring
- Train team

---

## 📚 Security Resources

### Tools

**Security Scanning:**
- `npm audit` - Dependency vulnerabilities
- `./security-audit.sh` - Custom security audit
- `./penetration-test.sh` - Basic penetration testing
- Snyk - Advanced dependency scanning
- OWASP ZAP - Web application scanner

**Monitoring:**
- `./monitor.sh` - Real-time monitoring
- `./health-check.sh` - Health checks
- Docker logs - Container logs
- Winston - Application logs

### References

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- NestJS Security: https://docs.nestjs.com/security/
- JWT Best Practices: https://tools.ietf.org/html/rfc8725
- Docker Security: https://docs.docker.com/engine/security/

---

## ✅ Security Compliance

### Requisitos Atendidos

- ✅ LGPD compliance ready
- ✅ Password hashing (bcrypt)
- ✅ Encrypted communications (HTTPS)
- ✅ Access control (RBAC)
- ✅ Audit trail
- ✅ Data backup
- ✅ Incident response plan

### Próximos Passos

- [ ] Implementar 2FA (Two-Factor Authentication)
- [ ] Adicionar CAPTCHA em login
- [ ] Implementar CSP mais restritivo
- [ ] Adicionar rate limiting por usuário
- [ ] Implementar IP whitelist/blacklist
- [ ] Adicionar security headers no nginx
- [ ] Implementar automated security scans
- [ ] Adicionar threat intelligence feeds

---

## 📞 Contato

**Security Issues:**
- Reportar vulnerabilidades: security@sicoe.example.com
- Não abrir issues públicos para vulnerabilidades
- Aguardar resposta antes de disclosure

**Responsible Disclosure:**
1. Enviar relatório detalhado
2. Aguardar confirmação (24h)
3. Permitir tempo para fix (90 dias)
4. Coordenar disclosure público
