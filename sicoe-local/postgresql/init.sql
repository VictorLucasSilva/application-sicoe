-- SICOE Database Initialization Script
-- Executado automaticamente na primeira inicialização do PostgreSQL

-- Criar extensões úteis
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Configurar timezone
SET timezone = 'America/Sao_Paulo';

-- Criar schema para auditoria
CREATE SCHEMA IF NOT EXISTS audit;

-- Comentários informativos
COMMENT ON DATABASE sicoe_db IS 'SICOE - Sistema de Controle de Estabelecimentos';
COMMENT ON SCHEMA audit IS 'Schema para tabelas de auditoria e logs';

-- Log de inicialização
DO $$
BEGIN
    RAISE NOTICE 'SICOE Database initialized successfully at %', now();
END $$;
