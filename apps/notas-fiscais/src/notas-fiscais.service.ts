import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { NotaFiscal } from './entities/nota-fiscal.entity';
import { NotaFiscalItem } from './entities/nota-fiscal-itens.entity';
import { CreateNotaFiscalDto } from './dto/create-nota-fiscal.dto';
import { UpdateNotaFiscalDto } from './dto/update-nota-fiscal.dto';
import { RankingCliente } from './interfaces/ranking-cliente';

@Injectable()
export class NotasFiscaisService {
  constructor(
    @InjectRepository(NotaFiscal)
    private readonly repo: Repository<NotaFiscal>,
    @InjectRepository(NotaFiscalItem)
    private readonly itemRepo: Repository<NotaFiscalItem>,
  ) {}

  async create(dto: CreateNotaFiscalDto) {
    let nota = this.repo.create({
      ...dto,
      valor_total: dto.itens.reduce(
        (sum, i) => sum + i.quantidade * i.valor_unitario,
        0,
      ),
    });
    nota = await this.repo.save(nota);

    const itens = dto.itens.map((i) =>
      this.itemRepo.create({ ...i, nota_fiscal_id: nota.id }),
    );
    await this.itemRepo.save(itens);

    return this.findOne(nota.id);
  }

  async findAll() {
    return this.repo.find({ relations: ['itens'] });
  }

  async findOne(id: string) {
    const nota = await this.repo.findOne({
      where: { id },
      relations: ['itens'],
    });
    if (!nota) throw new NotFoundException('Nota não encontrada');
    return nota;
  }

  async getNotasPorPeriodo(mes: number | undefined, ano: number) {
    let inicio = new Date(`${ano}-01-01T00:00:00Z`);
    let fim    = new Date(`${ano}-12-31T23:59:59Z`);

    if (mes != null) {
      inicio = new Date(`${ano}-${mes.toString().padStart(2, '0')}-01T00:00:00Z`);
      fim = new Date(inicio);
      fim.setMonth(fim.getMonth() + 1);
    }

    const notas = await this.repo.find({
      where: { data_emissao: Between(inicio, fim) },
      relations: ['itens'],
    });

    if (!notas.length) throw new NotFoundException('Nenhuma nota encontrada para o período especificado');
    return notas;
  }

  async getRankingClientesPorPeriodo(
    mes: number | undefined,
    ano: number,
    top: number,
  ): Promise<RankingCliente[]> {
    let inicio: Date, fim: Date;
    if (mes != null) {
      inicio = new Date(Date.UTC(ano, mes - 1, 1, 0, 0, 0));
      fim = new Date(Date.UTC(ano, mes, 0, 23, 59, 59));
    } else {
      inicio = new Date(Date.UTC(ano, 0, 1, 0, 0, 0));
      fim    = new Date(Date.UTC(ano, 11, 31, 23, 59, 59));
    }

    const rows = await this.repo
      .createQueryBuilder('nf')
      .select('nf.documento', 'documento')
      .addSelect('nf.nome_razao_social', 'nome_razao_social')
      .addSelect('COUNT(nf.id)', 'qtd')
      .where('nf.data_emissao BETWEEN :inicio AND :fim', { inicio, fim })
      .groupBy('nf.documento')
      .addGroupBy('nf.nome_razao_social')
      .orderBy('qtd', 'DESC')
      .limit(top)
      .getRawMany<RankingCliente>();

    if (!rows.length) throw new NotFoundException('Nenhum cliente encontrado para o período especificado');

    return rows.map(r => ({
      documento: r.documento,
      nome_razao_social: r.nome_razao_social,
      qtd: Number(r.qtd),
    }));
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
