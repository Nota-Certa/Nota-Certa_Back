import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { Assinatura } from './assinatura.entity';
import { Plano } from './plano.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        // configs do type orm pra conecter com o db, tem que mudar pras configs dos de vcs se for rodar local
        // ou mudar pras configs do docker se for rodar no docker
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_db_user',
      password: 'your_db_password',
      database: 'your_db_name',
      entities: [Assinatura, Plano],
      synchronize: true, // eu acho que isso deve ser false qnd der deploy
    }),
    TypeOrmModule.forFeature([Assinatura, Plano]),
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
