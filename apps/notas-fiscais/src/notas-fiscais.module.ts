import { Module } from '@nestjs/common';
import { NotasFiscaisController } from './notas-fiscais.controller';
import { NotasFiscaisService } from './notas-fiscais.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotaFiscal } from './entities/nota-fiscal.entity';
import { NotaFiscalItem } from './entities/nota-fiscal-itens.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
      type: 'postgres',
      host: config.get('DB_HOST'),
      port: +(config.get('DB_PORT') ?? 5432),
      username: config.get('DB_USERNAME'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME_NF'),
      entities: [NotaFiscal, NotaFiscalItem],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: config.get('TYPEORM_MIGRATIONS_RUN') === 'true',
      migrationsTableName: 'migrations',
      synchronize: false
    }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([NotaFiscal, NotaFiscalItem])
  ],
  controllers: [NotasFiscaisController],
  providers: [NotasFiscaisService],
})
export class NotasFiscaisModule {}
