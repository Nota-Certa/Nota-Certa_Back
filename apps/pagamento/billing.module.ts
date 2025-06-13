import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { Assinatura } from './assinatura.entity';
import { Plano } from './plano.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development.local' ? '.env.development.local' : '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_PAYMENT, //
      entities: [Assinatura, Plano],
      synchronize: true, // achoq tem q mudar pra false no prod
    }),
    TypeOrmModule.forFeature([Assinatura, Plano]),
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}