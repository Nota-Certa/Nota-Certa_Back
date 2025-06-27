import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddTablesNotasFiscais1750906738931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notas_fiscais',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            isGenerated: true
          },
          {
            name: 'empresa_id',
            type: 'uuid'
          },
          {
            name: 'documento',
            type: 'varchar',
            length: '14'        // CPF (11) ou CNPJ (14) — no banco varchar(14)
          },
          {
            name: 'nome_razao_social',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'tipo_pessoa',
            type: 'enum',
            enum: ['F', 'J']    // F (Física) ou J (Jurídica)
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pendente', 'paga', 'cancelada'],
            default: "'pendente'"
          },
          {
            name: 'data_emissao',
            type: 'timestamp without time zone'
          },
          {
            name: 'data_vencimento',
            type: 'timestamp without time zone'
          },
          {
            name: 'valor_total',
            type: 'numeric',
            precision: 10,
            scale: 2
          },
          { name: 'xml_gerado', type: 'text' },
          { name: 'criado_em', type: 'timestamptz', default: 'now()' },
          { name: 'atualizado_em', type: 'timestamptz', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'nota_fiscal_itens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            isGenerated: true
          },
          {
            name: 'nota_fiscal_id',
            type: 'uuid'
          },
          {
            name: 'descricao',
            type: 'text'
          },
          {
            name: 'quantidade',
            type: 'integer'
          },
          {
            name: 'valor_unitario',
            type: 'numeric',
            precision: 10,
            scale: 2
          },
          {
            name: 'impostos',
            type: 'jsonb'
          },
        ],
      }),
    );

    await queryRunner.createForeignKey('nota_fiscal_itens', new TableForeignKey({
      columnNames: ['nota_fiscal_id'],
      referencedTableName: 'notas_fiscais',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('nota_fiscal_itens', 'FK_nota_fiscal_itens_nota_fiscais');
    await queryRunner.dropTable('nota_fiscal_itens');
    await queryRunner.dropTable('notas_fiscais');
  }
}
