import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoController } from './pagamento.controller';
import { PagamentoService } from './pagamento.service';

describe('PagamentoController', () => {
  let controller: PagamentoController;
  let service: PagamentoService;

  //simulando o service
  const mockService = {
    buscarTodasAssinaturas: jest.fn(),
    buscarAssinaturaPorId: jest.fn(),
    criarAssinatura: jest.fn(),
    atualizarAssinatura: jest.fn(),
    deletarAssinatura: jest.fn(),
    buscarTodosPlanos: jest.fn(),
    buscarPlanoPorId: jest.fn(),
    criarPlano: jest.fn(),
    atualizarPlano: jest.fn(),
    deletarPlano: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagamentoController],
      providers: [{ provide: PagamentoService, useValue: mockService }],
    }).compile();

    controller = module.get<PagamentoController>(PagamentoController);
    service = module.get<PagamentoService>(PagamentoService);
  });

  it('deve buscar todas as assinaturas', async () => {
    await controller.buscarTodasAssinaturas();
    expect(service.buscarTodasAssinaturas).toHaveBeenCalled();
  });

  it('deve buscar uma assinatura por ID', async () => {
    await controller.buscarAssinaturaPorId('abc');
    expect(service.buscarAssinaturaPorId).toHaveBeenCalledWith('abc');
  });

  it('deve criar uma assinatura', async () => {
    const dto = {
      plano_id: '1',
      empresa_id: '2',
      inicio: '2025-01-01',
      fim: '2025-12-31',
    };
    await controller.criarAssinatura(dto as any);
    expect(service.criarAssinatura).toHaveBeenCalledWith(dto);
  });

  it('deve atualizar uma assinatura', async () => {
    const data = { id: 'abc', dto: { ativo: false } };
    await controller.atualizarAssinatura(data);
    expect(service.atualizarAssinatura).toHaveBeenCalledWith('abc', data.dto);
  });

  it('deve deletar uma assinatura', async () => {
    await controller.deletarAssinatura('abc');
    expect(service.deletarAssinatura).toHaveBeenCalledWith('abc');
  });

  it('deve buscar todos os planos', async () => {
    await controller.buscarTodosPlanos();
    expect(service.buscarTodosPlanos).toHaveBeenCalled();
  });

  it('deve buscar um plano por ID', async () => {
    await controller.buscarPlanoPorId('plano123');
    expect(service.buscarPlanoPorId).toHaveBeenCalledWith('plano123');
  });

  it('deve criar um plano', async () => {
    const dto = { nome: 'Plano Premium', preco: 99.99 };
    await controller.criarPlano(dto as any);
    expect(service.criarPlano).toHaveBeenCalledWith(dto);
  });

  it('deve atualizar um plano', async () => {
    const data = { id: 'plano123', dto: { nome: 'Novo Nome' } };
    await controller.atualizarPlano(data);
    expect(service.atualizarPlano).toHaveBeenCalledWith('plano123', data.dto);
  });

  it('deve deletar um plano', async () => {
    await controller.deletarPlano('plano123');
    expect(service.deletarPlano).toHaveBeenCalledWith('plano123');
  });
});
