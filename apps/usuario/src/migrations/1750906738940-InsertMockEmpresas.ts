import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class InsertMockEmpresas1750906738940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO empresas (id, nome_razao_social, cnpj, criado_em, atualizado_em)
      VALUES
        ('550e8400-e29b-41d4-a716-446655440000', 'TechCorp Soluções Ltda', '12345678901234', NOW(), NOW()),
        ('550e8400-e29b-41d4-a716-446655440001', 'Inovação & Serviços S.A.', '23456789012345', NOW(), NOW()),
        ('550e8400-e29b-41d4-a716-446655440002', 'Digital Solutions EIRELI', '34567890123456', NOW(), NOW()),
        ('550e8400-e29b-41d4-a716-446655440003', 'Consultoria Express Ltda', '45678901234567', NOW(), NOW())
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM empresas
      WHERE id IN (
        '550e8400-e29b-41d4-a716-446655440000',
        '550e8400-e29b-41d4-a716-446655440001',
        '550e8400-e29b-41d4-a716-446655440002',
        '550e8400-e29b-41d4-a716-446655440003'
      )
    `);
  }
}
