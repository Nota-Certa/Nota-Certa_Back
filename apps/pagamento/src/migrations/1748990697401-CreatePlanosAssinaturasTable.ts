import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePlanosTable1748990697401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'planos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            isGenerated: true,
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'valor_mensal',
            type: 'numeric',
            precision: 10,
            scale: 2,
          },
          {
            name: 'limite_notas_mensal',
            type: 'integer',
          },
          {
            name: 'valor_excedente',
            type: 'numeric',
            precision: 10,
            scale: 2,
          },
          {
            name: 'acesso_premium',
            type: 'boolean',
            default: false,
          },
          {
            name: 'limite_usuarios',
            type: 'integer',
          },
          {
            name: 'criado_em',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'atualizado_em',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'assinaturas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            isGenerated: true,
          },
          {
            name: 'empresa_id',
            type: 'uuid',
          },
          {
            name: 'plano_id',
            type: 'uuid',
          },
          {
            name: 'inicio',
            type: 'date',
          },
          {
            name: 'fim',
            type: 'date',
          },
          {
            name: 'ativo',
            type: 'boolean',
            default: true,
          },
          {
            name: 'criado_em',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'atualizado_em',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey('assinaturas', new TableForeignKey({
      columnNames: ['plano_id'],
      referencedTableName: 'planos',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('assinaturas');
    await queryRunner.dropTable('planos');
  }
}
