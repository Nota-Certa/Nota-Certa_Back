import { Test, TestingModule } from '@nestjs/testing';
import { NotasFiscaisController } from './notas-fiscais.controller';
import { NotasFiscaisService } from './notas-fiscais.service';

describe('NotasFiscaisController', () => {
  let notasFiscaisController: NotasFiscaisController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotasFiscaisController],
      providers: [NotasFiscaisService],
    }).compile();

    notasFiscaisController = app.get<NotasFiscaisController>(NotasFiscaisController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(notasFiscaisController.getHello()).toBe('Hello World!');
    });
  });
});
