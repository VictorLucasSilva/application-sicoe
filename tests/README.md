# SICOE - Testing Suite

## 📋 Overview

Este diretório contém toda a estrutura de testes do SICOE, incluindo testes unitários, de integração, E2E, performance e segurança.

---

## 📁 Structure

```
tests/
├── README.md                       # Este arquivo
├── scripts/
│   ├── run-all-tests.sh           # Executa todos os testes
│   ├── api-tests.sh               # Testes de API
│   ├── integration-tests.sh       # Testes de integração
│   └── performance-tests.sh       # Testes de performance
├── unit/                          # Testes unitários adicionais
├── integration/                   # Testes de integração
├── e2e/                           # Testes end-to-end
├── performance/                   # Resultados de performance
└── reports/                       # Relatórios gerados
    └── test-results-*.txt
```

---

## 🧪 Tipos de Testes

### 1. Testes Unitários

**Backend (Jest)**
- Localização: `sicoe-backend/src/**/*.spec.ts`
- Framework: Jest
- Coverage: Objetivo 80%

**Executar:**
```bash
cd sicoe-backend
npm run test                # Run all tests
npm run test:watch          # Watch mode
npm run test:cov            # With coverage
npm run test:debug          # Debug mode
```

**Exemplos Implementados:**
- `jwt-auth.guard.spec.ts` - Testes do guard JWT
- `sanitization.pipe.spec.ts` - Testes do pipe de sanitização

**Frontend (Vitest - opcional)**
- Localização: `sicoe-frontend/src/**/*.test.tsx`
- Framework: Vitest (recomendado para Vite)
- Coverage: Objetivo 70%

### 2. Testes de Integração

**Descrição:** Testam a integração entre componentes

**O que testa:**
- Docker services communication
- Backend-Database integration
- Frontend-Backend integration
- Authentication flow
- End-to-end data flow

**Executar:**
```bash
cd tests/scripts
./integration-tests.sh
```

**Pré-requisitos:**
- Docker containers running (local environment)
- Database seeded with initial data

### 3. Testes de API

**Descrição:** Testam todos os endpoints da API

**O que testa:**
- Health check
- Authentication endpoints
- Users CRUD
- Audit logs
- Email logs
- Establishments

**Executar:**
```bash
cd tests/scripts
./api-tests.sh http://localhost:3000
```

**Categorias:**
- 6 categorias de testes
- ~20 testes individuais
- Validação de status codes
- Validação de autenticação
- Validação de RBAC

### 4. Testes de Performance

**Descrição:** Medem performance e response times

**O que testa:**
- Response times individuais
- Concurrent requests (20 simultâneos)
- Load testing (100 requests)
- Resource usage
- Database query performance

**Executar:**
```bash
cd tests/scripts
./performance-tests.sh http://localhost:3000
```

**Thresholds:**
- Health check: < 1s
- Login: < 2s
- API endpoints: < 1.5s
- Concurrent load: < 5s
- Success rate: > 95%

### 5. Testes de Segurança

**Descrição:** Validam segurança do sistema

**Localização:** `security/scripts/penetration-test.sh`

**O que testa:**
- SQL Injection
- XSS attacks
- Authentication bypass
- Rate limiting
- CORS policies
- Security headers
- Input validation
- Information disclosure

**Executar:**
```bash
cd security/scripts
./penetration-test.sh http://localhost:3000
```

### 6. Suite Completa

**Descrição:** Executa todos os testes em sequência

**Executar:**
```bash
cd tests/scripts
./run-all-tests.sh
```

**Ordem de execução:**
1. Backend unit tests
2. Backend test coverage
3. Frontend unit tests (se disponível)
4. Integration tests
5. API tests
6. Performance tests
7. Security tests

**Saída:**
- Console output detalhado
- Relatório em `tests/reports/test-results-{timestamp}.txt`
- Success rate calculado
- Exit code 0 (sucesso) ou 1 (falha)

---

## 📊 Test Coverage

### Coverage Goals

**Backend:**
- Target: 80% coverage
- Critical paths: 100% coverage
- Current: Run `npm run test:cov` to check

**Frontend:**
- Target: 70% coverage
- Components: 80% coverage
- Current: TBD

### Viewing Coverage

**Backend:**
```bash
cd sicoe-backend
npm run test:cov
open coverage/lcov-report/index.html
```

**Frontend:**
```bash
cd sicoe-frontend
npm run test:coverage  # if configured
open coverage/index.html
```

---

## 🎯 Test Strategy

### Test Pyramid

