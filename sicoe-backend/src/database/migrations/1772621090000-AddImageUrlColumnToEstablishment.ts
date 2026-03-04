import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddImageUrlColumnToEstablishment1772621090000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicionar coluna image_url se não existir
    const table = await queryRunner.getTable('ssv_establishment');
    const imageUrlColumn = table?.findColumnByName('image_url');

    if (!imageUrlColumn) {
      await queryRunner.addColumn(
        'ssv_establishment',
        new TableColumn({
          name: 'image_url',
          type: 'varchar',
          length: '512',
          isNullable: true,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover coluna image_url
    const table = await queryRunner.getTable('ssv_establishment');
    const imageUrlColumn = table?.findColumnByName('image_url');

    if (imageUrlColumn) {
      await queryRunner.dropColumn('ssv_establishment', 'image_url');
    }
  }
}
