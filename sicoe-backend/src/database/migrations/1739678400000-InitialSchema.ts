import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1739678400000 implements MigrationInterface {
  name = 'InitialSchema1739678400000';

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`
      CREATE TABLE "ssv_group" (
        "id" SERIAL PRIMARY KEY,
        "nm_group" VARCHAR(20) UNIQUE NOT NULL,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_content_type" (
        "id" SERIAL PRIMARY KEY,
        "nm_table" VARCHAR(25) UNIQUE NOT NULL,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_permission" (
        "id" SERIAL PRIMARY KEY,
        "tp_permission" VARCHAR(20) UNIQUE NOT NULL,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_estab_region" (
        "id" SERIAL PRIMARY KEY,
        "nm_region" VARCHAR(50) UNIQUE NOT NULL,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_estab_state" (
        "id" SERIAL PRIMARY KEY,
        "nm_state" VARCHAR(50) UNIQUE NOT NULL,
        "sg_state" VARCHAR(2) UNIQUE NOT NULL,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_estab_city" (
        "id" SERIAL PRIMARY KEY,
        "nm_city" VARCHAR(100) NOT NULL,
        "fk_state" INTEGER NOT NULL,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "FK_city_state" FOREIGN KEY ("fk_state") REFERENCES "ssv_estab_state"("id") ON DELETE CASCADE
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_estab_status_attachment" (
        "id" SERIAL PRIMARY KEY,
        "nm_status" VARCHAR(30) UNIQUE NOT NULL,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_estab_unit" (
        "id" SERIAL PRIMARY KEY,
        "nm_unit" VARCHAR(50) UNIQUE NOT NULL,
        "ds_unit" TEXT,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_estab_document" (
        "id" SERIAL PRIMARY KEY,
        "nm_document" VARCHAR(100) UNIQUE NOT NULL,
        "ds_document" TEXT,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_establishment" (
        "id" SERIAL PRIMARY KEY,
        "sq_establishment" VARCHAR(20) UNIQUE NOT NULL,
        "nm_establishment" VARCHAR(50) NOT NULL,
        "fk_region" INTEGER,
        "fk_state" INTEGER,
        "tx_attached_by" VARCHAR(128),
        "tx_checked_by" VARCHAR(128),
        "ts_inserted" TIMESTAMP,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "FK_establishment_region" FOREIGN KEY ("fk_region") REFERENCES "ssv_estab_region"("id") ON DELETE SET NULL,
        CONSTRAINT "FK_establishment_state" FOREIGN KEY ("fk_state") REFERENCES "ssv_estab_state"("id") ON DELETE SET NULL
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_estab_attachment" (
        "id" SERIAL PRIMARY KEY,
        "fk_status" INTEGER NOT NULL,
        "fk_document" INTEGER NOT NULL,
        "fk_establishment" INTEGER,
        "fk_city" INTEGER,
        "fk_region" INTEGER,
        "nm_file" VARCHAR(255) NOT NULL,
        "ds_file_path" TEXT NOT NULL,
        "tx_comments" TEXT,
        "dt_emission" DATE,
        "dt_validity" DATE,
        "ts_attached" TIMESTAMP,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "FK_attachment_status" FOREIGN KEY ("fk_status") REFERENCES "ssv_estab_status_attachment"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_attachment_document" FOREIGN KEY ("fk_document") REFERENCES "ssv_estab_document"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_attachment_establishment" FOREIGN KEY ("fk_establishment") REFERENCES "ssv_establishment"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_attachment_city" FOREIGN KEY ("fk_city") REFERENCES "ssv_estab_city"("id") ON DELETE SET NULL,
        CONSTRAINT "FK_attachment_region" FOREIGN KEY ("fk_region") REFERENCES "ssv_estab_region"("id") ON DELETE SET NULL
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_user" (
        "id" SERIAL PRIMARY KEY,
        "num_employee" VARCHAR(100) NOT NULL,
        "username" VARCHAR(256) UNIQUE NOT NULL,
        "password" VARCHAR(256) NOT NULL,
        "first_name" VARCHAR(256) NOT NULL,
        "last_name" VARCHAR(256) NOT NULL,
        "email" VARCHAR(256) UNIQUE NOT NULL,
        "flg_active" BOOLEAN NOT NULL DEFAULT true,
        "flg_status_email" BOOLEAN NOT NULL DEFAULT false,
        "dt_expiration" DATE,
        "ts_last_login" TIMESTAMP,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_aud_action" (
        "id" SERIAL PRIMARY KEY,
        "nm_action" VARCHAR(50) UNIQUE NOT NULL,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_aud_object" (
        "id" SERIAL PRIMARY KEY,
        "nm_object" VARCHAR(50) UNIQUE NOT NULL,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_audit" (
        "id" SERIAL PRIMARY KEY,
        "fk_action" INTEGER NOT NULL,
        "fk_object" INTEGER NOT NULL,
        "fk_user" INTEGER,
        "tx_login" VARCHAR(256),
        "tx_profile" VARCHAR(20),
        "tx_description" TEXT,
        "tx_ip_address" VARCHAR(45),
        "tx_user_agent" TEXT,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "FK_audit_action" FOREIGN KEY ("fk_action") REFERENCES "ssv_aud_action"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_audit_object" FOREIGN KEY ("fk_object") REFERENCES "ssv_aud_object"("id") ON DELETE CASCADE
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_email" (
        "id" SERIAL PRIMARY KEY,
        "tp_email" VARCHAR(50) NOT NULL,
        "tx_object" VARCHAR(100),
        "tx_destination" VARCHAR(256) NOT NULL,
        "tx_subject" VARCHAR(255) NOT NULL,
        "tx_body" TEXT NOT NULL,
        "flg_sent" BOOLEAN NOT NULL DEFAULT false,
        "tx_error" TEXT,
        "ts_sent" TIMESTAMP,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_notification" (
        "id" SERIAL PRIMARY KEY,
        "fk_user" INTEGER NOT NULL,
        "tp_notification" VARCHAR(50) NOT NULL,
        "tx_title" VARCHAR(255) NOT NULL,
        "tx_message" TEXT NOT NULL,
        "flg_read" BOOLEAN NOT NULL DEFAULT false,
        "ts_read" TIMESTAMP,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_ps_employee" (
        "id" SERIAL PRIMARY KEY,
        "num_employee" VARCHAR(100) UNIQUE NOT NULL,
        "nm_employee" VARCHAR(256) NOT NULL,
        "tx_email" VARCHAR(256),
        "flg_active" BOOLEAN NOT NULL DEFAULT true,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_rst_establishment_employee" (
        "id" SERIAL PRIMARY KEY,
        "fk_establishment" INTEGER NOT NULL,
        "fk_employee" INTEGER NOT NULL,
        "dt_start" DATE,
        "dt_end" DATE,
        "flg_active" BOOLEAN NOT NULL DEFAULT true,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "FK_rst_establishment" FOREIGN KEY ("fk_establishment") REFERENCES "ssv_establishment"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_rst_employee" FOREIGN KEY ("fk_employee") REFERENCES "ssv_ps_employee"("id") ON DELETE CASCADE
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_aux_user_groups" (
        "fk_user" INTEGER NOT NULL,
        "fk_group" INTEGER NOT NULL,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now(),
        PRIMARY KEY ("fk_user", "fk_group"),
        CONSTRAINT "FK_aux_user" FOREIGN KEY ("fk_user") REFERENCES "ssv_user"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_aux_group" FOREIGN KEY ("fk_group") REFERENCES "ssv_group"("id") ON DELETE CASCADE
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_aux_group_permissions" (
        "fk_group" INTEGER NOT NULL,
        "fk_content_type" INTEGER NOT NULL,
        "fk_permission" INTEGER NOT NULL,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now(),
        PRIMARY KEY ("fk_group", "fk_content_type", "fk_permission"),
        CONSTRAINT "FK_aux_gp_group" FOREIGN KEY ("fk_group") REFERENCES "ssv_group"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_aux_gp_content_type" FOREIGN KEY ("fk_content_type") REFERENCES "ssv_content_type"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_aux_gp_permission" FOREIGN KEY ("fk_permission") REFERENCES "ssv_permission"("id") ON DELETE CASCADE
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_aux_establishment_user" (
        "fk_establishment" INTEGER NOT NULL,
        "fk_user" INTEGER NOT NULL,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now(),
        PRIMARY KEY ("fk_establishment", "fk_user"),
        CONSTRAINT "FK_aux_establishment" FOREIGN KEY ("fk_establishment") REFERENCES "ssv_establishment"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_aux_user_estab" FOREIGN KEY ("fk_user") REFERENCES "ssv_user"("id") ON DELETE CASCADE
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_aux_establishment_unit" (
        "fk_establishment" INTEGER NOT NULL,
        "fk_unit" INTEGER NOT NULL,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now(),
        PRIMARY KEY ("fk_establishment", "fk_unit"),
        CONSTRAINT "FK_aux_estab_unit_establishment" FOREIGN KEY ("fk_establishment") REFERENCES "ssv_establishment"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_aux_estab_unit_unit" FOREIGN KEY ("fk_unit") REFERENCES "ssv_estab_unit"("id") ON DELETE CASCADE
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_aux_establishment_document" (
        "fk_establishment" INTEGER NOT NULL,
        "fk_document" INTEGER NOT NULL,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now(),
        PRIMARY KEY ("fk_establishment", "fk_document"),
        CONSTRAINT "FK_aux_estab_doc_establishment" FOREIGN KEY ("fk_establishment") REFERENCES "ssv_establishment"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_aux_estab_doc_document" FOREIGN KEY ("fk_document") REFERENCES "ssv_estab_document"("id") ON DELETE CASCADE
      )
    `);


    await queryRunner.query(`
      CREATE TABLE "ssv_aux_region_uf" (
        "fk_state" INTEGER NOT NULL,
        "fk_region" INTEGER NOT NULL,
        "ts_creation" TIMESTAMP NOT NULL DEFAULT now(),
        "ts_updated" TIMESTAMP NOT NULL DEFAULT now(),
        PRIMARY KEY ("fk_state", "fk_region"),
        CONSTRAINT "FK_aux_region_uf_state" FOREIGN KEY ("fk_state") REFERENCES "ssv_estab_state"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_aux_region_uf_region" FOREIGN KEY ("fk_region") REFERENCES "ssv_estab_region"("id") ON DELETE CASCADE
      )
    `);


    await queryRunner.query(`CREATE INDEX "IDX_user_username" ON "ssv_user"("username")`);
    await queryRunner.query(`CREATE INDEX "IDX_user_email" ON "ssv_user"("email")`);
    await queryRunner.query(`CREATE INDEX "IDX_audit_user" ON "ssv_audit"("fk_user")`);
    await queryRunner.query(`CREATE INDEX "IDX_audit_creation" ON "ssv_audit"("ts_creation")`);
    await queryRunner.query(`CREATE INDEX "IDX_establishment_sq" ON "ssv_establishment"("sq_establishment")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_establishment_sq"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_audit_creation"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_audit_user"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_user_email"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_user_username"`);


    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_aux_region_uf"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_aux_establishment_document"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_aux_establishment_unit"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_aux_establishment_user"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_aux_group_permissions"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_aux_user_groups"`);


    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_rst_establishment_employee"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_ps_employee"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_notification"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_email"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_audit"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_aud_object"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_aud_action"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_user"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_estab_attachment"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_establishment"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_estab_document"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_estab_unit"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_estab_status_attachment"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_estab_city"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_estab_state"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_estab_region"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_permission"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_content_type"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ssv_group"`);
  }
}
