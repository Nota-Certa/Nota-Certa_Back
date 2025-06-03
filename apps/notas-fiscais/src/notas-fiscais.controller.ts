import { Controller, Get } from '@nestjs/common';
import { NotasFiscaisService } from './notas-fiscais.service';

@Controller()
export class NotasFiscaisController {
  constructor(private readonly notasFiscaisService: NotasFiscaisService) {}

  @Get()
  getHello(): string {
    return this.notasFiscaisService.getHello();
  }
}
