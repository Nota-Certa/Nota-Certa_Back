import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

    // endpoints de assinaturas
  @Get('assinaturas')
  findAllAssinaturas() {
    return this.billingService.findAllAssinaturas();
  }

  @Get('assinaturas/:id')
  findAssinaturaById(@Param('id') id: string) {
    return this.billingService.findAssinaturaById(id);
  }

  @Post('assinaturas')
  createAssinatura(@Body() dto: any) {
    return this.billingService.createAssinatura(dto);
  }

  @Put('assinaturas/:id')
  updateAssinatura(@Param('id') id: string, @Body() dto: any) {
    return this.billingService.updateAssinatura(id, dto);
  }

  @Delete('assinaturas/:id')
  deleteAssinatura(@Param('id') id: string) {
    return this.billingService.deleteAssinatura(id);
  }

    // endpoints de planos
  @Get('planos')
  findAllPlanos() {
    return this.billingService.findAllPlanos();
  }

  @Get('planos/:id')
  findPlanoById(@Param('id') id: string) {
    return this.billingService.findPlanoById(id);
  }

  @Post('planos')
  createPlano(@Body() dto: any) {
    return this.billingService.createPlano(dto);
  }

  @Put('planos/:id')
  updatePlano(@Param('id') id: string, @Body() dto: any) {
    return this.billingService.updatePlano(id, dto);
  }

  @Delete('planos/:id')
  deletePlano(@Param('id') id: string) {
    return this.billingService.deletePlano(id);
  }
}
