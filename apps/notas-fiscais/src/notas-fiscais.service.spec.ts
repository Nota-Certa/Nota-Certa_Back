import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Between, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { NotasFiscaisService } from './notas-fiscais.service';
import { NotaFiscal } from './entities/nota-fiscal.entity';
import { NotaFiscalItem } from './entities/nota-fiscal-itens.entity';
import { TipoPessoa } from './entities/tipo-pessoa.enum';
import { StatusNotaFiscal } from './enums/status.enum';
import { CreateNotaFiscalDto } from './dto/create-nota-fiscal.dto';
import { UpdateNotaFiscalDto } from './dto/update-nota-fiscal.dto';
import { RankingCliente } from './interfaces/ranking-cliente';
import { ExportNotaFiscalFormat } from './enums/export-nota-fiscal-format.enum';

type MockRepo<T extends import('typeorm').ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepo = <T extends import('typeorm').ObjectLiteral = any>(): MockRepo<T> => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn(),
});

const notaFiscalMock = {
  id: '093f8b2c-1234-5678-90abcdef1234',
  empresa_id: '32asd-1234-5678-90abcdef1234',
  tipo_pessoa: TipoPessoa.FISICA,
  documento: '12345678901',
  nome_razao_social: 'Empresa X',
  data_emissao: new Date('2025-06-10T00:00:00.000Z'),
  data_vencimento: new Date('2025-06-30T00:00:00.000Z'),
  itens: [
    { descricao: 'Item A', quantidade: 1, valor_unitario: 5, impostos: {} },
  ],
  xml_gerado: '<xml/>',
  status: StatusNotaFiscal.PENDENTE,
  valor_total: 5,
  created_at: new Date(),
  updated_at: new Date(),
}

const exemploImpostos = { ICMS: 0, IPI: 0 };

