import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('notas-por-ano')
  getNotasPorAno() {
    return this.dashboardService.getNotasPorAno();
  }

  @Get('ranking-clientes')
  getRankingClientes() {
    return this.dashboardService.getRankingClientes();
  }

  @Get('notas-por-mes')
  getNotasPorMes() {
    return this.dashboardService.getNotasPorMes();
  }
}
