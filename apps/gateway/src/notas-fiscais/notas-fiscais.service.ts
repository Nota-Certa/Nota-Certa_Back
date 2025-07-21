// gateway/src/payment/payment.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ExportNotaFiscalFormat } from './enums/export-nota-fiscal-format.enum';
import { CreateNotaFiscalDto } from './dto/create-nota-fiscal.dto';
import { UpdateNotaFiscalDto } from './dto/update-nota-fiscal.dto';

@Injectable()
export class NotasFiscaisService {
  constructor(
    @Inject('NOTAS_FISCAIS_SERVICE') private readonly client: ClientProxy,
  ) {}

  buscarTodasNotas() {
    return firstValueFrom(this.client.send('nota-fiscal.findAll', {}));
  }

  buscarNotasPorId(id: string) {
    return firstValueFrom(this.client.send('nota-fiscal.findOne', id));
  }

  criarNota(dto: CreateNotaFiscalDto) {
    return firstValueFrom(this.client.send('nota-fiscal.create', dto));
  }

  atualizarNota(id: string, dto: UpdateNotaFiscalDto) {
    return firstValueFrom(
      this.client.send('nota-fiscal.update', { id, dto }),
    );
  }

  deletarNota(id: string) {
    return firstValueFrom(this.client.send('nota-fiscal.remove', id));
  }

  buscarNotasPorPeriodo(mes: number | undefined, ano:number) {
    return firstValueFrom(this.client.send('nota-fiscal.getNotasPorPeriodo', { mes, ano}));
  }

  buscarRankingCLientes(mes: number | undefined, ano: number, top: number) {
    return firstValueFrom(this.client.send('nota-fiscal.getRankingClientes', {mes, ano, top}));
  }

  baixarXML(id: string) {
    return firstValueFrom(this.client.send('nota-fiscal.downloadXml', id));
  }

  gerarXML(id: string) {
    return firstValueFrom(this.client.send('nota-fiscal.gerarXml', id));
  }

  exportarNotaFiscal(id: string, format: ExportNotaFiscalFormat) {
    return firstValueFrom(this.client.send('nota-fiscal.exportNotaFiscal', {id, format}));
  }
}
