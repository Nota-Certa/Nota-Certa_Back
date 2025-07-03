import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  BadRequestException,
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

  @Get('notas-por-periodo')
  getNotasPorPeriodo(
    @Query('mes') mes?: number,
    @Query('ano') ano?: number,
  ) {
    if (mes != null) {
      if (ano == null) {
        throw new BadRequestException('Quando filtrar por mês, o parâmetro &ano é obrigatório.');
      }

      if (mes < 1 || mes > 12) {
        throw new BadRequestException('Parâmetro &mes inválido. Deve ser entre 1 e 12.');
      }
    }

    const filtroAno = ano ?? new Date().getFullYear();
    return this.service.getNotasPorPeriodo(mes, filtroAno);
  }

  @Get('ranking-clientes')
  getRankingClientes(
    @Query('mes') mes?: number,
    @Query('ano') ano?: number,
    @Query('top') top?: number,
  ) {
    if (mes != null) {
      if (ano == null) {
        throw new BadRequestException('Quando filtrar por mês, o parâmetro &ano é obrigatório.');
      }

      if (mes < 1 || mes > 12) {
        throw new BadRequestException('Parâmetro &mes inválido. Deve ser entre 1 e 12.');
      }
    }

    if (top != null && (top < 1 || top > 100)) {
      throw new BadRequestException('O parâmetro &top deve ser um número entre 1 e 100.');
    }

    const filtroAno = ano ?? new Date().getFullYear();
    const filtroTop = top ?? 10;
    return this.service.getRankingClientesPorPeriodo(mes, filtroAno, filtroTop);
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
}
