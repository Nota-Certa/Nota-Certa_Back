import { Module } from '@nestjs/common';
import { PaymentController } from './pagamento.gateway';
import { PaymentService } from './pagamento.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PagamentoController } from 'apps/pagamento/src/pagamento.controller';
import { PagamentoService } from 'apps/pagamento/src/pagamento.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DASHBOARD_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'redis',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        },
      },
    ]),
  ],
  controllers: [PagamentoController],
  providers: [PagamentoService],
  exports: [PagamentoService],
})
export class DashboardModule {}
