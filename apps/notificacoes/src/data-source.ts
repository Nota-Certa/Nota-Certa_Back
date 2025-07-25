import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Notificacoes } from './entities/notificacoes.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_NOTIFICATIONS,
  entities: [Notificacoes],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
