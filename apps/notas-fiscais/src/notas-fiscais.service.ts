import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotaFiscal } from './entities/nota-fiscal.entity';
import { NotaFiscalItem } from './entities/nota-fiscal-itens.entity';
import { CreateNotaFiscalDto } from './dto/create-nota-fiscal.dto';
import { UpdateNotaFiscalDto } from './dto/update-nota-fiscal.dto';

@Injectable()
export class NotasFiscaisService {
  constructor(
    @InjectRepository(NotaFiscal)
    private readonly repo: Repository<NotaFiscal>,
    @InjectRepository(NotaFiscalItem)
    private readonly itemRepo: Repository<NotaFiscalItem>,
  ) {}

  async create(dto: CreateNotaFiscalDto) {
    const nota = this.repo.create({
      ...dto,
      valor_total: dto.itens.reduce(
        (sum, i) => sum + i.quantidade * i.valor_unitario,
        0,
      ),
    });
    await this.repo.save(nota);

    const itens = dto.itens.map((i) =>
      this.itemRepo.create({ ...i, nota_fiscal_id: nota.id }),
    );
    await this.itemRepo.save(itens);

    return this.findOne(nota.id);
  }

  findAll() {
    return this.repo.find({ relations: ['cliente'] });
  }

  async findOne(id: string) {
    const nota = await this.repo.findOne({
      where: { id },
      relations: ['cliente', 'itens'],
    });
    if (!nota) throw new NotFoundException('Nota não encontrada');
    return nota;
  }

  async update(id: string, dto: UpdateNotaFiscalDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const res = await this.repo.delete(id);
    if (!res.affected) throw new NotFoundException('Nota não encontrada');
    return { deleted: true };
  }
}
