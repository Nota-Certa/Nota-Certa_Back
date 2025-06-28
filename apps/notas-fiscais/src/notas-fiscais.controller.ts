import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { NotasFiscaisService } from './notas-fiscais.service';
import { CreateNotaFiscalDto } from './dto/create-nota-fiscal.dto';
import { UpdateNotaFiscalDto } from './dto/update-nota-fiscal.dto';
//import { MessagePattern } from '@nestjs/microservices';

@Controller('notas-fiscais')
export class NotasFiscaisController {
  constructor(private readonly service: NotasFiscaisService) {}

  @Post()
  create(@Body() dto: CreateNotaFiscalDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateNotaFiscalDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  /*
  @MessagePattern('notas.notas-por-ano')
  async handleNotasPorAno() {
    return this.service.getNotasPorAno();
  }

  @MessagePattern('notas.notas-por-mes')
  async handleNotasPorMes() {
    return this.service.getNotasPorMes();
  }

  @MessagePattern('notas.ranking-clientes')
  async handleRankingClientes() {
    return this.service.getRankingClientes();
  }
  */
}
