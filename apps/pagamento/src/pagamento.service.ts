import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assinatura } from './entities/assinaturas.entity';
import { Plano } from './entities/planos.entity';

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(Assinatura)
    private readonly assinaturaRepo: Repository<Assinatura>,
    @InjectRepository(Plano)
    private readonly planoRepo: Repository<Plano>,
  ) {}

  // CRUD de Assinaturas
  async buscarTodasAssinaturas() {
    return this.assinaturaRepo.find();
  }

  async buscarAssinaturaPorId(id: string) {
    const assinatura = await this.assinaturaRepo.findOne({ where: { id } });
    if (!assinatura) throw new NotFoundException('Assinatura não encontrada');
    return assinatura;
  }

  async criarAssinatura(dto: Partial<Assinatura>) {
    const assinatura = this.assinaturaRepo.create(dto);
    return this.assinaturaRepo.save(assinatura);
  }

  async atualizarAssinatura(id: string, dto: Partial<Assinatura>) {
    await this.assinaturaRepo.update(id, dto);
    return this.buscarAssinaturaPorId(id);
  }

  async deletarAssinatura(id: string) {
    const result = await this.assinaturaRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Assinatura não encontrada');
    return { deletado: true };
  }

  // CRUD de Planos
  async buscarTodosPlanos() {
    return this.planoRepo.find();
  }

  async buscarPlanoPorId(id: string) {
    const plano = await this.planoRepo.findOne({ where: { id } });
    if (!plano) throw new NotFoundException('Plano não encontrado');
    return plano;
  }

  async criarPlano(dto: Partial<Plano>) {
    const plano = this.planoRepo.create(dto);
    return this.planoRepo.save(plano);
  }

  async atualizarPlano(id: string, dto: Partial<Plano>) {
    await this.planoRepo.update(id, dto);
    return this.buscarPlanoPorId(id);
  }

  async deletarPlano(id: string) {
    const result = await this.planoRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Plano não encontrado');
    return { deletado: true };
  }
}
