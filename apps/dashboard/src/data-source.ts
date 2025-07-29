import 'dotenv/config';
import { DataSource } from 'typeorm';
import { UsoMensal } from './entities/uso_mensal.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_DASHBOARD,
  entities: [UsoMensal],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
