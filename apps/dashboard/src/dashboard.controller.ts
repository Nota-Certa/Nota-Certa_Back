import { Controller } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @MessagePattern('dashboard.notas-por-ano')
  getNotasPorAno() {
    return this.dashboardService.getNotasPorAno();
  }

  @MessagePattern('dashboard.ranking-clientes')
  getRankingClientes() {
    return this.dashboardService.getRankingClientes();
  }

  @MessagePattern('dashboard.notas-por-mes')
  getNotasPorMes() {
    return this.dashboardService.getNotasPorMes();
  }
}
