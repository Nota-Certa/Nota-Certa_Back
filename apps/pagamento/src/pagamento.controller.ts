import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';

@Controller('pagamento')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  // endpoints de assinaturas
  @Get('assinaturas')
  buscarTodasAssinaturas() {
    return this.pagamentoService.buscarTodasAssinaturas();
  }

  @Get('assinaturas/:id')
  buscarAssinaturaPorId(@Param('id') id: string) {
    return this.pagamentoService.buscarAssinaturaPorId(id);
  }

  @Post('assinaturas')
  criarAssinatura(@Body() dto: any) {
    return this.pagamentoService.criarAssinatura(dto);
  }

  @Put('assinaturas/:id')
  atualizarAssinatura(@Param('id') id: string, @Body() dto: any) {
    return this.pagamentoService.atualizarAssinatura(id, dto);
  }

  @Delete('assinaturas/:id')
  deletarAssinatura(@Param('id') id: string) {
    return this.pagamentoService.deletarAssinatura(id);
  }

  // endpoints de planos
  @Get('planos')
  buscarTodosPlanos() {
    return this.pagamentoService.buscarTodosPlanos();
  }

  @Get('planos/:id')
  buscarPlanoPorId(@Param('id') id: string) {
    return this.pagamentoService.buscarPlanoPorId(id);
  }

  @Post('planos')
  criarPlano(@Body() dto: any) {
    return this.pagamentoService.criarPlano(dto);
  }

  @Put('planos/:id')
  atualizarPlano(@Param('id') id: string, @Body() dto: any) {
    return this.pagamentoService.atualizarPlano(id, dto);
  }

  @Delete('planos/:id')
  deletarPlano(@Param('id') id: string) {
    return this.pagamentoService.deletarPlano(id);
  }
}
