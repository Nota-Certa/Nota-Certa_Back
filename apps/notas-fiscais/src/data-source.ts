import 'dotenv/config';
import { DataSource } from 'typeorm';
import { NotaFiscal } from './entities/nota-fiscal.entity';
import { NotaFiscalItem } from './entities/nota-fiscal-itens.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_NF,
  entities: [NotaFiscal, NotaFiscalItem],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
