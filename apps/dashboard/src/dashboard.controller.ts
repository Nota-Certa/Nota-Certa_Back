import { Controller } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class DashboardMessageController {
  constructor(private readonly dashboardService: DashboardService) {}

  @MessagePattern('dashboard.notas-por-ano')
  async handleNotasPorAno() {
    return this.dashboardService.getNotasPorAno();
  }

  @MessagePattern('dashboard.ranking-clientes')
  async handleRankingClientes() {
    return this.dashboardService.getRankingClientes();
  }

  @MessagePattern('dashboard.notas-por-mes')
  async handleNotasPorMes() {
    return this.dashboardService.getNotasPorMes();
  }
}
