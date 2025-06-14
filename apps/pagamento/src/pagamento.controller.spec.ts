import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoController } from './pagamento.controller';
import { PagamentoService } from './pagamento.service';

describe('PagamentoController', () => {
  let pagamentoController: PagamentoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PagamentoController],
      providers: [PagamentoService],
    }).compile();

    pagamentoController = app.get<PagamentoController>(PagamentoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(pagamentoController.getHello()).toBe('Hello World!');
    });
  });
});