```
       /\
      /E2\      E2E Tests (10%)
     /----\     - Critical user flows
    /Integr\    Integration Tests (30%)
   /--------\   - API integration
  /  Unit    \  Unit Tests (60%)
 /------------\ - Individual functions
```

### What to Test

**✅ Always Test:**
- Business logic
- Authentication & authorization
- Input validation
- Error handling
- Security features
- Critical user flows

**⚠️ Consider Testing:**
- Edge cases
- Error scenarios
- Performance critical paths
- Complex algorithms

**❌ Don't Test:**
- Framework code
- Third-party libraries
- Simple getters/setters
- Configuration files

---

## 🔧 Writing Tests

### Backend Unit Test Example

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    const users = await service.findAll({});
    expect(users).toBeDefined();
    expect(Array.isArray(users.data)).toBe(true);
  });
});
```

### Frontend Component Test Example

```typescript
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders button text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 🚀 CI/CD Integration

### GitHub Actions

Os testes são executados automaticamente no CI:

```yaml
# .github/workflows/ci.yml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Run tests
        run: |
          cd sicoe-backend
          npm run test
          npm run test:cov
```

### Pre-commit Hook

Configure hook para rodar testes antes de commit:

```bash
# .git/hooks/pre-commit
#!/bin/bash
cd sicoe-backend
npm run test
```

---

## 📈 Performance Benchmarks

### Expected Performance

**API Response Times:**
- Health check: < 100ms
- Login: < 500ms
- List users: < 300ms
- List audit: < 400ms
- Create user: < 500ms

**Load Capacity:**
- Concurrent users: 100+
- Requests/second: 50+
- Database connections: 10

**Resource Usage:**
- Backend memory: < 512MB
- Frontend memory: < 256MB
- Database memory: < 1GB

---

## 🐛 Debugging Tests

### Backend Tests

```bash
# Run single test file
npm run test users.service.spec.ts

# Run in watch mode
npm run test:watch

# Run with debug
npm run test:debug
```

### Troubleshooting

**Tests failing:**
1. Check if services are running
2. Check database connection
3. Check test data seeded
4. Review error messages
5. Run individual tests

**Slow tests:**
1. Identify slow tests: `npm run test -- --verbose`
2. Mock external dependencies
3. Use test databases
4. Optimize queries

**Flaky tests:**
1. Add proper waits/delays
2. Mock time-dependent code
3. Avoid shared state
4. Use test isolation

---

## 📝 Best Practices

### General

1. **Test Isolation**
   - Each test should be independent
   - Clean up after tests
   - Don't rely on test order

2. **Clear Naming**
   - Describe what is being tested
   - Use "should" in test names
   - Be specific

3. **Arrange-Act-Assert**
   ```typescript
   it('should return user by id', () => {
     // Arrange
     const userId = 1;

     // Act
     const user = service.findOne(userId);

     // Assert
     expect(user.id).toBe(userId);
   });
   ```

4. **Mock External Dependencies**
   - Database
   - External APIs
   - File system
   - Time/Date

5. **Test Edge Cases**
   - Empty inputs
   - Null/undefined
   - Large datasets
   - Invalid data

### Backend Specific

1. Use TestingModule for DI
2. Mock repository methods
3. Test error scenarios
4. Validate DTOs
5. Test guards and interceptors

### Frontend Specific

1. Test user interactions
2. Test async state changes
3. Test error states
4. Test accessibility
5. Mock API calls

---

## 🎯 Test Checklist

### Before Deploying

- [ ] All unit tests passing
- [ ] Integration tests passing
- [ ] API tests passing
- [ ] Performance tests passing
- [ ] Security tests passing
- [ ] Coverage > 80% (backend)
- [ ] Coverage > 70% (frontend)
- [ ] No console errors
- [ ] No memory leaks
- [ ] Documentation updated

### After Deploying

- [ ] Smoke tests in staging
- [ ] Integration tests in staging
- [ ] Performance tests in staging
- [ ] Monitor error rates
- [ ] Monitor response times

---

## 📞 Support

**Test Issues:**
- Check test logs in `tests/reports/`
- Review CI/CD pipeline logs
- Check Docker container logs

**Documentation:**
- Backend: `/sicoe-backend/README.md`
- Frontend: `/sicoe-frontend/README.md`
- Security: `/security/README.md`

---

## ✅ Test Status

**Current Status:** 🟢 READY

- ✅ Test scripts created
- ✅ Unit test examples provided
- ✅ Integration tests implemented
- ✅ API tests implemented
- ✅ Performance tests implemented
- ✅ Security tests implemented
- ✅ Documentation complete

**Last Updated:** 2026-02-16
