import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsoMensal } from './entities/uso_mensal.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'dashboard',
      entities: [UsoMensal],
      synchronize: true, // ⚠️ Apenas para dev (não usar em produção)
    }),
    TypeOrmModule.forFeature([UsoMensal]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
