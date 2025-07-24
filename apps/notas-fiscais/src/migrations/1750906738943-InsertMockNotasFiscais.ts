import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertMockNotasFiscais1750906738943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Inserir notas fiscais
    await queryRunner.query(`
      INSERT INTO notas_fiscais (id, empresa_id, documento, nome_razao_social, tipo_pessoa, status, data_emissao, data_vencimento, valor_total, descricao, numero_nota_fiscal, observacoes)
      VALUES
        ('750e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', '12345678901', 'José Santos da Silva', 'FISICA', 'EMITIDA', CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE + INTERVAL '15 days', 1500.00, 'Prestação de serviços de consultoria', 'NF-0000-000001', 'Nota fiscal para demonstração'),
        ('750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '98765432100', 'Maria Oliveira Costa', 'FISICA', 'PENDENTE', CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '25 days', 2500.00, 'Desenvolvimento de sistema', 'NF-0000-000002', 'Sistema web personalizado'),
        ('750e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', '12345678000195', 'ABC Comércio Ltda', 'JURIDICA', 'EMITIDA', CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '20 days', 3200.00, 'Consultoria empresarial', 'NF-0001-000001', 'Serviços prestados'),
        ('750e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '98765432000123', 'XYZ Serviços S.A.', 'JURIDICA', 'CANCELADA', CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE - INTERVAL '10 days', 1800.00, 'Manutenção de software', 'NF-0001-000002', 'Cancelada por solicitação do cliente'),
        ('750e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', '11223344000156', 'Tech Solutions EIRELI', 'JURIDICA', 'PAGA', CURRENT_DATE - INTERVAL '25 days', CURRENT_DATE - INTERVAL '15 days', 4500.00, 'Integração de sistemas', 'NF-0002-000001', 'Pagamento realizado via PIX'),
        ('750e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', '55544433322', 'Roberto Souza Lima', 'FISICA', 'PENDENTE', CURRENT_DATE - INTERVAL '3 days', CURRENT_DATE + INTERVAL '27 days', 850.00, 'Treinamento em tecnologia', 'NF-0003-000001', 'Curso de capacitação')
    `);

    // Inserir itens das notas fiscais
    await queryRunner.query(`
      INSERT INTO nota_fiscal_itens (id, nota_fiscal_id, descricao, quantidade, valor_unitario, valor_total, impostos)
      VALUES
        ('850e8400-e29b-41d4-a716-446655440000', '750e8400-e29b-41d4-a716-446655440000', 'Consultoria em TI', 10, 150.00, 1500.00, '{"ICMS": 270.00, "IPI": 75.00}'),
        ('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', 'Desenvolvimento de Sistema', 1, 2500.00, 2500.00, '{"ICMS": 450.00, "IPI": 125.00}'),
        ('850e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440002', 'Consultoria Empresarial', 8, 400.00, 3200.00, '{"ICMS": 576.00, "IPI": 160.00}'),
        ('850e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440003', 'Manutenção de Software', 3, 600.00, 1800.00, '{"ICMS": 324.00, "IPI": 90.00}'),
        ('850e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440004', 'Integração de Sistemas', 1, 4500.00, 4500.00, '{"ICMS": 810.00, "IPI": 225.00}'),
        ('850e8400-e29b-41d4-a716-446655440005', '750e8400-e29b-41d4-a716-446655440005', 'Treinamento em Tecnologia', 1, 850.00, 850.00, '{"ICMS": 153.00, "IPI": 42.50}')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover itens primeiro (foreign key)
    await queryRunner.query(`
      DELETE FROM nota_fiscal_itens
      WHERE id IN (
        '850e8400-e29b-41d4-a716-446655440000',
        '850e8400-e29b-41d4-a716-446655440001',
        '850e8400-e29b-41d4-a716-446655440002',
        '850e8400-e29b-41d4-a716-446655440003',
        '850e8400-e29b-41d4-a716-446655440004',
        '850e8400-e29b-41d4-a716-446655440005'
      )
    `);

    // Remover notas fiscais
    await queryRunner.query(`
      DELETE FROM notas_fiscais
      WHERE id IN (
        '750e8400-e29b-41d4-a716-446655440000',
        '750e8400-e29b-41d4-a716-446655440001',
        '750e8400-e29b-41d4-a716-446655440002',
        '750e8400-e29b-41d4-a716-446655440003',
        '750e8400-e29b-41d4-a716-446655440004',
        '750e8400-e29b-41d4-a716-446655440005'
      )
    `);
  }
}