describe('NotasFiscaisService', () => {
  let service: NotasFiscaisService;
  let notaRepo: MockRepo<NotaFiscal>;
  let itemRepo: MockRepo<NotaFiscalItem>;

  beforeEach(async () => {
    notaRepo = createMockRepo<NotaFiscal>();
    itemRepo = createMockRepo<NotaFiscalItem>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotasFiscaisService,
        { provide: getRepositoryToken(NotaFiscal), useValue: notaRepo },
        { provide: getRepositoryToken(NotaFiscalItem), useValue: itemRepo },
      ],
    }).compile();

    service = module.get<NotasFiscaisService>(NotasFiscaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar nota e itens e retornar a nota completa', async () => {
      const dto: CreateNotaFiscalDto = {
        empresa_id: '32asd-1234-5678-90abcdef1234',
        tipo_pessoa: TipoPessoa.FISICA,
        documento: '12345678901',
        nome_razao_social: 'Empresa Teste',
        status: StatusNotaFiscal.PENDENTE,
        data_emissao: '2025-06-10T00:00:00.000Z',
        data_vencimento: '2025-06-30T00:00:00.000Z',
        itens: [
          { descricao: 'Item A', quantidade: 2, valor_unitario: 10, impostos: exemploImpostos },
          { descricao: 'Item B', quantidade: 1, valor_unitario: 20, impostos: exemploImpostos },
        ],
      };

      const notaSalva = {
        id: 'uuid-nota',
        empresa_id: 'uuid-empresa',
        documento: dto.documento,
        nome_razao_social: dto.nome_razao_social,
        tipo_pessoa: dto.tipo_pessoa,
        status: dto.status,
        data_emissao: new Date(dto.data_emissao),
        data_vencimento: new Date(dto.data_vencimento),
        valor_total: 40,
        xml_gerado: '<xml/>',
        created_at: new Date(),
        updated_at: new Date(),
        itens: [],
      } as NotaFiscal;

      const notaCompletaComItens = { ...notaSalva, itens: [{ id: 'item-1', nota_fiscal_id: 'uuid-nota' }]};

      // Mocks
      notaRepo.create!.mockReturnValue(notaSalva);
      notaRepo.save!.mockResolvedValue(notaSalva);
      itemRepo.create!.mockReturnValue({ id: 'item-1' });
      itemRepo.save!.mockResolvedValue([]);

      const findOneSpy = jest.spyOn(service, 'findOne').mockResolvedValue(notaCompletaComItens as any);

      const result = await service.create(dto);

      expect(notaRepo.create).toHaveBeenCalledWith(expect.objectContaining({
        ...dto,
        valor_total: 40,
      }));
      expect(notaRepo.save).toHaveBeenCalledWith(notaSalva);
      expect(itemRepo.create).toHaveBeenCalled();
      expect(itemRepo.save).toHaveBeenCalled();
      expect(findOneSpy).toHaveBeenCalledWith('uuid-nota');
      expect(result).toEqual(notaCompletaComItens);
    });

    it('deve falhar se o documento não for um CPF ou CNPJ de tamanho válido', async () => {
      const obj = {
        tipo_pessoa: TipoPessoa.FISICA,
        documento: '123456789', // CPF inválido (9 dígitos)
        nome_razao_social: 'Empresa Teste',
        data_emissao: '2025-06-10T00:00:00.000Z',
        data_vencimento: '2025-06-30T00:00:00.000Z',
        itens: [
          { descricao: 'Item A', quantidade: 2, valor_unitario: 10, impostos: exemploImpostos },
        ],
      };
      const dto = plainToInstance(CreateNotaFiscalDto, obj);
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      const documentoError = errors.find(e => e.property === 'documento');
      expect(documentoError).toBeDefined();
      expect(documentoError!.constraints).toHaveProperty('isLength');
    });

    it('deve falhar se faltar nome_razao_social', async () => {
      const obj = {
        tipo_pessoa: 'F',
        documento: '12345678901',
        // nome_razao_social está ausente
        data_emissao: '2025-06-10T00:00:00.000Z',
        data_vencimento: '2025-06-30T00:00:00.000Z',
        itens: [
          { descricao: 'Item A', quantidade: 2, valor_unitario: 10, impostos: {} },
        ],
      };

      const dto = plainToInstance(CreateNotaFiscalDto, obj);
      const errors = await validate(dto);

      expect(errors.length).toBeGreaterThan(0);
      const nomeError = errors.find(e => e.property === 'nome_razao_social');
      expect(nomeError).toBeDefined();
      expect(nomeError && nomeError.constraints).toHaveProperty('isNotEmpty');
    });

    it('deve falhar se itens for array vazio', async () => {
      const obj = {
        tipo_pessoa: 'F',
        documento: '12345678901',
        nome_razao_social: 'Teste',
        data_emissao: '2025-06-10T00:00:00.000Z',
        data_vencimento: '2025-06-30T00:00:00.000Z',
        itens: [],
      };
      const dto = plainToInstance(CreateNotaFiscalDto, obj);
      const errors = await validate(dto);

      const itensError = errors.find(e => e.property === 'itens');
      expect(itensError).toBeDefined();
      expect(itensError && itensError.constraints).toHaveProperty('arrayMinSize');
    });

    it('deve retornar excessão se o create falhar ao savar no banco', async () => {
      const dto: CreateNotaFiscalDto = {
        empresa_id: '32asd-1234-5678-90abcdef1234',
        tipo_pessoa: TipoPessoa.FISICA,
        documento: '12345678901',
        nome_razao_social: 'Empresa X',
        data_emissao: '2025-06-10T00:00:00.000Z',
        data_vencimento: '2025-06-30T00:00:00.000Z',
        itens: [
          { descricao: 'Item A', quantidade: 1, valor_unitario: 5, impostos: {} },
        ],
      };

      notaRepo.create!.mockReturnValue({ ...dto, valor_total: 5 });
      notaRepo.save!.mockRejectedValue(new Error('DB failure'));

      await expect(service.create(dto))
        .rejects
        .toThrow('DB failure');

      expect(notaRepo.create).toHaveBeenCalledWith({ ...dto, valor_total: 5 });
      expect(notaRepo.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as notas com os itens', async () => {
      const lista = [notaFiscalMock];
      notaRepo.find!.mockResolvedValue(lista as NotaFiscal[]);

      await service.findAll();

      expect(notaRepo.find).toHaveBeenCalledWith({ relations: ['itens'] });
    });

    it('deve retornar array vazio se não houver notas', async () => {
      notaRepo.find?.mockResolvedValue([]);
      const result = await service.findAll();
      expect(notaRepo.find).toHaveBeenCalledWith({ relations: ['itens'] });
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('deve retornar nota existente', async () => {
      notaRepo.findOne?.mockResolvedValue(notaFiscalMock as NotaFiscal);

      const result = await service.findOne(notaFiscalMock.id);
      expect(notaRepo.findOne).toHaveBeenCalledWith({
        where: { id: notaFiscalMock.id },
        relations: ['itens'],
      });
      expect(result).toBe(notaFiscalMock);
    });

    it('deve lançar NotFoundException se não encontrar', async () => {
      notaRepo.findOne?.mockResolvedValue(null);
      await expect(service.findOne('nx')).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('update', () => {
    it('deve buscar a nota, atualizar e retornar a nota com relations', async () => {
      const dto: UpdateNotaFiscalDto = { status: StatusNotaFiscal.PAGA };
      const notaAtualizada = { ...notaFiscalMock, status: StatusNotaFiscal.PAGA };

      // Mock para as chamadas de findOne
      const findOneSpy = jest.spyOn(service, 'findOne')
        .mockResolvedValueOnce(notaFiscalMock as NotaFiscal)
        .mockResolvedValueOnce(notaAtualizada as NotaFiscal);

      notaRepo.update!.mockResolvedValue({ affected: 1 } as any);

      const result = await service.update(notaFiscalMock.id, dto);

      expect(findOneSpy).toHaveBeenCalledTimes(2);
      expect(notaRepo.update).toHaveBeenCalledWith(notaFiscalMock.id, dto);
      expect(result).toEqual(notaAtualizada);
    });

    it('deve lançar NotFoundException quando o id não existir', async () => {
      notaRepo.update!.mockResolvedValue({} as any);
      notaRepo.findOne!.mockResolvedValue(null);

      await expect(service.update('nao-existe', {} as any))
        .rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('remove', () => {
    it('deve deletar nota existente', async () => {
      notaRepo.delete?.mockResolvedValue({ affected: 1 } as any);
      const result = await service.remove('n1');
      expect(notaRepo.delete).toHaveBeenCalledWith('n1');
      expect(result).toEqual({ deleted: true });
    });

    it('deve lançar NotFoundException quando não afetar nada', async () => {
      notaRepo.delete?.mockResolvedValue({ affected: 0 } as any);
      await expect(service.remove('nx')).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('getNotasPorPeriodo', () => {
    it('deve chamar find com Between para um mês e ano específicos', async () => {
      notaRepo.find!.mockResolvedValue([notaFiscalMock] as NotaFiscal[]);

      await service.getNotasPorPeriodo(6, 2025);

      expect(notaRepo.find).toHaveBeenCalledWith({
        where: {
          data_emissao: Between(
            expect.any(Date),
            expect.any(Date),
          ),
        },
        relations: ['itens'],
      });
    });

    it('deve chamar find com Between para um ano inteiro se o mês não for fornecido', async () => {
      notaRepo.find!.mockResolvedValue([notaFiscalMock]);

      await service.getNotasPorPeriodo(undefined, 2025);

      expect(notaRepo.find).toHaveBeenCalledWith({
        where: {
          data_emissao: Between(
            expect.any(Date),
            expect.any(Date),
          )
        },
        relations: ['itens'],
      });
    });

    it('deve lançar NotFoundException se nenhuma nota for encontrada', async () => {
      notaRepo.find!.mockResolvedValue([]);
      await expect(service.getNotasPorPeriodo(6, 2025)).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('getRankingClientesPorPeriodo', () => {
    const mockRanking: RankingCliente[] = [
      { documento: '123', nome_razao_social: 'Cliente A', qtd: 10 },
    ];

    const mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      addGroupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue(mockRanking),
    };

    it('deve retornar o ranking de clientes', async () => {
      notaRepo.createQueryBuilder!.mockReturnValue(mockQueryBuilder as any);

      const result = await service.getRankingClientesPorPeriodo(undefined, 2025, 5);

      expect(notaRepo.createQueryBuilder).toHaveBeenCalledWith('nf');
      expect(mockQueryBuilder.limit).toHaveBeenCalledWith(5);
      expect(mockQueryBuilder.getRawMany).toHaveBeenCalled();
      expect(result).toEqual(mockRanking);
    });

    it('deve chamar o query builder com as datas corretas para um mês específico', async () => {
      notaRepo.createQueryBuilder!.mockReturnValue(mockQueryBuilder as any);

      await service.getRankingClientesPorPeriodo(6, 2025, 5);

      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'nf.data_emissao BETWEEN :inicio AND :fim',
        {
          inicio: new Date(Date.UTC(2025, 5, 1, 0, 0, 0)),
          fim: new Date(Date.UTC(2025, 6, 0, 23, 59, 59)),
        }
      );
    });
  });

  describe('exportNotaFiscal', () => {
    beforeEach(() => {
      jest.spyOn(service, 'exportAsPDF').mockImplementation(() => Buffer.from('pdf'));
      jest.spyOn(service, 'exportAsXML').mockImplementation(() => '<xml>');
    });

    it('deve chamar exportAsPDF para o formato PDF', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne').mockResolvedValue({} as any);

      await service.exportNotaFiscal('n1', ExportNotaFiscalFormat.PDF);

      expect(findOneSpy).toHaveBeenCalledWith('n1');
      expect(service.exportAsPDF).toHaveBeenCalled();
    });

    it('deve chamar exportAsXML para o formato XML', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne').mockResolvedValue({} as any);

      await service.exportNotaFiscal('n1', ExportNotaFiscalFormat.XML);

      expect(findOneSpy).toHaveBeenCalledWith('n1');
      expect(service.exportAsXML).toHaveBeenCalled();
    });

    it('deve lançar BadRequestException para um formato inválido', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(notaFiscalMock as NotaFiscal);

      await expect(service.exportNotaFiscal('n1', 'INVALIDO' as any))
        .rejects.toBeInstanceOf(BadRequestException);
    });
  });
});