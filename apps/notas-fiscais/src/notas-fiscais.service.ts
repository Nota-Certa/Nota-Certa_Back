import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { NotaFiscal } from './entities/nota-fiscal.entity';
import { NotaFiscalItem } from './entities/nota-fiscal-itens.entity';
import { CreateNotaFiscalDto } from './dto/create-nota-fiscal.dto';
import { UpdateNotaFiscalDto } from './dto/update-nota-fiscal.dto';
import { RankingCliente } from './interfaces/ranking-cliente';
import { ExportNotaFiscalFormat } from './enums/export-nota-fiscal-format.enum';
import { XMLBuilder } from 'fast-xml-parser';
import PDFDocument from 'pdfkit';
import { parse as json2csv } from 'json2csv';

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

  async getXmlGerado(id: string): Promise<string> {
    const nota = await this.findOne(id);
    if (!nota.xml_gerado) {
      return this.gerarXmlESalvar(id);
    }
    return nota.xml_gerado;
  }

  async gerarXmlESalvar(id: string) {
    const xml = this.exportAsXML(await this.findOne(id));
    await this.repo.update(id, { xml_gerado: xml });
    return xml;
  }

  async exportNotaFiscal(id: string, format: ExportNotaFiscalFormat) {
    const nota = await this.findOne(id);
    switch (format) {
      case ExportNotaFiscalFormat.PDF:
        return this.exportAsPDF(nota);
      case ExportNotaFiscalFormat.XML:
        return this.exportAsXML(nota);
      case ExportNotaFiscalFormat.CSV:
        return this.exportAsCSV(nota);
      case ExportNotaFiscalFormat.JSON:
        return this.exportAsJSON(nota);
    }
  }

  exportAsJSON(nota: NotaFiscal) {
    return JSON.stringify(nota, null, 2);
  }

  exportAsXML(nota: NotaFiscal) {
    const builder = new XMLBuilder({
      ignoreAttributes: false,
      format: true,
      // rootName definirá o nome da tag raiz; pode ser "notaFiscal"
      tagValueProcessor: (a) => (typeof a === 'string' ? a : String(a)),
    });

    // Monta o XML da nota fiscal
    const wrapped = { nota_fiscal: nota };
    const xml = builder.build(wrapped);
    return xml;
  }

  exportAsPDF(nota: NotaFiscal) {
    const doc = new PDFDocument({ margin: 30 });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    doc.on('end', () => { /* nada aqui */ });

    // Cabeçalho
    doc.fontSize(20).text('Nota Fiscal', { align: 'center' });
    doc.moveDown();

    // Dados principais
    doc.fontSize(12);
    doc.text(`ID: ${nota.id}`);
    doc.text(`Empresa: ${nota.empresa_id}`);
    doc.text(`Documento: ${nota.documento}`);
    doc.text(`Nome/Razão Social: ${nota.nome_razao_social}`);
    doc.text(`Tipo Pessoa: ${nota.tipo_pessoa}`);
    doc.text(`Status: ${nota.status}`);
    doc.text(`Emissão: ${nota.data_emissao.toISOString()}`);
    doc.text(`Vencimento: ${nota.data_vencimento.toISOString()}`);
    doc.text(`Valor Total: R$ ${nota.valor_total.toFixed(2)}`);
    doc.moveDown();

    // Tabela de itens
    doc.fontSize(14).text('Itens', { underline: true });
    doc.moveDown(0.5);
    nota.itens.forEach((i, idx) => {
      doc.fontSize(12).text(
        `${idx + 1}. ${i.descricao} — ${i.quantidade} x R$ ${i.valor_unitario.toFixed(2)} = R$ ${(
          i.quantidade * i.valor_unitario
        ).toFixed(2)}`
      );
      doc.text(`   Impostos: ${JSON.stringify(i.impostos)}`);
      doc.moveDown(0.5);
    });

    doc.end();
    return Buffer.concat(chunks);
  }

  exportAsCSV(nota: NotaFiscal) {
    // Dados principais da nota
    const notaFlat = {
      id: nota.id,
      empresa_id: nota.empresa_id,
      documento: nota.documento,
      nome_razao_social: nota.nome_razao_social,
      tipo_pessoa: nota.tipo_pessoa,
      status: nota.status,
      data_emissao: nota.data_emissao.toISOString(),
      data_vencimento: nota.data_vencimento.toISOString(),
      valor_total: nota.valor_total,
    };
    const csvNota = json2csv([notaFlat]);

    // Itens da nota
    const itensFlat = nota.itens.map((i) => ({
      id: i.id,
      descricao: i.descricao,
      quantidade: i.quantidade,
      valor_unitario: i.valor_unitario,
      impostos: JSON.stringify(i.impostos),
    }));
    const csvItens = json2csv(itensFlat);

    // Juntando as duas partes com um separador
    return [
      '# Nota Fiscal',
      csvNota,
      '',
      '# Itens',
      csvItens,
    ].join('\n');
  }
}
