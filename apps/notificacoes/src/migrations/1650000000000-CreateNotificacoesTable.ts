import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNotificacoesTable1650000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notificacoes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            isGenerated: true
          },
          {
            name: 'tipo',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'destinatario',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'conteudo',
            type: 'text'
          },
          {
            name: 'status_envio',
            type: 'enum',
            enum: ['pendente', 'enviada', 'cancelada'],
            default: "'pendente'"
          },
          {
            name: 'evento',
            type: 'text'
          },
          {
            name: 'nota_fiscal_id',
            type: 'uuid'
          },
          {
            name: 'cliente_id',
            type: 'uuid'
          },
          {
            name: 'empresa_id',
            type: 'uuid'
          },
          {
            name: 'tentativa',
            type: 'integer'
          },
          {
            name: 'criado_em',
            type: 'timestamptz',
            default: 'now()'
          },
          {
            name: 'atualizado_em',
            type: 'timestamptz',
            default: 'now()'
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notificacoes');
  }
}
