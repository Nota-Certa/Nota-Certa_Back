import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUsuariosEmpresasTable1748990697401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usuarios',
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
            name: 'nome',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'senha',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['Admin', 'Funcionário'],
            default: "'Funcionário'",
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

    await queryRunner.createTable(
      new Table({
        name: 'empresas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            isGenerated: true,
          },
          {
            name: 'nome_razao_social',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'cnpj',
            type: 'varchar',
            length: '14',
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

    await queryRunner.createForeignKey('usuarios', new TableForeignKey({
      columnNames: ['empresa_id'],
      referencedTableName: 'empresas',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usuarios');
    await queryRunner.dropTable('empresas');
  }
}
