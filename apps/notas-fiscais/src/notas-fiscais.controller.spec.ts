import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { NotasFiscaisController } from './notas-fiscais.controller';
import { NotasFiscaisService } from './notas-fiscais.service';
import { CreateNotaFiscalDto } from './dto/create-nota-fiscal.dto';
import { UpdateNotaFiscalDto } from './dto/update-nota-fiscal.dto';
import { ExportNotaFiscalFormat } from './enums/export-nota-fiscal-format.enum';

describe('NotasFiscaisController', () => {
  let controller: NotasFiscaisController;
  let service: Partial<Record<keyof NotasFiscaisService, jest.Mock>>;

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      getNotasPorPeriodo: jest.fn(),
      getRankingClientesPorPeriodo: jest.fn(),
      getXmlGerado: jest.fn(),
      gerarXmlESalvar: jest.fn(),
      exportNotaFiscal: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotasFiscaisController],
      providers: [{ provide: NotasFiscaisService, useValue: service }],
    }).compile();

    controller = module.get(NotasFiscaisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve chamar service.create e retornar o resultado', async () => {
      const dto = {} as CreateNotaFiscalDto;
      const mockResult = { id: 'n1' };
      service.create!.mockResolvedValue(mockResult);

      await expect(controller.create(dto)).resolves.toEqual(mockResult);
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('deve lançar BadRequestException se o dto for inválido', async () => {
      const dto = {} as CreateNotaFiscalDto;
      service.create!.mockRejectedValue(new BadRequestException('Dados inválidos'));
      await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as notas fiscais', async () => {
      const notas = [{ id: 'n1', itens: [] }];
      service.findAll!.mockResolvedValue(notas);
      await expect(controller.findAll()).resolves.toEqual(notas);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('deve retornar uma lista vazia se não houver notas', async () => {
      service.findAll!.mockResolvedValue([]);
      await expect(controller.findAll()).resolves.toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve retornar a nota fiscal encontrada', async () => {
      const nota = { id: 'n1', itens: [] };
      service.findOne!.mockResolvedValue(nota);
      await expect(controller.findOne('n1')).resolves.toEqual(nota);
      expect(service.findOne).toHaveBeenCalledWith('n1');
    });

    it('deve lançar NotFoundException se a nota não for encontrada', async () => {
      service.findOne!.mockRejectedValue(new NotFoundException('Nota não encontrada'));
      await expect(controller.findOne('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('deve chamar service.update com o id e dto corretos', async () => {
      const dto = {} as UpdateNotaFiscalDto;
      const updatedNota = { id: 'n1', ...dto };
      service.update!.mockResolvedValue(updatedNota);

      await expect(controller.update('n1', dto)).resolves.toEqual(updatedNota);
      expect(service.update).toHaveBeenCalledWith('n1', dto);
    });

    it('deve lançar NotFoundException se a nota não for encontrada', async () => {
      service.update!.mockRejectedValue(new NotFoundException('Nota não encontrada'));
      await expect(controller.update('invalid-id', {} as UpdateNotaFiscalDto)).rejects.toThrow(NotFoundException);
    });

    it('deve lançar BadRequestException se o dto for inválido', async () => {
      const dto = {} as UpdateNotaFiscalDto;
      service.update!.mockRejectedValue(new BadRequestException('Dados inválidos'));
      await expect(controller.update('n1', dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('deve chamar service.remove com o id do payload', async () => {
      service.remove!.mockResolvedValue({ deleted: true });
      await expect(controller.remove('r1')).resolves.toEqual({ deleted: true });
      expect(service.remove).toHaveBeenCalledWith('r1');
    });

    it('deve lançar NotFoundException se a nota não existir', async () => {
      service.remove!.mockRejectedValue(new NotFoundException('Nota não encontrada'));
      await expect(controller.remove('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getNotasPorPeriodo', () => {
    it('deve chamar o service com o ano atual se nenhum for fornecido', async () => {
      const currentYear = new Date().getFullYear();
      await controller.getNotasPorPeriodo(undefined, undefined);
      expect(service.getNotasPorPeriodo).toHaveBeenCalledWith(undefined, currentYear);
    });

    it('deve chamar o service com o mês e ano fornecidos', async () => {
      await controller.getNotasPorPeriodo(6, 2025);
      expect(service.getNotasPorPeriodo).toHaveBeenCalledWith(6, 2025);
    });

    it('deve lançar BadRequestException se o mês for fornecido sem o ano', () => {
      expect(() => controller.getNotasPorPeriodo(6, undefined)).toThrow(BadRequestException);
    });

    it('deve lançar BadRequestException se o mês for inválido', () => {
      expect(() => controller.getNotasPorPeriodo(13, 2025)).toThrow(BadRequestException);
    });
  });

  describe('getRankingClientes', () => {
    it('deve chamar o service com valores padrão para ano e top', async () => {
      const currentYear = new Date().getFullYear();
      await controller.getRankingClientes(undefined, undefined, undefined);
      expect(service.getRankingClientesPorPeriodo).toHaveBeenCalledWith(undefined, currentYear, 10);
    });

    it('deve lançar BadRequestException se top for inválido', () => {
      expect(() => controller.getRankingClientes(undefined, 2025, 101)).toThrow(BadRequestException);
    });
  });

  describe('downloadXml', () => {
    it('deve chamar service.getXmlGerado', async () => {
      service.getXmlGerado!.mockResolvedValue('<xml>');
      await expect(controller.downloadXml('n1')).resolves.toBe('<xml>');
      expect(service.getXmlGerado).toHaveBeenCalledWith('n1');
    });
  });

  describe('exportNotaFiscal', () => {
    it('deve chamar service.exportNotaFiscal e retornar um Buffer para XML', async () => {
      service.exportNotaFiscal!.mockResolvedValue('<xml>');
      const result = await controller.exportNotaFiscal('n1', 'XML');
      expect(service.exportNotaFiscal).toHaveBeenCalledWith('n1', ExportNotaFiscalFormat.XML);
      expect(result).toBeInstanceOf(Buffer);
    });

    it('deve chamar service.exportNotaFiscal e retornar um Buffer para PDF', async () => {
      const pdfBuffer = Buffer.from('pdf content');
      service.exportNotaFiscal!.mockResolvedValue(pdfBuffer);
      const result = await controller.exportNotaFiscal('n1', 'PDF');
      expect(service.exportNotaFiscal).toHaveBeenCalledWith('n1', ExportNotaFiscalFormat.PDF);
      expect(result).toBe(pdfBuffer);
    });

    it('deve lançar BadRequestException para um formato não suportado', async () => {
      await expect(controller.exportNotaFiscal('n1', 'INVALIDO')).rejects.toBeInstanceOf(BadRequestException);
    });
  });
});
