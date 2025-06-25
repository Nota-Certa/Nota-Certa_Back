import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DashboardService {
  constructor(
    @Inject('NOTAS_SERVICE') private readonly client: ClientProxy,
  ) {}

  async getNotasPorAno() {
    return firstValueFrom(this.client.send('notas.notas-por-ano', {}));
  }

  async getRankingClientes() {
    return firstValueFrom(this.client.send('notas.ranking-clientes', {}));
  }

  async getNotasPorMes() {
    return firstValueFrom(this.client.send('notas.notas-por-mes', {}));
  }
}
