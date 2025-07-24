import { Test, TestingModule } from '@nestjs/testing';
import { NotificacoesController } from './notificacoes.controller';
import { NotificacoesService } from './notificacoes.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';
import { StatusEnvio } from './entities/status-envio.enum';
import { NotFoundException } from '@nestjs/common';

describe('NotificacoesController', () => {
  let controller: NotificacoesController;
  let service: NotificacoesService;

  const mockNotificacao = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    tipo: 'EMAIL',
    destinatario: 'cliente@example.com',
    conteudo: 'Sua nota fiscal foi emitida com sucesso.',
    status_envio: StatusEnvio.ENVIADA,
    evento: 'NOTA_FISCAL_EMITIDA',
    nota_fiscal_id: '550e8400-e29b-41d4-a716-446655440001',
    cliente_id: '550e8400-e29b-41d4-a716-446655440002',
    empresa_id: '550e8400-e29b-41d4-a716-446655440003',
    tentativa: 1,
    created_at: new Date('2024-01-01T10:00:00Z'),
    updated_at: new Date('2024-01-01T10:00:00Z'),
  };

  const mockService = {
    criar: jest.fn(),
    buscarTodos: jest.fn(),
    buscarUm: jest.fn(),
    atualizar: jest.fn(),
    remover: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificacoesController],
      providers: [
        {
          provide: NotificacoesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<NotificacoesController>(NotificacoesController);
    service = module.get<NotificacoesService>(NotificacoesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('criar', () => {
    it('deve criar uma nova notificação', async () => {
      // Arrange
      const createDto: CreateNotificacaoDto = {
        tipo: 'EMAIL',
        destinatario: 'cliente@example.com',
        conteudo: 'Sua nota fiscal foi emitida com sucesso.',
        status_envio: StatusEnvio.PENDENTE,
        evento: 'NOTA_FISCAL_EMITIDA',
        nota_fiscal_id: '550e8400-e29b-41d4-a716-446655440001',
        cliente_id: '550e8400-e29b-41d4-a716-446655440002',
        empresa_id: '550e8400-e29b-41d4-a716-446655440003',
        tentativa: 1,
      };

      mockService.criar.mockResolvedValue(mockNotificacao);

      // Act
      const result = await controller.criar(createDto);

      // Assert
      expect(service.criar).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockNotificacao);
    });

    it('deve propagar erro do service', async () => {
      // Arrange
      const createDto: CreateNotificacaoDto = {
        tipo: 'EMAIL',
        destinatario: 'cliente@example.com',
        conteudo: 'Sua nota fiscal foi emitida com sucesso.',
        status_envio: StatusEnvio.PENDENTE,
        evento: 'NOTA_FISCAL_EMITIDA',
        nota_fiscal_id: '550e8400-e29b-41d4-a716-446655440001',
        cliente_id: '550e8400-e29b-41d4-a716-446655440002',
        empresa_id: '550e8400-e29b-41d4-a716-446655440003',
        tentativa: 1,
      };

      const errorMessage = 'Database error';
      mockService.criar.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(controller.criar(createDto)).rejects.toThrow(errorMessage);
      expect(service.criar).toHaveBeenCalledWith(createDto);
    });
  });

  describe('buscarTodos', () => {
    it('deve retornar todas as notificações', async () => {
      // Arrange
      const notificacoes = [mockNotificacao, { ...mockNotificacao, id: 'outro-id' }];
      mockService.buscarTodos.mockResolvedValue(notificacoes);

      // Act
      const result = await controller.buscarTodos();

      // Assert
      expect(service.buscarTodos).toHaveBeenCalled();
      expect(result).toEqual(notificacoes);
    });

    it('deve retornar array vazio quando não há notificações', async () => {
      // Arrange
      mockService.buscarTodos.mockResolvedValue([]);

      // Act
      const result = await controller.buscarTodos();

      // Assert
      expect(service.buscarTodos).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('deve propagar erro do service', async () => {
      // Arrange
      const errorMessage = 'Database error';
      mockService.buscarTodos.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(controller.buscarTodos()).rejects.toThrow(errorMessage);
      expect(service.buscarTodos).toHaveBeenCalled();
    });
  });

  describe('buscarUm', () => {
    it('deve retornar uma notificação específica', async () => {
      // Arrange
      const id = mockNotificacao.id;
      mockService.buscarUm.mockResolvedValue(mockNotificacao);

      // Act
      const result = await controller.buscarUm(id);

      // Assert
      expect(service.buscarUm).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockNotificacao);
    });

    it('deve propagar NotFoundException do service', async () => {
      // Arrange
      const id = 'id-inexistente';
      mockService.buscarUm.mockRejectedValue(new NotFoundException('Notificação não encontrada'));

      // Act & Assert
      await expect(controller.buscarUm(id)).rejects.toThrow(NotFoundException);
      expect(service.buscarUm).toHaveBeenCalledWith(id);
    });
  });

  describe('atualizar', () => {
    it('deve atualizar uma notificação', async () => {
      // Arrange
      const id = mockNotificacao.id;
      const updateDto: UpdateNotificacaoDto = {
        status_envio: StatusEnvio.ENVIADA,
        tentativa: 2,
      };
      const notificacaoAtualizada = { ...mockNotificacao, ...updateDto };
      const payload = { id, dto: updateDto };

      mockService.atualizar.mockResolvedValue(notificacaoAtualizada);

      // Act
      const result = await controller.atualizar(payload);

      // Assert
      expect(service.atualizar).toHaveBeenCalledWith(id, updateDto);
      expect(result).toEqual(notificacaoAtualizada);
    });

    it('deve propagar NotFoundException do service', async () => {
      // Arrange
      const id = 'id-inexistente';
      const updateDto: UpdateNotificacaoDto = { status_envio: StatusEnvio.ENVIADA };
      const payload = { id, dto: updateDto };

      mockService.atualizar.mockRejectedValue(new NotFoundException('Notificação não encontrada'));

      // Act & Assert
      await expect(controller.atualizar(payload)).rejects.toThrow(NotFoundException);
      expect(service.atualizar).toHaveBeenCalledWith(id, updateDto);
    });

    it('deve lidar com payload vazio', async () => {
      // Arrange
      const id = mockNotificacao.id;
      const updateDto: UpdateNotificacaoDto = {};
      const payload = { id, dto: updateDto };

      mockService.atualizar.mockResolvedValue(mockNotificacao);

      // Act
      const result = await controller.atualizar(payload);

      // Assert
      expect(service.atualizar).toHaveBeenCalledWith(id, updateDto);
      expect(result).toEqual(mockNotificacao);
    });
  });

  describe('remover', () => {
    it('deve remover uma notificação', async () => {
      // Arrange
      const id = mockNotificacao.id;
      const resultadoRemocao = { deletado: true };
      mockService.remover.mockResolvedValue(resultadoRemocao);

      // Act
      const result = await controller.remover(id);

      // Assert
      expect(service.remover).toHaveBeenCalledWith(id);
      expect(result).toEqual(resultadoRemocao);
    });

    it('deve propagar NotFoundException do service', async () => {
      // Arrange
      const id = 'id-inexistente';
      mockService.remover.mockRejectedValue(new NotFoundException('Notificação não encontrada'));

      // Act & Assert
      await expect(controller.remover(id)).rejects.toThrow(NotFoundException);
      expect(service.remover).toHaveBeenCalledWith(id);
    });
  });

  describe('microservices integration', () => {
    it('deve ser compatível com MessagePattern decorators', () => {
      // Arrange & Act
      const createMethod = controller.criar;
      const buscarTodosMethod = controller.buscarTodos;
      const buscarUmMethod = controller.buscarUm;
      const atualizarMethod = controller.atualizar;
      const removerMethod = controller.remover;

      // Assert
      expect(typeof createMethod).toBe('function');
      expect(typeof buscarTodosMethod).toBe('function');
      expect(typeof buscarUmMethod).toBe('function');
      expect(typeof atualizarMethod).toBe('function');
      expect(typeof removerMethod).toBe('function');
    });
  });
});
