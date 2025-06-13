import { Controller, Get } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';

@Controller()
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Get()
  getHello(): string {
    return this.pagamentoService.getHello();
  }
}
