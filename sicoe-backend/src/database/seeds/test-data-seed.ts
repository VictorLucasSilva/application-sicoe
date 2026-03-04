import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export async function runTestDataSeed(dataSource: DataSource): Promise<void> {
  console.log('🌱 Iniciando seed de dados de teste...');

  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    
    console.log('🗺️ Inserindo regiões...');
    const regions = [
      'Região Norte',
      'Região Nordeste',
      'Região Centro-Oeste',
      'Região Sudeste',
      'Região Sul',
    ];

    for (const region of regions) {
      await queryRunner.query(
        `INSERT INTO ssv_estab_region (nm_region) VALUES ($1) ON CONFLICT (nm_region) DO NOTHING`,
        [region],
      );
    }

    
    console.log('📍 Inserindo estados...');
    const states = [
      { nm: 'São Paulo', sg: 'SP' },
      { nm: 'Rio de Janeiro', sg: 'RJ' },
      { nm: 'Minas Gerais', sg: 'MG' },
      { nm: 'Bahia', sg: 'BA' },
      { nm: 'Rio Grande do Sul', sg: 'RS' },
      { nm: 'Paraná', sg: 'PR' },
      { nm: 'Pernambuco', sg: 'PE' },
      { nm: 'Ceará', sg: 'CE' },
      { nm: 'Distrito Federal', sg: 'DF' },
      { nm: 'Amazonas', sg: 'AM' },
    ];

    for (const state of states) {
      await queryRunner.query(
        `INSERT INTO ssv_estab_state (nm_state, sg_state) VALUES ($1, $2) ON CONFLICT (sg_state) DO NOTHING`,
        [state.nm, state.sg],
      );
    }

    
    console.log('🏢 Inserindo estabelecimentos...');
    const establishments = [
      { sq: 'EST001', nm: 'MATRIZ', region: 'Região Sudeste', state: 'SP' },
      { sq: 'EST002', nm: 'SAO PAULO', region: 'Região Sudeste', state: 'SP' },
      { sq: 'EST003', nm: 'GOIANIA', region: 'Região Centro-Oeste', state: 'GO' },
    ];

    for (const est of establishments) {
      const regionResult = await queryRunner.query(
        `SELECT id FROM ssv_estab_region WHERE nm_region = $1`,
        [est.region],
      );
      const stateResult = await queryRunner.query(
        `SELECT id FROM ssv_estab_state WHERE sg_state = $1`,
        [est.state],
      );

      if (regionResult[0] && stateResult[0]) {
        await queryRunner.query(
          `INSERT INTO ssv_establishment (sq_establishment, nm_establishment, fk_region, fk_state)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (sq_establishment) DO NOTHING`,
          [est.sq, est.nm, regionResult[0].id, stateResult[0].id],
        );
      }
    }

    
    console.log('👥 Inserindo usuários de teste...');
    const password = await bcrypt.hash('Test@123', 10);

    const users = [
      { num: 'USR001', username: 'joao.silva', firstName: 'João', lastName: 'Silva', email: 'joao.silva@sicoe.com', group: 'Administrador' },
      { num: 'USR002', username: 'maria.santos', firstName: 'Maria', lastName: 'Santos', email: 'maria.santos@sicoe.com', group: 'Gerente Regional' },
      { num: 'USR003', username: 'pedro.oliveira', firstName: 'Pedro', lastName: 'Oliveira', email: 'pedro.oliveira@sicoe.com', group: 'Auditor' },
      { num: 'USR004', username: 'ana.costa', firstName: 'Ana', lastName: 'Costa', email: 'ana.costa@sicoe.com', group: 'Usuário' },
      { num: 'USR005', username: 'carlos.souza', firstName: 'Carlos', lastName: 'Souza', email: 'carlos.souza@sicoe.com', group: 'Usuário' },
      { num: 'USR006', username: 'juliana.lima', firstName: 'Juliana', lastName: 'Lima', email: 'juliana.lima@sicoe.com', group: 'Gerente Regional' },
      { num: 'USR007', username: 'roberto.alves', firstName: 'Roberto', lastName: 'Alves', email: 'roberto.alves@sicoe.com', group: 'Auditor' },
      { num: 'USR008', username: 'fernanda.rocha', firstName: 'Fernanda', lastName: 'Rocha', email: 'fernanda.rocha@sicoe.com', group: 'Usuário' },
      { num: 'USR009', username: 'lucas.martins', firstName: 'Lucas', lastName: 'Martins', email: 'lucas.martins@sicoe.com', group: 'Usuário' },
      { num: 'USR010', username: 'patricia.fernandes', firstName: 'Patrícia', lastName: 'Fernandes', email: 'patricia.fernandes@sicoe.com', group: 'Sem Acesso' },
    ];

    for (const user of users) {
      
      await queryRunner.query(
        `INSERT INTO ssv_user
          (num_employee, username, password, first_name, last_name, email, flg_active, flg_status_email)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (username) DO NOTHING`,
        [
          user.num,
          user.username,
          password,
          user.firstName,
          user.lastName,
          user.email,
          true,
          Math.random() > 0.3, 
        ],
      );

      
      await queryRunner.query(
        `INSERT INTO ssv_aux_user_groups (fk_user, fk_group)
         SELECT u.id, g.id
         FROM ssv_user u, ssv_group g
         WHERE u.username = $1 AND g.nm_group = $2
         ON CONFLICT (fk_user, fk_group) DO NOTHING`,
        [user.username, user.group],
      );

      
      const numEstabs = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numEstabs; i++) {
        const estNum = Math.floor(Math.random() * 10) + 1;
        const estSq = `EST${String(estNum).padStart(3, '0')}`;

        await queryRunner.query(
          `INSERT INTO ssv_aux_establishment_user (fk_establishment, fk_user)
           SELECT e.id, u.id
           FROM ssv_user u, ssv_establishment e
           WHERE u.username = $1 AND e.sq_establishment = $2
           ON CONFLICT (fk_establishment, fk_user) DO NOTHING`,
          [user.username, estSq],
        );
      }
    }

    
    console.log('📋 Inserindo logs de auditoria...');
    const auditLogs = [
      { action: 'Login', object: 'Usuário', login: 'joao.silva', profile: 'Administrador', desc: 'Login realizado com sucesso' },
      { action: 'Criação', object: 'Usuário', login: 'joao.silva', profile: 'Administrador', desc: 'Criou novo usuário: maria.santos' },
      { action: 'Alteração', object: 'Usuário', login: 'maria.santos', profile: 'Gerente Regional', desc: 'Atualizou dados do usuário' },
      { action: 'Login', object: 'Usuário', login: 'pedro.oliveira', profile: 'Auditor', desc: 'Login realizado com sucesso' },
      { action: 'Criação', object: 'Estabelecimento', login: 'joao.silva', profile: 'Administrador', desc: 'Criou estabelecimento EST001' },
      { action: 'Alteração', object: 'Estabelecimento', login: 'maria.santos', profile: 'Gerente Regional', desc: 'Atualizou dados do estabelecimento' },
      { action: 'Liberação de Acesso', object: 'Usuário', login: 'joao.silva', profile: 'Administrador', desc: 'Liberou acesso ao estabelecimento EST002' },
      { action: 'Login', object: 'Usuário', login: 'ana.costa', profile: 'Usuário', desc: 'Login realizado com sucesso' },
      { action: 'Logout', object: 'Usuário', login: 'ana.costa', profile: 'Usuário', desc: 'Logout realizado' },
      { action: 'Login', object: 'Usuário', login: 'carlos.souza', profile: 'Usuário', desc: 'Login realizado com sucesso' },
      { action: 'Criação', object: 'Anexo', login: 'carlos.souza', profile: 'Usuário', desc: 'Adicionou anexo ao estabelecimento' },
      { action: 'Login', object: 'Usuário', login: 'juliana.lima', profile: 'Gerente Regional', desc: 'Login realizado com sucesso' },
      { action: 'Alteração', object: 'Usuário', login: 'juliana.lima', profile: 'Gerente Regional', desc: 'Alterou status de notificação de email' },
      { action: 'Login', object: 'Usuário', login: 'roberto.alves', profile: 'Auditor', desc: 'Login realizado com sucesso' },
      { action: 'Login', object: 'Usuário', login: 'fernanda.rocha', profile: 'Usuário', desc: 'Login realizado com sucesso' },
    ];

    for (const log of auditLogs) {
      const actionResult = await queryRunner.query(
        `SELECT id FROM ssv_aud_action WHERE nm_action = $1`,
        [log.action],
      );
      const objectResult = await queryRunner.query(
        `SELECT id FROM ssv_aud_object WHERE nm_object = $1`,
        [log.object],
      );
      const userResult = await queryRunner.query(
        `SELECT id FROM ssv_user WHERE username = $1`,
        [log.login],
      );

      if (actionResult[0] && objectResult[0] && userResult[0]) {
        await queryRunner.query(
          `INSERT INTO ssv_audit
            (fk_action, fk_object, fk_user, tx_login, tx_profile, tx_description, tx_ip_address, tx_user_agent)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            actionResult[0].id,
            objectResult[0].id,
            userResult[0].id,
            log.login,
            log.profile,
            log.desc,
            `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          ],
        );
      }
    }


    console.log('📄 Inserindo tipos de documentos...');
    const documents = [
      { nm: 'Alvará de Funcionamento', ds: 'Documento que autoriza o funcionamento do estabelecimento' },
      { nm: 'Certificado de Regularidade', ds: 'Certificado que comprova a regularidade fiscal' },
      { nm: 'Licença Ambiental', ds: 'Licença para operação com impacto ambiental' },
      { nm: 'CREA/CAU', ds: 'Registro no conselho profissional' },
      { nm: 'Laudo AVCB', ds: 'Auto de Vistoria do Corpo de Bombeiros' },
    ];

    for (const doc of documents) {
      await queryRunner.query(
        `INSERT INTO ssv_estab_document (nm_document, ds_document)
         VALUES ($1, $2)
         ON CONFLICT (nm_document) DO NOTHING`,
        [doc.nm, doc.ds],
      );
    }


    console.log('📊 Inserindo status de anexos...');
    const statuses = ['Pendente', 'Em Análise', 'Aprovado', 'Rejeitado', 'Expirado'];
    for (const status of statuses) {
      await queryRunner.query(
        `INSERT INTO ssv_estab_status_attachment (nm_status)
         VALUES ($1)
         ON CONFLICT (nm_status) DO NOTHING`,
        [status],
      );
    }


    console.log('📎 Vinculando documentos aos estabelecimentos e criando anexos...');
    const estabDocMapping = [
      { estab: 'EST001', docs: ['Alvará de Funcionamento', 'Certificado de Regularidade'] },
      { estab: 'EST002', docs: ['Licença Ambiental', 'CREA/CAU'] },
      { estab: 'EST003', docs: ['Laudo AVCB', 'Alvará de Funcionamento'] },
    ];

    for (const mapping of estabDocMapping) {
      const estabResult = await queryRunner.query(
        `SELECT id FROM ssv_establishment WHERE sq_establishment = $1`,
        [mapping.estab],
      );

      if (!estabResult[0]) continue;

      for (let i = 0; i < mapping.docs.length; i++) {
        const docResult = await queryRunner.query(
          `SELECT id FROM ssv_estab_document WHERE nm_document = $1`,
          [mapping.docs[i]],
        );

        if (!docResult[0]) continue;


        await queryRunner.query(
          `INSERT INTO ssv_aux_establishment_document (fk_establishment, fk_document)
           VALUES ($1, $2)
           ON CONFLICT (fk_establishment, fk_document) DO NOTHING`,
          [estabResult[0].id, docResult[0].id],
        );


        const statusId = i === 0 ? 4 : 5;
        const statusName = i === 0 ? 'Rejeitado' : 'Expirado';

        // Função para remover acentos
        const removeAccents = (str: string) => {
          return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        };

        const docNameNormalized = removeAccents(mapping.docs[i])
          .toLowerCase()
          .replace(/\//g, '')
          .replace(/\s+/g, '_');

        const fileName = `${mapping.estab.toLowerCase()}_${docNameNormalized}_${statusName.toLowerCase()}.pdf`;
        const filePath = `/media/${fileName}`;

        await queryRunner.query(
          `INSERT INTO ssv_estab_attachment
            (fk_status, fk_document, nm_file, ds_file_path, dt_validity, dt_emission)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            statusId,
            docResult[0].id,
            fileName,
            filePath,
            i === 0 ? new Date(2024, 5, 1) : new Date(2024, 0, 1),
            i === 0 ? new Date(2024, 0, 15) : new Date(2023, 0, 15),
          ],
        );
      }
    }


    console.log('📧 Inserindo logs de email...');
    const emailLogs = [
      { type: 'Boas-vindas', object: 'Usuário', dest: 'joao.silva@sicoe.com', subj: 'Bem-vindo ao SICOE', sent: true },
      { type: 'Notificação', object: 'Estabelecimento', dest: 'maria.santos@sicoe.com', subj: 'Novo estabelecimento cadastrado', sent: true },
      { type: 'Alerta', object: 'Anexo', dest: 'pedro.oliveira@sicoe.com', subj: 'Documento pendente de aprovação', sent: true },
      { type: 'Notificação', object: 'Usuário', dest: 'ana.costa@sicoe.com', subj: 'Seu acesso foi atualizado', sent: true },
      { type: 'Boas-vindas', object: 'Usuário', dest: 'carlos.souza@sicoe.com', subj: 'Bem-vindo ao SICOE', sent: false },
      { type: 'Alerta', object: 'Estabelecimento', dest: 'juliana.lima@sicoe.com', subj: 'Estabelecimento requer atenção', sent: true },
      { type: 'Notificação', object: 'Usuário', dest: 'roberto.alves@sicoe.com', subj: 'Relatório mensal disponível', sent: true },
      { type: 'Boas-vindas', object: 'Usuário', dest: 'fernanda.rocha@sicoe.com', subj: 'Bem-vindo ao SICOE', sent: true },
      { type: 'Alerta', object: 'Anexo', dest: 'lucas.martins@sicoe.com', subj: 'Documento expirado', sent: true },
      { type: 'Notificação', object: 'Usuário', dest: 'patricia.fernandes@sicoe.com', subj: 'Seu cadastro foi criado', sent: false },
      { type: 'Notificação', object: 'Estabelecimento', dest: 'joao.silva@sicoe.com', subj: 'Novos estabelecimentos cadastrados', sent: true },
      { type: 'Alerta', object: 'Anexo', dest: 'maria.santos@sicoe.com', subj: 'Documentos pendentes', sent: true },
    ];

    for (const email of emailLogs) {
      await queryRunner.query(
        `INSERT INTO ssv_email
          (tp_email, tx_object, tx_destination, tx_subject, tx_body, flg_sent, ts_sent)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          email.type,
          email.object,
          email.dest,
          email.subj,
          `Corpo do email: ${email.subj}`,
          email.sent,
          email.sent ? new Date(2024, 1, Math.floor(Math.random() * 28) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60)) : null,
        ],
      );
    }

    await queryRunner.commitTransaction();
    console.log('✅ Dados de teste inseridos com sucesso!');
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('❌ Erro ao inserir dados de teste:', error);
    throw error;
  } finally {
    await queryRunner.release();
  }
}
