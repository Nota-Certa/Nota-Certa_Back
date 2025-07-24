import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertMockNotificacoes1750906738944 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO notificacoes (id, tipo, destinatario, conteudo, status_envio, evento, nota_fiscal_id, cliente_id, empresa_id, tentativa)
      VALUES
        ('950e8400-e29b-41d4-a716-446655440000', 'EMAIL', 'joao.silva@techcorp.com', 'Sua nota fiscal foi emitida com sucesso. Você pode visualizá-la em nossa plataforma.', 'enviada', 'NOTA_FISCAL_EMITIDA', '750e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 1),
        ('950e8400-e29b-41d4-a716-446655440001', 'SMS', '+5511999999999', 'Lembrete: Sua nota fiscal vence em 3 dias. Não se esqueça de efetuar o pagamento.', 'enviada', 'LEMBRETE_VENCIMENTO', '750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 1),
        ('950e8400-e29b-41d4-a716-446655440002', 'EMAIL', 'carlos.oliveira@inovacao.com', 'Seu relatório mensal está disponível. Acesse nossa plataforma para visualizá-lo.', 'pendente', 'RELATÓRIO_MENSAL', NULL, '650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 1),
        ('950e8400-e29b-41d4-a716-446655440003', 'EMAIL', 'maria.santos@techcorp.com', 'Pagamento recebido com sucesso! Obrigado pela sua preferência.', 'enviada', 'PAGAMENTO_RECEBIDO', '750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 1),
        ('950e8400-e29b-41d4-a716-446655440004', 'EMAIL', 'ana.costa@inovacao.com', 'Informamos que a nota fiscal foi cancelada. Para mais informações, entre em contato conosco.', 'enviada', 'NOTA_FISCAL_CANCELADA', '750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 1),
        ('950e8400-e29b-41d4-a716-446655440005', 'PUSH', 'pedro.almeida@digital.com', 'Atenção: O pagamento da sua nota fiscal está em atraso. Por favor, regularize sua situação.', 'pendente', 'PAGAMENTO_VENCIDO', '750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 2),
        ('950e8400-e29b-41d4-a716-446655440006', 'EMAIL', 'lucia.ferreira@consultoria.com', 'Sua nota fiscal foi emitida com sucesso. Você pode visualizá-la em nossa plataforma.', 'enviada', 'NOTA_FISCAL_EMITIDA', '750e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', 1),
        ('950e8400-e29b-41d4-a716-446655440007', 'SMS', '+5511888888888', 'Lembrete: Sua nota fiscal vence em 5 dias. Não se esqueça de efetuar o pagamento.', 'cancelada', 'LEMBRETE_VENCIMENTO', '750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 3)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM notificacoes
      WHERE id IN (
        '950e8400-e29b-41d4-a716-446655440000',
        '950e8400-e29b-41d4-a716-446655440001',
        '950e8400-e29b-41d4-a716-446655440002',
        '950e8400-e29b-41d4-a716-446655440003',
        '950e8400-e29b-41d4-a716-446655440004',
        '950e8400-e29b-41d4-a716-446655440005',
        '950e8400-e29b-41d4-a716-446655440006',
        '950e8400-e29b-41d4-a716-446655440007'
      )
    `);
  }
}
