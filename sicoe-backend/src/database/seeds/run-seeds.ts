import { AppDataSource } from '../../data-source';
import { runInitialSeed } from './initial-seed';
import { runTestDataSeed } from './test-data-seed';

async function runSeeds() {
  console.log('🚀 Conectando ao banco de dados...');

  try {
    await AppDataSource.initialize();
    console.log('✅ Conexão estabelecida!');

    await runInitialSeed(AppDataSource);
    await runTestDataSeed(AppDataSource);

    console.log('🎉 Todos os seeds foram executados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar seeds:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
    console.log('👋 Conexão fechada.');
  }
}

runSeeds();
