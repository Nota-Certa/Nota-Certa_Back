import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterNotaFiscalIdToNullable1750906738945 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE notificacoes 
      ALTER COLUMN nota_fiscal_id DROP NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE notificacoes 
      ALTER COLUMN nota_fiscal_id SET NOT NULL
    `);
  }
}
