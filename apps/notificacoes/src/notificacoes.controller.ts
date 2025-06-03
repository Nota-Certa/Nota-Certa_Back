import { Controller, Get } from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';

@Controller()
export class NotificacoesController {
  constructor(private readonly notificacoesService: NotificacoesService) {}

  @Get()
  getHello(): string {
    return this.notificacoesService.getHello();
  }
}
