import { Test, TestingModule } from '@nestjs/testing';
import { NotificacoesController } from './notificacoes.controller';
import { NotificacoesService } from './notificacoes.service';

describe('NotificacoesController', () => {
  let notificacoesController: NotificacoesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificacoesController],
      providers: [NotificacoesService],
    }).compile();

    notificacoesController = app.get<NotificacoesController>(NotificacoesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(notificacoesController.getHello()).toBe('Hello World!');
    });
  });
});
