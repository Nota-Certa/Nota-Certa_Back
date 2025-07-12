import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { NotasFiscaisService } from './notas-fiscais.service';
import { NotaFiscal } from './entities/nota-fiscal.entity';
import { NotaFiscalItem } from './entities/nota-fiscal-itens.entity';
import { TipoPessoa } from './entities/tipo-pessoa.enum';
import { StatusNotaFiscal } from './enums/status.enum';
import { CreateNotaFiscalDto } from './dto/create-nota-fiscal.dto';
import { UpdateNotaFiscalDto } from './dto/update-nota-fiscal.dto';

type MockRepo<T extends import('typeorm').ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepo = <T extends import('typeorm').ObjectLiteral = any>(): MockRepo<T> => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

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

  describe('create', () => {
    it('deve criar nota e itens e retornar a nota completa', async () => {
      const dto: CreateNotaFiscalDto = {
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
        create_at: new Date(),
      } as NotaFiscal;;

      const itensCriados: NotaFiscalItem[] = dto.itens.map((i, idx) =>
        ({
          id: `item-${idx}`,
          nota_fiscal_id: notaSalva.id,
          descricao: i.descricao,
          quantidade: i.quantidade,
          valor_unitario: i.valor_unitario,
          impostos: exemploImpostos,
        })
      );

      const notaComItens = {
        ...notaSalva,
        itens: itensCriados,
        cliente: { id: notaSalva.empresa_id, nome_razao_social: dto.nome_razao_social },
      } as NotaFiscal;

      // Mocks
      notaRepo.create!.mockReturnValue({ ...dto, valor_total: 40 });
      notaRepo.save!.mockResolvedValue(notaSalva);

      let counter = 0;
      itemRepo.create!.mockImplementation((itemDto) => ({
        id: `item-${counter++}`,
        ...itemDto,
      } as NotaFiscalItem));
      itemRepo.save!.mockImplementation(async items => items);

      notaRepo.findOne!.mockResolvedValue(notaComItens);

      // Executing the service method
      const result = await service.create(dto as any);

      // Expects
      expect(notaRepo.create).toHaveBeenCalledWith({ ...dto, valor_total: 40 });
      expect(notaRepo.save).toHaveBeenCalledWith({
        ...dto,
        valor_total: 40,
      });
      expect(itemRepo.create).toHaveBeenNthCalledWith(1, {
        ...dto.itens[0],
        nota_fiscal_id: notaSalva.id,
      });
      expect(itemRepo.create).toHaveBeenNthCalledWith(2, {
        ...dto.itens[1],
        nota_fiscal_id: notaSalva.id,
      });
      expect(itemRepo.save).toHaveBeenCalledWith(itensCriados);
      expect(notaRepo.findOne).toHaveBeenCalledWith({
        where: { id: notaSalva.id },
        relations: ['cliente', 'itens'],
      });
      expect(result).toEqual(notaComItens);
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
    it('deve retornar todas as notas com cliente', async () => {
      const lista = [{ id: 'n1' }, { id: 'n2' }];
      notaRepo.find?.mockResolvedValue(lista as any);

      const result = await service.findAll();
      expect(notaRepo.find).toHaveBeenCalledWith({ relations: ['cliente'] });
      expect(result).toBe(lista);
    });

    it('deve retornar array vazio se não houver notas', async () => {
      notaRepo.find?.mockResolvedValue([]);
      const result = await service.findAll();
      expect(notaRepo.find).toHaveBeenCalledWith({ relations: ['cliente'] });
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('deve retornar nota existente', async () => {
      const nota = { id: 'n1' };
      notaRepo.findOne?.mockResolvedValue(nota as any);

      const result = await service.findOne('n1');
      expect(notaRepo.findOne).toHaveBeenCalledWith({
        where: { id: 'n1' },
        relations: ['cliente', 'itens'],
      });
      expect(result).toBe(nota);
    });

    it('deve lançar NotFoundException se não encontrar', async () => {
      notaRepo.findOne?.mockResolvedValue(null);
      await expect(service.findOne('nx')).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('update', () => {
    it('deve atualizar e retornar a nota com relations', async () => {
      const dto: UpdateNotaFiscalDto = {
        nome_razao_social: 'Nova Razão',
        status: StatusNotaFiscal.PAGA,
      };

      const updatedNota = {
        id: 'uuid-nota',
        empresa_id: 'uuid-empresa',
        documento: '12345678901',
        nome_razao_social: dto.nome_razao_social!,
        tipo_pessoa: TipoPessoa.FISICA,
        status: dto.status!,
        data_emissao: new Date('2025-06-10'),
        data_vencimento: new Date('2025-06-30'),
        valor_total: 100,
        xml_gerado: '<xml/>',
        create_at: new Date(),
        cliente: { id: 'e1', nome_razao_social: 'Nova Razão' },
        itens: [],
      } as NotaFiscal;

      // Mocks
      notaRepo.update!.mockResolvedValue({} as any);
      notaRepo.findOne!.mockResolvedValue(updatedNota);

      // Executing the service method
      const result = await service.update('n1', dto);

      // Expects
      expect(notaRepo.update).toHaveBeenCalledWith('n1', dto);
      expect(notaRepo.findOne).toHaveBeenCalledWith({
        where: { id: 'n1' },
        relations: ['cliente', 'itens'],
      });
      expect(result).toEqual(updatedNota);
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
});