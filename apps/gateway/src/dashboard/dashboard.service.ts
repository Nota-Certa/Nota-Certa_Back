import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DashboardService {
  constructor(@Inject('DASHBOARD_SERVICE') private readonly client: ClientProxy) {}

  getNotasPorAno() {
    return firstValueFrom(this.client.send('dashboard.notas-por-ano', {}));
  }

  getRankingClientes() {
    return firstValueFrom(this.client.send('dashboard.ranking-clientes', {}));
  }

  getNotasPorMes() {
    return firstValueFrom(this.client.send('dashboard.notas-por-mes', {}));
  }
}
