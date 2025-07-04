import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacoes } from './entities/notificacoes.entity';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';

@Injectable()
export class NotificacoesService {
  constructor(
    @InjectRepository(Notificacoes)
    private readonly repo: Repository<Notificacoes>,
  ) {}

  async criar(dto: CreateNotificacaoDto) {
    const notificacao = this.repo.create(dto);
    await this.repo.save(notificacao);
    return notificacao;
  }

  buscarTodos() {
    return this.repo.find();
  }

  async buscarUm(id: string) {
    const notificacao = await this.repo.findOne({ where: { id } });
    if (!notificacao) throw new NotFoundException('Notificação não encontrada');
    return notificacao;
  }

  async atualizar(id: string, dto: UpdateNotificacaoDto) {
    await this.repo.update(id, dto);
    return this.buscarUm(id);
  }

  async remover(id: string) {
    const res = await this.repo.delete(id);
    if (!res.affected) throw new NotFoundException('Notificação não encontrada');
    return { deletado: true };
  }
}
