import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertInitialPlans1748990697402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO planos (id, nome, valor_mensal, limite_notas_mensal, valor_excedente, acesso_premium, limite_usuarios)
      VALUES
        ('9b1db36f-2d4f-4bb5-9e2a-5d6fc24bfa61', 'Freemium', 0.00, 10, 0.00, false, 3),
        ('9e8fd341-d4fd-4e09-bf12-f88b34e0983b', 'Básico', 29.90, 100, 0.00, false, 10),
        ('7428e22e-89b5-4b1e-8cbf-4d2da8ad7d4f', 'Premium', 59.90, 500, 0.00, true, 50)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM planos
      WHERE id IN (
        '9b1db36f-2d4f-4bb5-9e2a-5d6fc24bfa61',
        '9e8fd341-d4fd-4e09-bf12-f88b34e0983b',
        '7428e22e-89b5-4b1e-8cbf-4d2da8ad7d4f'
      )
    `);
  }
}
