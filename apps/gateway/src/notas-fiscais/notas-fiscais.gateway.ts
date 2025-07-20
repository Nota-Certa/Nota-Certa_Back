// gateway/src/payment/payment.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NotasFiscaisService } from './notas-fiscais.service';
import { UpdateNotaFiscalDto } from './dto/update-nota-fiscal.dto';
import { CreateNotaFiscalDto } from 'apps/notas-fiscais/src/dto/create-nota-fiscal.dto';
import { ExportNotaFiscalFormat } from './enums/export-nota-fiscal-format.enum';

@Controller('notas-fiscais')
export class NotasFiscaisController {
  constructor(private readonly notasFiscaisService: NotasFiscaisService) {}

  // Rotas para Assinaturas
  @Get('notas')
  getAllNotas() {
    return this.notasFiscaisService.buscarTodasNotas();
  }

  @Get('notas/:id')
  getNotaPorId(@Param('id') id: string) {
    return this.notasFiscaisService.buscarNotasPorId(id);
  }

  @Post('notas')
  criarNota(@Body() dto: CreateNotaFiscalDto) {
    return this.notasFiscaisService.criarNota(dto);
  }

  @Put('notas/:id')
  atualizarNota(
    @Param('id') id: string,
    @Body() dto: UpdateNotaFiscalDto,
  ) {
    return this.notasFiscaisService.atualizarNota(id, dto);
  }

  @Delete('notas/:id')
  deletarNota(@Param('id') id: string) {
    return this.notasFiscaisService.deletarNota(id);
  }

  // Rotas para Planos
  @Get('notas/periodo')
  getAllPlanos(@Param('mes') mes: number | undefined, @Param('ano') ano: number) {
    return this.notasFiscaisService.buscarNotasPorPeriodo(mes, ano);
  }

  @Get('notas/ranking')
  getPlanoPorId(@Param('mes') mes: number | undefined, @Param('ano') ano: number, @Param('top') top:number) {
    return this.notasFiscaisService.buscarRankingCLientes(mes,ano, top);
  }

  @Get('xml/baixar/:id')
  criarPlano(@Param('id') id: string) {
    return this.notasFiscaisService.baixarXML(id);
  }

  @Get('xml/gerar/:id')
  atualizarPlano(@Param('id') id: string) {
    return this.notasFiscaisService.gerarXML(id);
  }

  @Get('notas/exportar/:id')
  deletarPlano(@Param('id') id: string,@Param('format') format: ExportNotaFiscalFormat) {
    return this.notasFiscaisService.exportarNotaFiscal(id, format);
  }
}
