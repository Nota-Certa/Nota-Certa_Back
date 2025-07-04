import { Controller, BadRequestException } from '@nestjs/common';
import { NotasFiscaisService } from './notas-fiscais.service';
import { CreateNotaFiscalDto } from './dto/create-nota-fiscal.dto';
import { UpdateNotaFiscalDto } from './dto/update-nota-fiscal.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('notas-fiscais')
export class NotasFiscaisController {
  constructor(private readonly service: NotasFiscaisService) {}

  @MessagePattern('nota-fiscal.create')
  create(@Payload() dto: CreateNotaFiscalDto) {
    return this.service.create(dto);
  }

  @MessagePattern('nota-fiscal.getNotasPorPeriodo')
  getNotasPorPeriodo(
    @Payload('mes') mes?: number,
    @Payload('ano') ano?: number,
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

  @MessagePattern('nota-fiscal.getRankingClientes')
  getRankingClientes(
    @Payload('mes') mes?: number,
    @Payload('ano') ano?: number,
    @Payload('top') top?: number,
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

  @MessagePattern('nota-fiscal.findAll')
  findAll() {
    return this.service.findAll();
  }

  @MessagePattern('nota-fiscal.findOne')
  findOne(@Payload('id') id: string) {
    return this.service.findOne(id);
  }

  @MessagePattern('nota-fiscal.update')
  update(@Payload('id') id: string, @Payload('dto') dto: UpdateNotaFiscalDto) {
    return this.service.update(id, dto);
  }

  @MessagePattern('nota-fiscal.remove')
  remove(@Payload('id') id: string) {
    return this.service.remove(id);
  }
}
