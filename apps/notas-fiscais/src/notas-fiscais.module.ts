import { Module } from '@nestjs/common';
import { NotasFiscaisController } from './notas-fiscais.controller';
import { NotasFiscaisService } from './notas-fiscais.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotaFiscal } from './entities/nota-fiscal.entity';
import { NotaFiscalItem } from './entities/nota-fiscal-itens.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_NF,
      entities: [NotaFiscal, NotaFiscalItem],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
      migrationsTableName: 'migrations',
      synchronize: false
    }),
    TypeOrmModule.forFeature([NotaFiscal, NotaFiscalItem])
  ],
  controllers: [NotasFiscaisController],
  providers: [NotasFiscaisService],
})
export class NotasFiscaisModule {}
