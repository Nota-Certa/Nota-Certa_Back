import { Module } from '@nestjs/common';
import { PagamentoController } from './pagamento.controller';
import { PagamentoService } from './pagamento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assinatura } from './entities/assinaturas.entity';
import { Plano } from './entities/planos.entity';
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
      database: process.env.DB_NAME_PAYMENT,
      entities: [Assinatura, Plano],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
      migrationsTableName: 'migrations',
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Assinatura, Plano]),
  ],
  controllers: [PagamentoController],
  providers: [PagamentoService],
})
export class PagamentoModule {}
