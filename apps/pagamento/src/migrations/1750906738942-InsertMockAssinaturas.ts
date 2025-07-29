import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertMockAssinaturas1750906738942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO assinaturas (id, empresa_id, plano_id, inicio, fim, ativo, criado_em, atualizado_em)
      VALUES
        ('350e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', '7428e22e-89b5-4b1e-8cbf-4d2da8ad7d4f', CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE + INTERVAL '15 days', true, NOW(), NOW()),
        ('350e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '9e8fd341-d4fd-4e09-bf12-f88b34e0983b', CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '25 days', true, NOW(), NOW()),
        ('350e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '9e8fd341-d4fd-4e09-bf12-f88b34e0983b', CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE + INTERVAL '10 days', true, NOW(), NOW()),
        ('350e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', '9b1db36f-2d4f-4bb5-9e2a-5d6fc24bfa61', CURRENT_DATE - INTERVAL '7 days', CURRENT_DATE + INTERVAL '23 days', true, NOW(), NOW()),
        ('350e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', '9b1db36f-2d4f-4bb5-9e2a-5d6fc24bfa61', CURRENT_DATE - INTERVAL '60 days', CURRENT_DATE - INTERVAL '30 days', false, NOW(), NOW())
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM assinaturas
      WHERE id IN (
        '350e8400-e29b-41d4-a716-446655440000',
        '350e8400-e29b-41d4-a716-446655440001',
        '350e8400-e29b-41d4-a716-446655440002',
        '350e8400-e29b-41d4-a716-446655440003',
        '350e8400-e29b-41d4-a716-446655440004'
      )
    `);
  }
}
