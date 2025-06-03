import { Module } from '@nestjs/common';
import { NotificacoesController } from './notificacoes.controller';
import { NotificacoesService } from './notificacoes.service';

@Module({
  imports: [],
  controllers: [NotificacoesController],
  providers: [NotificacoesService],
})
export class NotificacoesModule {}
