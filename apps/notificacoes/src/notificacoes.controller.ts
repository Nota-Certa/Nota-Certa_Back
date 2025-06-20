import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';

@Controller('notificacoes')
export class NotificacoesController {
  constructor(private readonly service: NotificacoesService) {}

  @Post()
  criar(@Body() dto: CreateNotificacaoDto) {
    return this.service.criar(dto);
  }

  @Get()
  buscarTodos() {
    return this.service.buscarTodos();
  }

  @Get(':id')
  buscarUm(@Param('id') id: string) {
    return this.service.buscarUm(id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() dto: UpdateNotificacaoDto) {
    return this.service.atualizar(id, dto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.service.remover(id);
  }
}
