import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class NullableXMLGerado1750906738932 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'notas_fiscais', // Nome da tabela
      'xml_gerado',    // Nome da coluna
      new TableColumn({
        name: 'xml_gerado',
        type: 'text',
        isNullable: true, // Tornando o campo 'nullable'
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'notas_fiscais',
      'xml_gerado',
      new TableColumn({
        name: 'xml_gerado',
        type: 'text',
        isNullable: false, // Voltando a ser não nulo
      }),
    );
  }
}
