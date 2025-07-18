import {
  Inject,
  Injectable,
  ServiceUnavailableException,
  BadGatewayException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, TimeoutError } from 'rxjs';

@Injectable()
export class DashboardService {
  constructor(@Inject('NOTAS_SERVICE') private readonly client: ClientProxy) {}

  async getNotasPorAno() {
    try {
      return await firstValueFrom(this.client.send('notas.notas-por-ano', {}));
    } catch (err) {
      this.handleError(err, 'getNotasPorAno');
    }
  }

  async getRankingClientes() {
    try {
      return await firstValueFrom(
        this.client.send('notas.ranking-clientes', {}),
      );
    } catch (err) {
      this.handleError(err, 'getRankingClientes');
    }
  }

  async getNotasPorMes() {
    try {
      return await firstValueFrom(this.client.send('notas.notas-por-mes', {}));
    } catch (err) {
      this.handleError(err, 'getNotasPorMes');
    }
  }

  private handleError(err: any, metodo: string) {
    if (err instanceof TimeoutError) {
      throw new ServiceUnavailableException(
        `Timeout ao acessar microserviço em ${metodo}`,
      );
    }
    if (err.code === 'ECONNREFUSED') {
      throw new ServiceUnavailableException(
        `Microserviço de notas está indisponível (${metodo})`,
      );
    }
    throw new BadGatewayException(
      `Erro ao chamar ${metodo}: ${err.message || err}`,
    );
  }
}
