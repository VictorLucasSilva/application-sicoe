import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export async function runInitialSeed(dataSource: DataSource): Promise<void> {
  console.log('🌱 Iniciando seeds...');

  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {

    console.log('📦 Inserindo grupos...');
    const groups = [
      'Administrador',
      'Auditor',
      'Gerente Regional',
      'Usuário',
      'Sem Acesso',
    ];

    for (const groupName of groups) {
      await queryRunner.query(
        `INSERT INTO ssv_group (nm_group) VALUES ($1) ON CONFLICT (nm_group) DO NOTHING`,
        [groupName],
      );
    }


    console.log('🔐 Inserindo permissões...');
    const permissions = ['read', 'create', 'update', 'delete'];

    for (const permission of permissions) {
      await queryRunner.query(
        `INSERT INTO ssv_permission (tp_permission) VALUES ($1) ON CONFLICT (tp_permission) DO NOTHING`,
        [permission],
      );
    }


    console.log('📄 Inserindo content types...');
    const contentTypes = [
      'ssv_user',
      'ssv_establishment',
      'ssv_estab_attachment',
      'ssv_audit',
      'ssv_email',
    ];

    for (const contentType of contentTypes) {
      await queryRunner.query(
        `INSERT INTO ssv_content_type (nm_table) VALUES ($1) ON CONFLICT (nm_table) DO NOTHING`,
        [contentType],
      );
    }


    console.log('📋 Inserindo ações de auditoria...');
    const audActions = [
      'Criação',
      'Alteração',
      'Deleção',
      'Relação',
      'Liberação de Acesso',
      'Login',
      'Logout',
    ];

    for (const action of audActions) {
      await queryRunner.query(
        `INSERT INTO ssv_aud_action (nm_action) VALUES ($1) ON CONFLICT (nm_action) DO NOTHING`,
        [action],
      );
    }


    console.log('📦 Inserindo objetos de auditoria...');
    const audObjects = ['Usuário', 'Anexo', 'Estabelecimento', 'Relatório'];

    for (const object of audObjects) {
      await queryRunner.query(
        `INSERT INTO ssv_aud_object (nm_object) VALUES ($1) ON CONFLICT (nm_object) DO NOTHING`,
        [object],
      );
    }


    console.log('📎 Inserindo status de anexo...');
    const attachmentStatuses = [
      'Pendente',
      'Em Análise',
      'Aprovado',
      'Rejeitado',
      'Expirado',
    ];

    for (const status of attachmentStatuses) {
      await queryRunner.query(
        `INSERT INTO ssv_estab_status_attachment (nm_status) VALUES ($1) ON CONFLICT (nm_status) DO NOTHING`,
        [status],
      );
    }


    console.log('👤 Inserindo usuário admin...');
    const adminPassword = await bcrypt.hash('Admin@123', 10);

    await queryRunner.query(
      `INSERT INTO ssv_user
        (num_employee, username, password, first_name, last_name, email, flg_active, flg_status_email)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (username) DO NOTHING`,
      [
        'ADMIN001',
        'admin',
        adminPassword,
        'Administrator',
        'System',
        'admin@sicoe.com',
        true,
        true,
      ],
    );


    console.log('🔗 Associando admin ao grupo Administrador...');
    await queryRunner.query(
      `INSERT INTO ssv_aux_user_groups (fk_user, fk_group)
       SELECT u.id, g.id
       FROM ssv_user u, ssv_group g
       WHERE u.username = 'admin' AND g.nm_group = 'Administrador'
       ON CONFLICT (fk_user, fk_group) DO NOTHING`,
    );


    console.log('⚙️ Configurando permissões do Administrador...');
    const adminGroupResult = await queryRunner.query(
      `SELECT id FROM ssv_group WHERE nm_group = 'Administrador'`,
    );
    const adminGroupId = adminGroupResult[0]?.id;

    if (adminGroupId) {
      const contentTypesResult = await queryRunner.query(
        `SELECT id FROM ssv_content_type`,
      );
      const permissionsResult = await queryRunner.query(
        `SELECT id FROM ssv_permission`,
      );

      for (const ct of contentTypesResult) {
        for (const perm of permissionsResult) {
          await queryRunner.query(
            `INSERT INTO ssv_aux_group_permissions (fk_group, fk_content_type, fk_permission)
             VALUES ($1, $2, $3)
             ON CONFLICT (fk_group, fk_content_type, fk_permission) DO NOTHING`,
            [adminGroupId, ct.id, perm.id],
          );
        }
      }
    }


    console.log('⚙️ Configurando permissões do Auditor...');
    const auditorGroupResult = await queryRunner.query(
      `SELECT id FROM ssv_group WHERE nm_group = 'Auditor'`,
    );
    const auditorGroupId = auditorGroupResult[0]?.id;

    if (auditorGroupId) {
      const readPermResult = await queryRunner.query(
        `SELECT id FROM ssv_permission WHERE tp_permission = 'read'`,
      );
      const readPermId = readPermResult[0]?.id;

      if (readPermId) {
        const contentTypesResult = await queryRunner.query(
          `SELECT id FROM ssv_content_type`,
        );

        for (const ct of contentTypesResult) {
          await queryRunner.query(
            `INSERT INTO ssv_aux_group_permissions (fk_group, fk_content_type, fk_permission)
             VALUES ($1, $2, $3)
             ON CONFLICT (fk_group, fk_content_type, fk_permission) DO NOTHING`,
            [auditorGroupId, ct.id, readPermId],
          );
        }
      }
    }

    await queryRunner.commitTransaction();
    console.log('✅ Seeds executados com sucesso!');
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('❌ Erro ao executar seeds:', error);
    throw error;
  } finally {
    await queryRunner.release();
  }
}
