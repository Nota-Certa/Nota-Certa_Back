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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseNotaFiscalDto } from './dto/response-nota-fiscal.dto';

@ApiTags('Notas-Fiscais')
@Controller('notas-fiscais')
export class NotasFiscaisController {
  constructor(private readonly notasFiscaisService: NotasFiscaisService) {}

  // Rotas para Assinaturas
  @Get('notas')
  @ApiTags('Notas-Fiscais')
  @ApiOperation({ summary: 'Lista de todas as Notas fiscais' })
  @ApiResponse({
    status: 200,
    description: 'Lista de notas fiscais retornada com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Nenhuma nota fiscal encontrada.' })
  getAllNotas() {
    return this.notasFiscaisService.buscarTodasNotas();
  }

  @Get('notas/:id')
  @ApiTags('Notas-Fiscais')
  @ApiOperation({ summary: 'Busca de nota fiscal por ID' })
  @ApiResponse({
    status: 200,
    description: 'Nota fiscal encontrada com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  @ApiResponse({ status: 404, description: 'Nota fiscal não encontrada.' })
  getNotaPorId(@Param('id') id: string) {
    return this.notasFiscaisService.buscarNotasPorId(id);
  }

  @Post('notas')
  @ApiTags('Notas-Fiscais')
  @ApiOperation({ summary: 'Cria uma nova nota fiscal' })
  @ApiResponse({
    status: 201,
    description: 'Nota fiscal criada com sucesso.',
    type: CreateNotaFiscalDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 409, description: 'Assinatura já existe.'})
  @ApiBody({ type: CreateNotaFiscalDto })
  criarNota(@Body() dto: CreateNotaFiscalDto) {
    return this.notasFiscaisService.criarNota(dto);
  }

  @Put('notas/:id')
  @ApiTags('Notas-Fiscais')
  @ApiOperation({ summary: 'Atualiza uma nota fiscal pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Nota fiscal atualizada com sucesso.',
    type: ResponseNotaFiscalDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Nota fiscal não encontrada.' })
  @ApiBody({ type: UpdateNotaFiscalDto })
  atualizarNota(
    @Param('id') id: string,
    @Body() dto: UpdateNotaFiscalDto,
  ) {
    return this.notasFiscaisService.atualizarNota(id, dto);
  }

  @Delete('notas/:id')
  @ApiTags('Notas-Fiscais')
  @ApiOperation({ summary: 'Remove uma nota fiscal pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Nota fiscal removida com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Nota fiscal não encontrada.' })
  deletarNota(@Param('id') id: string) {
    return this.notasFiscaisService.deletarNota(id);
  }

  // Rotas para Planos
  @Get('notas/periodo')
  @ApiTags('Notas-Fiscais')
  @ApiOperation({ summary: 'Lista as notas fiscais de um período' })
  @ApiResponse({
    status: 200,
    description: 'Lista de notas fiscais retornada com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Nenhuma nota encontrado.' })
  getAllPlanos(@Param('mes') mes: number | undefined, @Param('ano') ano: number) {
    return this.notasFiscaisService.buscarNotasPorPeriodo(mes, ano);
  }

  @Get('notas/ranking')
  @ApiTags('Notas-Fiscais')
  @ApiOperation({ summary: 'Lista as notas fiscais por ranking' })
  @ApiResponse({
    status: 200,
    description: 'Lista de notas fiscais retornada com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Nenhuma nota fiscal encontrado.' })
  getPlanoPorId(@Param('mes') mes: number | undefined, @Param('ano') ano: number, @Param('top') top:number) {
    return this.notasFiscaisService.buscarRankingCLientes(mes,ano, top);
  }

  @Get('xml/baixar/:id')
  @ApiTags('Notas-Fiscais')
  @ApiOperation({ summary: 'Baixa uma nota fiscal como XML a partir de um ID' })
  @ApiResponse({
    status: 200,
    description: 'XML baixado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Nenhum nota fiscal encontrada.' })
  criarPlano(@Param('id') id: string) {
    return this.notasFiscaisService.baixarXML(id);
  }

  @Get('xml/gerar/:id')
  @ApiTags('Notas-Fiscais')
  @ApiOperation({ summary: 'Gera uma nota fiscal como XML a partir de um ID' })
  @ApiResponse({
    status: 200,
    description: 'XML gerado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Nenhum nota fiscal encontrada.' })
  atualizarPlano(@Param('id') id: string) {
    return this.notasFiscaisService.gerarXML(id);
  }

  @Get('notas/exportar/:id')
  @ApiOperation({ summary: 'Exporta uma nota fiscal a partir de um ID' })
  @ApiResponse({
    status: 200,
    description: 'Nota fiscal exportada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Nenhum nota fiscal encontrada.' })
  @ApiTags('Notas-Fiscais')
  deletarPlano(@Param('id') id: string,@Param('format') format: ExportNotaFiscalFormat) {
    return this.notasFiscaisService.exportarNotaFiscal(id, format);
  }
}
