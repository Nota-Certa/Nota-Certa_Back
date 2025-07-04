import { Module } from '@nestjs/common';
import { PagamentoController } from './pagamento.controller';
import { PagamentoService } from './pagamento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assinatura } from './entities/assinaturas.entity';
import { Plano } from './entities/planos.entity';
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
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME_PAYMENT'),
        entities: [Assinatura, Plano],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsRun: config.get('TYPEORM_MIGRATIONS_RUN') === 'true',
        migrationsTableName: 'migrations',
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Assinatura, Plano]),
  ],
  controllers: [PagamentoController],
  providers: [PagamentoService],
})
export class PagamentoModule {}
