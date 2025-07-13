import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { NotasFiscaisController } from './notas-fiscais.controller';
import { NotasFiscaisService } from './notas-fiscais.service';
import { CreateNotaFiscalDto } from './dto/create-nota-fiscal.dto';
import { UpdateNotaFiscalDto } from './dto/update-nota-fiscal.dto';
import { TipoPessoa } from './entities/tipo-pessoa.enum';
import { StatusNotaFiscal } from './enums/status.enum';

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
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotasFiscaisController],
      providers: [
        { provide: NotasFiscaisService, useValue: service },
      ],
    }).compile();

    controller = module.get(NotasFiscaisController);
  });

  describe('create', () => {
    it('deve chamar service.create e retornar o resultado', async () => {
      const dto: CreateNotaFiscalDto = {
        tipo_pessoa: TipoPessoa.FISICA,
        documento: '12345678901',
        nome_razao_social: 'Empresa X',
        status: StatusNotaFiscal.PENDENTE,
        data_emissao: '2025-06-01T00:00:00.000Z',
        data_vencimento: '2025-06-30T00:00:00.000Z',
        itens: [
          { descricao: 'A', quantidade: 1, valor_unitario: 10, impostos: {} },
        ],
      };
      const mockResult = { id: 'n1', ...dto, valor_total: 10 };
      service.create!.mockResolvedValue(mockResult);

      await expect(controller.create(dto)).resolves.toEqual(mockResult);
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('deve propagar erro do service.create', async () => {
      const dto = {} as CreateNotaFiscalDto;
      service.create!.mockRejectedValue(new Error('fail'));
      await expect(controller.create(dto)).rejects.toThrow('fail');
    });
  });

  describe('findAll', () => {
    it('deve chamar service.findAll e retornar lista', async () => {
      const lista = [{ id: 'n1' }, { id: 'n2' }];
      service.findAll!.mockResolvedValue(lista);
      await expect(controller.findAll()).resolves.toBe(lista);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve chamar service.findOne com id correto', async () => {
      const nota = { id: 'abc' };
      service.findOne!.mockResolvedValue(nota);
      await expect(controller.findOne('abc')).resolves.toBe(nota);
      expect(service.findOne).toHaveBeenCalledWith('abc');
    });

    it('deve propagar NotFoundException', async () => {
      service.findOne!.mockRejectedValue(new NotFoundException());
      await expect(controller.findOne('xyz')).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('update', () => {
    it('deve chamar service.update e devolver o retorno', async () => {
      const dto: UpdateNotaFiscalDto = { nome_razao_social: 'Nova' };
      const updated = { id: 'u1', nome_razao_social: 'Nova' };
      service.update!.mockResolvedValue(updated);

      await expect(controller.update('u1', dto)).resolves.toEqual(updated);
      expect(service.update).toHaveBeenCalledWith('u1', dto);
    });

    it('deve propagar erro do service.update', async () => {
      service.update!.mockRejectedValue(new Error('update error'));
      await expect(controller.update('u1', {} as any)).rejects.toThrow('update error');
    });
  });

  describe('remove', () => {
    it('deve chamar service.remove e devolver {deleted:true}', async () => {
      service.remove!.mockResolvedValue({ deleted: true });
      await expect(controller.remove('r1')).resolves.toEqual({ deleted: true });
      expect(service.remove).toHaveBeenCalledWith('r1');
    });

    it('deve propagar NotFoundException de service.remove', async () => {
      service.remove!.mockRejectedValue(new NotFoundException());
      await expect(controller.remove('r1')).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
