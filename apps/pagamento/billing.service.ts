import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assinatura } from './assinatura.entity';
import { Plano } from './plano.entity';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Assinatura)
    private readonly assinaturaRepo: Repository<Assinatura>,
    @InjectRepository(Plano)
    private readonly planoRepo: Repository<Plano>,
  ) {}

  // CRUD de Assinaturas
  async findAllAssinaturas() {
    return this.assinaturaRepo.find();
  }

  async findAssinaturaById(id: string) {
    const assinatura = await this.assinaturaRepo.findOne({ where: { id } });
    if (!assinatura) throw new NotFoundException('Assinatura not found');
    return assinatura;
  }

  async createAssinatura(dto: Partial<Assinatura>) {
    const assinatura = this.assinaturaRepo.create(dto);
    return this.assinaturaRepo.save(assinatura);
  }

  async updateAssinatura(id: string, dto: Partial<Assinatura>) {
    await this.assinaturaRepo.update(id, dto);
    return this.findAssinaturaById(id);
  }

  async deleteAssinatura(id: string) {
    const result = await this.assinaturaRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Assinatura not found');
    return { deleted: true };
  }

  // CRUD de Planos
  async findAllPlanos() {
    return this.planoRepo.find();
  }

  async findPlanoById(id: string) {
    const plano = await this.planoRepo.findOne({ where: { id } });
    if (!plano) throw new NotFoundException('Plano not found');
    return plano;
  }

  async createPlano(dto: Partial<Plano>) {
    const plano = this.planoRepo.create(dto);
    return this.planoRepo.save(plano);
  }

  async updatePlano(id: string, dto: Partial<Plano>) {
    await this.planoRepo.update(id, dto);
    return this.findPlanoById(id);
  }

  async deletePlano(id: string) {
    const result = await this.planoRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Plano not found');
    return { deleted: true };
  }
}