import { Test, TestingModule } from '@nestjs/testing';
import { DashboardMessageController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

describe('DashboardController', () => {
  let dashboardController: DashboardMessageController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DashboardMessageController],
      providers: [DashboardService],
    }).compile();

    dashboardController = app.get<DashboardMessageController>(DashboardMessageController);
  });

});
