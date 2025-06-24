import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNotificacoesTable1650000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Notificacoes',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', isGenerated: true },
          { name: 'tipo', type: 'text' },
          { name: 'destinatario', type: 'text' },
          { name: 'conteudo', type: 'text' },
          { name: 'status_emvio', type: 'text' },
          { name: 'evento', type: 'text' },
          { name: 'invoice_id', type: 'uuid' },
          { name: 'cliente_id', type: 'uuid' },
          { name: 'empresa_id', type: 'uuid' },
          { name: 'tentativa', type: 'integer' },
          { name: 'atualizado_em', type: 'timestamptz', default: 'now()' },
          { name: 'create_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Notificacoes');
  }
}
