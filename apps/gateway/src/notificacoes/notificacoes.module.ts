import { Module } from '@nestjs/common';
import { NotificacaoController } from './notificacoes.gateway';
import { NotificacoesService } from './notificacoes.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  controllers: [NotificacaoController],
  providers: [NotificacoesService],
  exports: [NotificacoesService],
})
export class DashboardModule {}
