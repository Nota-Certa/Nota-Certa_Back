import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { NotificacoesService } from './notificacoes.service';
import { Notificacoes } from './entities/notificacoes.entity';
import { StatusEnvio } from './entities/status-envio.enum';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';

type MockRepo<T extends import('typeorm').ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepo = <T extends import('typeorm').ObjectLiteral = any>(): MockRepo<T> => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('NotificacoesService', () => {
  let service: NotificacoesService;
  let repo: MockRepo<Notificacoes>;

  const mockNotificacao: Partial<Notificacoes> = {
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

  const createNotificacaoDto: CreateNotificacaoDto = {
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

  beforeEach(async () => {
    repo = createMockRepo<Notificacoes>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificacoesService,
        { provide: getRepositoryToken(Notificacoes), useValue: repo },
      ],
    }).compile();

    service = module.get<NotificacoesService>(NotificacoesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('criar', () => {
    it('deve criar uma nova notificação com sucesso', async () => {
      // Arrange
      const notificacao = { ...mockNotificacao };
      repo.create!.mockReturnValue(notificacao);
      repo.save!.mockResolvedValue(notificacao);

      // Act
      const result = await service.criar(createNotificacaoDto);

      // Assert
      expect(repo.create).toHaveBeenCalledWith(createNotificacaoDto);
      expect(repo.save).toHaveBeenCalledWith(notificacao);
      expect(result).toEqual(notificacao);
    });

    it('deve validar os dados do DTO antes de criar a notificação', async () => {
      // Arrange
      const dto = plainToInstance(CreateNotificacaoDto, createNotificacaoDto);

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors).toHaveLength(0);
    });

    it('deve falhar ao validar DTO com dados inválidos', async () => {
      // Arrange
      const invalidDto = plainToInstance(CreateNotificacaoDto, {
        tipo: '', // string vazia
        destinatario: 'email-invalido', // email inválido
        conteudo: '',
        status_envio: 'STATUS_INVALIDO', // enum inválido
        evento: '',
        nota_fiscal_id: 'uuid-invalido', // UUID inválido
        cliente_id: 'uuid-invalido',
        empresa_id: 'uuid-invalido',
        tentativa: 'não-é-numero', // não é número
      });

      // Act
      const errors = await validate(invalidDto);

      // Assert
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('buscarTodos', () => {
    it('deve retornar todas as notificações', async () => {
      // Arrange
      const notificacoes = [mockNotificacao, { ...mockNotificacao, id: 'outro-id' }];
      repo.find!.mockResolvedValue(notificacoes);

      // Act
      const result = await service.buscarTodos();

      // Assert
      expect(repo.find).toHaveBeenCalled();
      expect(result).toEqual(notificacoes);
    });

    it('deve retornar array vazio quando não há notificações', async () => {
      // Arrange
      repo.find!.mockResolvedValue([]);

      // Act
      const result = await service.buscarTodos();

      // Assert
      expect(repo.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('buscarUm', () => {
    it('deve retornar uma notificação específica', async () => {
      // Arrange
      const id = mockNotificacao.id!;
      repo.findOne!.mockResolvedValue(mockNotificacao);

      // Act
      const result = await service.buscarUm(id);

      // Assert
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(mockNotificacao);
    });

    it('deve lançar NotFoundException quando notificação não existe', async () => {
      // Arrange
      const id = 'id-inexistente';
      repo.findOne!.mockResolvedValue(null);

      // Act & Assert
      await expect(service.buscarUm(id)).rejects.toThrow(NotFoundException);
      await expect(service.buscarUm(id)).rejects.toThrow('Notificação não encontrada');
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('atualizar', () => {
    const updateDto: UpdateNotificacaoDto = {
      status_envio: StatusEnvio.ENVIADA,
      tentativa: 2,
    };

    it('deve atualizar uma notificação existente', async () => {
      // Arrange
      const id = mockNotificacao.id!;
      const notificacaoAtualizada = { ...mockNotificacao, ...updateDto };
      
      repo.findOne!.mockResolvedValue(mockNotificacao);
      repo.save!.mockResolvedValue(notificacaoAtualizada);

      // Act
      const result = await service.atualizar(id, updateDto);

      // Assert
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(repo.save).toHaveBeenCalledWith({
        ...mockNotificacao,
        ...updateDto,
      });
      expect(result).toEqual(notificacaoAtualizada);
    });

    it('deve lançar NotFoundException quando notificação não existe', async () => {
      // Arrange
      const id = 'id-inexistente';
      repo.findOne!.mockResolvedValue(null);

      // Act & Assert
      await expect(service.atualizar(id, updateDto)).rejects.toThrow(NotFoundException);
      await expect(service.atualizar(id, updateDto)).rejects.toThrow('Notificação não encontrada');
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(repo.save).not.toHaveBeenCalled();
    });

    it('deve validar dados do UpdateDto', async () => {
      // Arrange
      const dto = plainToInstance(UpdateNotificacaoDto, updateDto);

      // Act
      const errors = await validate(dto);

      // Assert
      expect(errors).toHaveLength(0);
    });
  });

  describe('remover', () => {
    it('deve remover uma notificação existente', async () => {
      // Arrange
      const id = mockNotificacao.id!;
      repo.delete!.mockResolvedValue({ affected: 1 });

      // Act
      const result = await service.remover(id);

      // Assert
      expect(repo.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual({ deletado: true });
    });

    it('deve lançar NotFoundException quando notificação não existe', async () => {
      // Arrange
      const id = 'id-inexistente';
      repo.delete!.mockResolvedValue({ affected: 0 });

      // Act & Assert
      await expect(service.remover(id)).rejects.toThrow(NotFoundException);
      await expect(service.remover(id)).rejects.toThrow('Notificação não encontrada');
      expect(repo.delete).toHaveBeenCalledWith(id);
    });

    it('deve lançar NotFoundException quando delete não afeta nenhuma linha', async () => {
      // Arrange
      const id = mockNotificacao.id!;
      repo.delete!.mockResolvedValue({ affected: undefined });

      // Act & Assert
      await expect(service.remover(id)).rejects.toThrow(NotFoundException);
      expect(repo.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('edge cases', () => {
    it('deve lidar com erro de banco de dados no método criar', async () => {
      // Arrange
      const errorMessage = 'Database connection error';
      repo.create!.mockReturnValue(mockNotificacao);
      repo.save!.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(service.criar(createNotificacaoDto)).rejects.toThrow(errorMessage);
      expect(repo.create).toHaveBeenCalledWith(createNotificacaoDto);
      expect(repo.save).toHaveBeenCalled();
    });

    it('deve lidar com erro de banco de dados no método buscarTodos', async () => {
      // Arrange
      const errorMessage = 'Database connection error';
      repo.find!.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(service.buscarTodos()).rejects.toThrow(errorMessage);
      expect(repo.find).toHaveBeenCalled();
    });

    it('deve lidar com erro de banco de dados no método buscarUm', async () => {
      // Arrange
      const id = mockNotificacao.id!;
      const errorMessage = 'Database connection error';
      repo.findOne!.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(service.buscarUm(id)).rejects.toThrow(errorMessage);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('status transitions', () => {
    it('deve permitir transição de PENDENTE para ENVIADA', async () => {
      // Arrange
      const id = mockNotificacao.id!;
      const notificacaoPendente = { ...mockNotificacao, status_envio: StatusEnvio.PENDENTE };
      const updateDto: UpdateNotificacaoDto = { status_envio: StatusEnvio.ENVIADA };
      const notificacaoEnviada = { ...notificacaoPendente, status_envio: StatusEnvio.ENVIADA };

      repo.findOne!.mockResolvedValue(notificacaoPendente);
      repo.save!.mockResolvedValue(notificacaoEnviada);

      // Act
      const result = await service.atualizar(id, updateDto);

      // Assert
      expect(result.status_envio).toBe(StatusEnvio.ENVIADA);
    });

    it('deve permitir transição de PENDENTE para CANCELADA', async () => {
      // Arrange
      const id = mockNotificacao.id!;
      const notificacaoPendente = { ...mockNotificacao, status_envio: StatusEnvio.PENDENTE };
      const updateDto: UpdateNotificacaoDto = { status_envio: StatusEnvio.CANCELADA };
      const notificacaoCancelada = { ...notificacaoPendente, status_envio: StatusEnvio.CANCELADA };

      repo.findOne!.mockResolvedValue(notificacaoPendente);
      repo.save!.mockResolvedValue(notificacaoCancelada);

      // Act
      const result = await service.atualizar(id, updateDto);

      // Assert
      expect(result.status_envio).toBe(StatusEnvio.CANCELADA);
    });

    it('deve incrementar tentativas corretamente', async () => {
      // Arrange
      const id = mockNotificacao.id!;
      const updateDto: UpdateNotificacaoDto = { tentativa: 3 };
      const notificacaoComTentativas = { ...mockNotificacao, tentativa: 3 };

      repo.findOne!.mockResolvedValue(mockNotificacao);
      repo.save!.mockResolvedValue(notificacaoComTentativas);

      // Act
      const result = await service.atualizar(id, updateDto);

      // Assert
      expect(result.tentativa).toBe(3);
    });
  });
});
