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

@Controller('pagamentos')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Rotas para Assinaturas
  @Get('assinaturas')
  getAllAssinaturas() {
    return this.paymentService.buscarTodasAssinaturas();
  }

  @Get('assinaturas/:id')
  getAssinaturaPorId(@Param('id') id: string) {
    return this.paymentService.buscarAssinaturaPorId(id);
  }

  @Post('assinaturas')
  criarAssinatura(@Body() dto: CreateAssinaturaDto) {
    return this.paymentService.criarAssinatura(dto);
  }

  @Put('assinaturas/:id')
  atualizarAssinatura(
    @Param('id') id: string,
    @Body() dto: UpdateAssinaturaDto,
  ) {
    return this.paymentService.atualizarAssinatura(id, dto);
  }

  @Delete('assinaturas/:id')
  deletarAssinatura(@Param('id') id: string) {
    return this.paymentService.deletarAssinatura(id);
  }

  // Rotas para Planos
  @Get('planos')
  getAllPlanos() {
    return this.paymentService.buscarTodosPlanos();
  }

  @Get('planos/:id')
  getPlanoPorId(@Param('id') id: string) {
    return this.paymentService.buscarPlanoPorId(id);
  }

  @Post('planos')
  criarPlano(@Body() dto: CreatePlanoDto) {
    return this.paymentService.criarPlano(dto);
  }

  @Put('planos/:id')
  atualizarPlano(@Param('id') id: string, @Body() dto: UpdatePlanoDto) {
    return this.paymentService.atualizarPlano(id, dto);
  }

  @Delete('planos/:id')
  deletarPlano(@Param('id') id: string) {
    return this.paymentService.deletarPlano(id);
  }
}
