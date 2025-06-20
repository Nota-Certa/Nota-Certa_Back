import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertInitialPlans implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO planos (id, nome, valor_mensal, limite_notas_mensal, valor_excedente, acesso_premium, limite_usuarios)
      VALUES
        ('00000000-0000-0000-0000-000000000001', 'Freemium', 0.00, 10, 0.00, false, 3),
        ('00000000-0000-0000-0000-000000000002', 'Básico', 29.90, 100, 0.00, false, 10),
        ('00000000-0000-0000-0000-000000000003', 'Premium', 59.90, 500, 0.00, true, 50)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM planos
      WHERE id IN (
        '00000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000003'
      )
    `);
  }
}
