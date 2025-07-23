import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoService } from './pagamento.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Assinatura } from './entities/assinaturas.entity';
import { Plano } from './entities/planos.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('PagamentoService', () => {
  let service: PagamentoService;

  const assinaturaRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const planoRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagamentoService,
        { provide: getRepositoryToken(Assinatura), useValue: assinaturaRepo },
        { provide: getRepositoryToken(Plano), useValue: planoRepo },
      ],
    }).compile();

    service = module.get<PagamentoService>(PagamentoService);
  });

  it('deve retornar todas as assinaturas', async () => {
    assinaturaRepo.find.mockResolvedValue([{ id: '1' }]);
    const result = await service.buscarTodasAssinaturas();
    expect(result).toEqual([{ id: '1' }]);
  });

  it('deve lançar erro ao buscar assinatura inexistente', async () => {
    assinaturaRepo.findOne.mockResolvedValue(null);
    await expect(service.buscarAssinaturaPorId('invalido')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('deve criar uma assinatura válida', async () => {
    const dto = {
      plano_id: '1',
      empresa_id: '123',
      inicio: '2025-01-01',
      fim: '2025-12-01',
    };
    planoRepo.findOne.mockResolvedValue({ id: '1' });
    assinaturaRepo.create.mockReturnValue(dto);
    assinaturaRepo.save.mockResolvedValue({ ...dto, id: '99' });

    const result = await service.criarAssinatura(dto as any);
    expect(result).toHaveProperty('id');
  });

  it('deve lançar erro se o plano não existe ao criar assinatura', async () => {
    planoRepo.findOne.mockResolvedValue(null);
    const dto = {
      plano_id: '999',
      empresa_id: 'abc',
      inicio: '2025-01-01',
      fim: '2025-12-01',
    };

    await expect(service.criarAssinatura(dto as any)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('deve deletar assinatura existente', async () => {
    assinaturaRepo.delete.mockResolvedValue({ affected: 1 });
    const result = await service.deletarAssinatura('123');
    expect(result).toEqual({ deletado: true });
  });

  it('deve lançar erro ao deletar assinatura inexistente', async () => {
    assinaturaRepo.delete.mockResolvedValue({ affected: 0 });
    await expect(service.deletarAssinatura('inexistente')).rejects.toThrow(
      NotFoundException,
    );
  });
});
