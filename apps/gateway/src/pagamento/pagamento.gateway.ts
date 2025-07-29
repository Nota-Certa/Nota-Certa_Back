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
import { PaymentService } from './pagamento.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseAssinaturaDto } from './dto/response-assinatura.dto';
import { ResponsePlanoDto } from './dto/response-plano.dto';

@ApiTags('Pagamento')
@Controller('pagamentos')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Rotas para Assinaturas
  @Get('assinaturas')
  @ApiTags('Assinaturas')
  @ApiOperation({ summary: 'Lista todas as assinaturas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de assinaturas retornada com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Nenhuma assinatura encontrada.' })
  getAllAssinaturas() {
    return this.paymentService.buscarTodasAssinaturas();
  }

  @Get('assinaturas/:id')
  @ApiTags('Assinaturas')
  @ApiOperation({ summary: 'Busca uma assinatura pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Assinatura encontrada com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  @ApiResponse({ status: 404, description: 'Assinatura não encontrada.' })
  getAssinaturaPorId(@Param('id') id: string) {
    return this.paymentService.buscarAssinaturaPorId(id);
  }

  @Post('assinaturas')
  @ApiTags('Assinaturas')
  @ApiOperation({ summary: 'Cria uma nova assinatura' })
  @ApiResponse({
    status: 201,
    description: 'Assinatura criada com sucesso.',
    type: ResponseAssinaturaDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 409, description: 'Assinatura já existe.'})
  @ApiBody({ type: CreateAssinaturaDto })
  criarAssinatura(@Body() dto: CreateAssinaturaDto) {
    return this.paymentService.criarAssinatura(dto);
  }

  @Put('assinaturas/:id')
  @ApiTags('Assinaturas')
  @ApiOperation({ summary: 'Atualiza uma assinatura pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Assinatura atualizada com sucesso.',
    type: ResponseAssinaturaDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Assinatura não encontrada.' })
  @ApiBody({ type: UpdateAssinaturaDto })
  atualizarAssinatura(
    @Param('id') id: string,
    @Body() dto: UpdateAssinaturaDto,
  ) {
    return this.paymentService.atualizarAssinatura(id, dto);
  }

  @Delete('assinaturas/:id')
  @ApiTags('Assinaturas')
  @ApiOperation({ summary: 'Remove uma assinatura pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Assinatura removida com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Assinatura não encontrada.' })
  deletarAssinatura(@Param('id') id: string) {
    return this.paymentService.deletarAssinatura(id);
  }

  // Rotas para Planos
  @Get('planos')
  @ApiTags('Planos')
  @ApiOperation({ summary: 'Lista todos os planos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de planos retornada com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Nenhum plano encontrado.' })
  getAllPlanos() {
    return this.paymentService.buscarTodosPlanos();
  }

  @Get('planos/:id')
  @ApiTags('Planos')
  @ApiOperation({ summary: 'Busca um plano pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Plano encontrado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado.' })
  getPlanoPorId(@Param('id') id: string) {
    return this.paymentService.buscarPlanoPorId(id);
  }

  @Post('planos')
  @ApiTags('Planos')
  @ApiOperation({ summary: 'Cria um novo plano' })
  @ApiResponse({
    status: 201,
    description: 'Plano criado com sucesso.',
    type: ResponsePlanoDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 409, description: 'Plano já existe.' })
  @ApiBody({ type: CreatePlanoDto })
  criarPlano(@Body() dto: CreatePlanoDto) {
    return this.paymentService.criarPlano(dto);
  }

  @Put('planos/:id')
  @ApiTags('Planos')
  @ApiOperation({ summary: 'Atualiza um plano pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Plano atualizado com sucesso.',
    type: ResponsePlanoDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado.' })
  @ApiBody({ type: UpdatePlanoDto })
  atualizarPlano(@Param('id') id: string, @Body() dto: UpdatePlanoDto) {
    return this.paymentService.atualizarPlano(id, dto);
  }

  @Delete('planos/:id')
  @ApiTags('Planos')
  @ApiOperation({ summary: 'Remove um plano pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Plano removido com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Plano não encontrado.' })
  deletarPlano(@Param('id') id: string) {
    return this.paymentService.deletarPlano(id);
  }
}
