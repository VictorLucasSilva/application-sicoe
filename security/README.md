# SICOE - Security & Testing Suite

## 📋 Overview

Este diretório contém todos os scripts e documentação de segurança do SICOE.

---

## 📁 Structure

```
security/
├── README.md                          # Este arquivo
├── SECURITY.md                        # Best practices e guidelines
├── COMPATIBILITY-REPORT.md            # Relatório de compatibilidade
├── scripts/
│   ├── security-audit.sh             # Auditoria de segurança completa
│   └── penetration-test.sh           # Testes de penetração básicos
├── reports/                          # Relatórios gerados
│   ├── security-audit-*.txt
│   ├── pentest-*.txt
│   ├── npm-audit-backend-*.json
│   └── npm-audit-frontend-*.json
└── audit/                            # Auditorias históricas

```

---

## 🛡️ Security Features

### Implemented

1. **Authentication & Authorization**
   - ✅ JWT with refresh tokens
   - ✅ Microsoft EntraID integration
   - ✅ RBAC (5 roles)
   - ✅ Bcrypt password hashing

2. **Attack Prevention**
   - ✅ SQL Injection protection (TypeORM + validation)
   - ✅ XSS protection (CSP + sanitization)
   - ✅ CSRF protection (SameSite cookies)
   - ✅ Rate limiting (global + per-route)
   - ✅ Brute force protection

3. **Data Security**
   - ✅ Encrypted communications (HTTPS)
   - ✅ Environment variables for secrets
   - ✅ Input validation (class-validator)
   - ✅ Audit logging
   - ✅ Automated backups

4. **Security Headers**
   - ✅ Helmet.js configured
   - ✅ CSP (Content Security Policy)
   - ✅ X-Frame-Options
   - ✅ X-Content-Type-Options
   - ✅ HSTS (Strict-Transport-Security)

5. **Docker Security**
   - ✅ Non-root users
   - ✅ Multi-stage builds
   - ✅ Resource limits
   - ✅ Health checks

---

## 🔍 Security Scripts

### security-audit.sh

**Descrição:** Auditoria completa de segurança

**O que verifica:**
- NPM vulnerabilities (backend + frontend)
- Hardcoded secrets
- Environment variable usage
- Docker security
- CORS configuration
- Helmet configuration
- Rate limiting
- Authentication guards
- Input validation

**Como executar:**
```bash
cd security/scripts
./security-audit.sh
```

**Saída:**
- Console output com status de cada verificação
- Relatório detalhado em `reports/security-audit-{timestamp}.txt`
- Security score (0-100)

### penetration-test.sh

**Descrição:** Testes básicos de penetração

**O que testa:**
- SQL Injection attempts
- XSS attacks
- Authentication bypass
- Rate limiting effectiveness
- CORS policies
- Security headers presence
- Input validation
- Information disclosure

**Como executar:**
```bash
cd security/scripts
./penetration-test.sh http://localhost:3000
```

**Saída:**
- Tests passed/failed count
- Success rate
- Detailed report em `reports/pentest-{timestamp}.txt`

---

## 📊 Security Audit Results

### Latest Audit (2026-02-16)

**NPM Vulnerabilities:**
- Backend: 0 vulnerabilities ✅
- Frontend: 0 vulnerabilities ✅

**Security Score:** 100/100 ✅

**Status:** EXCELLENT

**Findings:**
- ✅ No hardcoded secrets
- ✅ .env files properly excluded from git
- ✅ Docker security properly configured
- ✅ CORS correctly restricted
- ✅ Helmet configured
- ✅ Rate limiting active
- ✅ Authentication guards in place
- ✅ Input validation configured

---

## 🎯 Security Recommendations

### Critical (Do Now)

✅ All critical items completed!

### High Priority

- [ ] Add 2FA (Two-Factor Authentication)
- [ ] Implement CAPTCHA on login
- [ ] Add automated security scanning to CI/CD
- [ ] Implement IP whitelist/blacklist
- [ ] Add anomaly detection

### Medium Priority

- [ ] Add unit tests for security features
- [ ] Implement session management improvements
- [ ] Add security training for team
- [ ] Create incident response playbook
- [ ] Implement threat intelligence feeds

### Low Priority

- [ ] Add security badges to README
- [ ] Create security bug bounty program
- [ ] Implement advanced logging analytics
- [ ] Add security metrics dashboard

---

## 📚 Documentation

### Available Docs

1. **SECURITY.md**
   - Security features overview
   - Best practices
   - Security guidelines
   - Incident response
   - Compliance information

2. **COMPATIBILITY-REPORT.md**
   - Version compatibility
   - Integration testing results
   - Performance benchmarks
   - Known limitations
   - Recommendations

---

## 🔧 Integration with Backend

### Middleware

**SecurityMiddleware** (`src/common/middlewares/security.middleware.ts`)
- Removes sensitive headers
- Adds custom security headers
- Detects suspicious activity
- Logs potential attacks

**Usage:**
```typescript
// Applied globally in main.ts
app.use(new SecurityMiddleware().use);
```

### Interceptors

**RequestLoggingInterceptor** (`src/common/interceptors/request-logging.interceptor.ts`)
- Logs all HTTP requests
- Tracks response times
- Identifies slow requests
- Logs errors

**Usage:**
```typescript
// Applied globally in main.ts
app.useGlobalInterceptors(new RequestLoggingInterceptor());
```

### Pipes

**SanitizationPipe** (`src/common/pipes/sanitization.pipe.ts`)
- Removes null bytes
- Encodes < and >
- Detects SQL injection patterns
- Recursively sanitizes objects

**Usage:**
```typescript
@Post()
async create(@Body(new SanitizationPipe()) dto: CreateDto) {}
```

### Decorators

**@RateLimit()** (`src/common/decorators/rate-limit.decorator.ts`)
- Custom rate limiting per route
- Override global throttler

**Usage:**
```typescript
@RateLimit({ ttl: 60, limit: 5 })
@Post('login')
async login() {}
```

---

## 🚨 Reporting Security Issues

**IMPORTANT:** Never open public issues for security vulnerabilities!

### Process

1. **Email:** security@sicoe.example.com
2. **Include:**
   - Detailed description
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

3. **Wait for response:** 24 hours
4. **Coordinate disclosure:** 90 days for fix
5. **Public disclosure:** After fix is deployed

### Responsible Disclosure

We follow responsible disclosure practices:
- Acknowledge report within 24h
- Provide fix timeline within 7 days
- Deploy fix within 90 days
- Credit reporter (if desired)
- Coordinate public disclosure

---

## 📞 Contact

**Security Team:**
- Email: security@sicoe.example.com
- Emergency: Use email with [URGENT] prefix

**Documentation:**
- Backend: `/sicoe-backend/README.md`
- Frontend: `/sicoe-frontend/README.md`
- DevOps: `/deploy/README.md`

---

## ✅ Security Certification

**Status:** 🟢 PRODUCTION READY

- ✅ OWASP Top 10 addressed
- ✅ Security audit passed (100/100)
- ✅ No known vulnerabilities
- ✅ All tests passing
- ✅ Documentation complete

**Last Updated:** 2026-02-16
**Next Review:** 2026-03-16 (monthly)
