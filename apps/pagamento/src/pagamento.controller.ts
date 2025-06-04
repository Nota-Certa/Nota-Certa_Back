import { Controller, Get } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { MessagePattern } from '@nestjs/microservices';
import { promises } from 'dns';

@Controller()
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @MessagePattern('criar_pagamento')
  async criarPagamento(data: any): Promise<string> {
    return this.pagamentoService.processarPagamento(data);
  }

  /*
  @Get()
  getHello(): string {
    return this.pagamentoService.getHello();
  }
    */
}
