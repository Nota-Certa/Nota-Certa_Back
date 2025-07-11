import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';

@Controller('notificacoes')
export class NotificacaoController {
  constructor(private readonly notificacaoService: NotificacoesService) {}

  @Post()
  criar(@Body() dto: CreateNotificacaoDto) {
    return this.notificacaoService.criar(dto);
  }

  @Get()
  buscarTodos() {
    return this.notificacaoService.buscarTodos();
  }

  @Get(':id')
  buscarUm(@Param('id') id: string) {
    return this.notificacaoService.buscarUm(id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() dto: UpdateNotificacaoDto) {
    return this.notificacaoService.atualizar(id, dto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.notificacaoService.remover(id);
  }
}
