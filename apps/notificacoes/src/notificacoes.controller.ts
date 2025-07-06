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
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller()
export class NotificacoesController {
  constructor(private readonly service: NotificacoesService) {}

  @MessagePattern('create-notificacao')
  criar(@Payload() dto: CreateNotificacaoDto) {
    return this.service.criar(dto);
  }

  @MessagePattern()
  buscarTodos() {
    return this.service.buscarTodos();
  }

  @MessagePattern('notificacao-buscar-um')
  buscarUm(@Payload() id: string) {
    return this.service.buscarUm(id);
  }

  @MessagePattern('update-notificacao')
  atualizar(@Payload() payload: {id: string; dto: UpdateNotificacaoDto } ) {
    const { id, dto } = payload;
    return this.service.atualizar(id, dto);
  }

  @MessagePattern('remover-notificacao')
  remover(@Payload() id: string) {
    return this.service.remover(id);
  }
}
