import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assinatura } from './entities/assinaturas.entity';
import { Plano } from './entities/planos.entity';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';

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

  async criarAssinatura(dto: CreateAssinaturaDto) {
    console.log('Creating subscription with DTO:', dto); // log de debug
    
    // Setar datas se nao forem fornecidas
    const now = new Date();
    const defaultEndDate = new Date();
    defaultEndDate.setDate(defaultEndDate.getDate() + 30); // 30 dias a partir de hoje
    
    try {
      const assinatura = this.assinaturaRepo.create({
        plano_id: dto.planoId, // Map planoId to plano_id
        empresa_id: dto.empresa_id,
        inicio: dto.inicio ? new Date(dto.inicio) : now,
        fim: dto.fim ? new Date(dto.fim) : defaultEndDate,
        ativo: dto.ativo !== undefined ? dto.ativo : true,
      });
      
      console.log('Created entity:', assinatura);
      const result = await this.assinaturaRepo.save(assinatura);
      console.log('Saved subscription:', result);
      return result;
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }

  async atualizarAssinatura(id: string, dto: UpdateAssinaturaDto) {
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

  async criarPlano(dto: CreatePlanoDto) {
    const plano = this.planoRepo.create(dto);
    return this.planoRepo.save(plano);
  }

  async atualizarPlano(id: string, dto: UpdatePlanoDto) {
    await this.planoRepo.update(id, dto);
    return this.buscarPlanoPorId(id);
  }

  async deletarPlano(id: string) {
    const result = await this.planoRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Plano não encontrado');
    return { deletado: true };
  }
}
