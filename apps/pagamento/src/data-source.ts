import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Assinatura } from './entities/assinaturas.entity';
import { Plano } from './entities/planos.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_PAYMENT,
  entities: [Assinatura, Plano],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
