import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertMockUsuarios1750906738941 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Senha criptografada para '123456' - $2b$10$K8BQC.8Qmj6hBJ9J.5UE7uE0GbP.Q2VzN8A.XiGY.Q9VCG8F.9WIG
    const hashedPassword = '$2b$10$K8BQC.8Qmj6hBJ9J.5UE7uE0GbP.Q2VzN8A.XiGY.Q9VCG8F.9WIG';
    
    await queryRunner.query(`
      INSERT INTO usuarios (id, empresa_id, nome, email, senha, role, ativo, criado_em, atualizado_em)
      VALUES
        ('650e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'João Silva', 'joao.silva@techcorp.com', '${hashedPassword}', 'Admin', true, NOW(), NOW()),
        ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Maria Santos', 'maria.santos@techcorp.com', '${hashedPassword}', 'Funcionário', true, NOW(), NOW()),
        ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Carlos Oliveira', 'carlos.oliveira@inovacao.com', '${hashedPassword}', 'Admin', true, NOW(), NOW()),
        ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Ana Costa', 'ana.costa@inovacao.com', '${hashedPassword}', 'Funcionário', true, NOW(), NOW()),
        ('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Pedro Almeida', 'pedro.almeida@digital.com', '${hashedPassword}', 'Admin', true, NOW(), NOW()),
        ('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', 'Lucia Ferreira', 'lucia.ferreira@consultoria.com', '${hashedPassword}', 'Admin', true, NOW(), NOW())
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM usuarios
      WHERE id IN (
        '650e8400-e29b-41d4-a716-446655440000',
        '650e8400-e29b-41d4-a716-446655440001',
        '650e8400-e29b-41d4-a716-446655440002',
        '650e8400-e29b-41d4-a716-446655440003',
        '650e8400-e29b-41d4-a716-446655440004',
        '650e8400-e29b-41d4-a716-446655440005'
      )
    `);
  }
}
