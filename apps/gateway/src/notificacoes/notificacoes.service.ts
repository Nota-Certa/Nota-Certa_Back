import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';

@Injectable()
export class NotificacoesService {
  constructor(
    @Inject('NOTIFICACAO_SERVICE') private readonly client: ClientProxy,
  ) {}

  criar(dto: CreateNotificacaoDto) {
    return firstValueFrom(this.client.send('create-notificacao', dto));
  }

  buscarTodos() {
    return firstValueFrom(this.client.send('', {})); // pattern vazio, igual no microserviço
  }

  buscarUm(id: string) {
    return firstValueFrom(this.client.send('notificacao-buscar-um', id));
  }

  atualizar(id: string, dto: UpdateNotificacaoDto) {
    return firstValueFrom(this.client.send('update-notificacao', { id, dto }));
  }

  remover(id: string) {
    return firstValueFrom(this.client.send('remover-notificacao', id));
  }
}
