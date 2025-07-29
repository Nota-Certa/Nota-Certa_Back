import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioMessageController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

import { Usuario } from './entities/usuarios.entity';
import { Empresa } from './entities/empresas.entity';
import { RoleUsuarios } from './entities/role.enum';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { describe } from 'node:test';


const mockEmpresa: Empresa = {
  id: 'b8d9b1a0-a1b2-c3d4-e5f6-a7b8c9d0e1f3',
  nome_razao_social: 'Empresa de Teste SA',
  cnpj: '12345678000199',
  criado_em: new Date(),
  atualizado_em: new Date(),
};

const mockEmpresa2: Empresa = {
  id: 'c7e8a1b9-d2c3-b4a5-f6e7-d8c9b0a1e2f3',
  nome_razao_social: 'Segunda Empresa de Teste',
  cnpj: '99887766000155',
  criado_em: new Date(),
  atualizado_em: new Date(),
};

const mockEmpresasArray = [mockEmpresa, mockEmpresa2];

const mockUsuario: Usuario = {
  id: 'a8d9b1a0-a1b2-c3d4-e5f6-a7b8c9d0e1f2',
  empresa_id: mockEmpresa.id,
  nome: 'Usuário de Teste',
  email: 'teste@exemplo.com',
  senha: 'hash_super_secreto',
  role: RoleUsuarios.FUNCIONARIO,
  ativo: true,
  criado_em: new Date(),
  atualizado_em: new Date(),
  empresa: mockEmpresa, 
};

const mockUsuario2: Usuario = {
  id: 'c7e8a1b9-d2c3-b4a5-f6e7-d8c9b0a1e2f3',
  empresa_id: mockEmpresa2.id,
  nome: 'Usuário de Teste 2',
  email: 'teste2@exemplo.com',
  senha: 'hash_super_secreto',
  role: RoleUsuarios.FUNCIONARIO,
  ativo: true,
  criado_em: new Date(),
  atualizado_em: new Date(),
  empresa: mockEmpresa, 
};

const mockUsuariosArray = [mockUsuario, mockUsuario2]

// Mock do DTO para create
const mockCreateUsuarioDto: CreateUsuarioDto = {
  nome: 'Novo Funcionário',
  email: 'novo.funcionario@empresa.com',
  senha: 'senha_super_secreta_hash',
  empresa_id: 'b8d9b1a0-a1b2-c3d4-e5f6-a7b8c9d0e1f3', // ID da nossa mockEmpresa
  role: RoleUsuarios.FUNCIONARIO,
};

// Objeto que simula o usuário COMO ELE SERÁ RETORNADO DO BANCO (com ID, etc)
const mockUsuarioSalvo: Usuario = {
  id: 'd9e8a7b6-c5d4-b3a2-f1e0-d9c8b7a6f5e4', // Um novo ID gerado pelo banco
  ativo: true,
  criado_em: new Date(),
  atualizado_em: new Date(),
  ...mockCreateUsuarioDto, // Inclui todos os campos do DTO
  empresa: mockEmpresa, // Relação pode ser omitida ou mockada
};

// Mock do DTO para criar uma empresa
const mockCreateEmpresaDto: CreateEmpresaDto = {
  nome_razao_social: 'Nova Empresa de Teste',
  cnpj: '98765432000198',
  usuario: {
    nome: 'Admin da Nova Empresa',
    email: 'admin.novo@empresa.com',
    senha: 'outra_senha_secreta',
    // Os campos abaixo são adicionados pelo serviço, não pelo DTO
    empresa_id: '',
    role: RoleUsuarios.FUNCIONARIO,
  },
};

// Para testar update
const mockUpdateUsuarioDto: UpdateUsuarioDto = {
  nome: 'Usuario de Teste (Atualizado)',
}

const mockUsuarioAtualizado: Usuario = {
  ...mockUsuario, // Campos do usuario original
  nome: 'Usuario de Teste (Atualizado)',
}

const mockUpdateEmpresaDto: UpdateEmpresaDto = {
  nome_razao_social: 'Empresa Teste SA (Atualizada)',
};

const mockEmpresaAtualizada: Empresa = {
  ...mockEmpresa, // Campos da empresa original...
  nome_razao_social: 'Empresa Teste SA (Atualizada)',
};

// Este é o nosso "dublê" para o UsuarioService
const mockUsuarioService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  createEmpresa: jest.fn(),
  findAllEmpresa: jest.fn(),
  findOneEmpresa: jest.fn(),
  updateEmpresa: jest.fn(),
  removeEmpresa: jest.fn(),
};

describe('UsuarioMessageController', () => {
  let controller: UsuarioMessageController;
  let service: UsuarioService; // Variável para acessar nosso mock

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioMessageController],
      providers: [
        {
          provide: UsuarioService,       // Quando alguém pedir o UsuarioService...
          useValue: mockUsuarioService,  // ...entregue nosso mock no lugar.
        },
      ],
    }).compile();

    controller = module.get<UsuarioMessageController>(UsuarioMessageController);
    service = module.get<UsuarioService>(UsuarioService); // Pegamos a instância do nosso mock
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('deve chamar o serviço findOne e retornar um usuário', async () => {
      
      const findOneSpy = jest.spyOn(service, 'findOne').mockResolvedValue(mockUsuario);

      const result = await controller.findOne(mockUsuario.id);

      expect(result).toEqual(mockUsuario);
      
      expect(findOneSpy).toHaveBeenCalledWith(mockUsuario.id);
    });
  });
  

  describe('findAll', () => {
    it('deve chamar o serviço findAll e retornar um array de usuários', async () => {
      
      const findAllSpy = jest.spyOn(service, 'findAll').mockResolvedValue(mockUsuariosArray);

      const result = await controller.findAll();

      expect(result[0].nome).toBe('Usuário de Teste');
      
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });
  });

  

  describe('create', () => {
    it('deve chamar o serviço createUsuario e retorna-lo', async () => {

      const createSpy = jest.spyOn(service, 'create').mockResolvedValue(mockUsuario);

      const result = await controller.createUsuario(mockCreateUsuarioDto);

      expect(result).toEqual(mockUsuario);

      expect(createSpy).toHaveBeenCalledWith(mockCreateUsuarioDto);
    });
  });

  describe('update', () => {
    it('deve chamar o serviço create e retornar o usuario', async () => {

      const updateSpy = jest.spyOn(service, 'update').mockResolvedValue(mockUsuarioAtualizado);

      const result = await controller.update({id: mockUsuario.id, dto: mockUpdateUsuarioDto});

      expect(result).toEqual(mockUsuarioAtualizado);

      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledWith(mockUsuario.id, mockUpdateUsuarioDto);
    });
  });

  describe('remove', () => {
    it('deve chamar o serviço remove e, bem, remover o usuario', async () => {

      const removeSpy = jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await expect(controller.remove(mockUsuario.id)).resolves.not.toThrow();

      expect(removeSpy).toHaveBeenCalledTimes(1);
      expect(removeSpy).toHaveBeenCalledWith(mockUsuario.id);
    });
  });

  describe('createEmpresa', () => {
    it('deve chamar o serviço createEmpresa e retornar a nova empresa', async () => {

      const createEmpresaSpy = jest.spyOn(service, 'createEmpresa').mockResolvedValue(mockEmpresa);

      const result = await controller.createEmpresa(mockCreateEmpresaDto as any);

      expect(result).toEqual(mockEmpresa);

      expect(createEmpresaSpy).toHaveBeenCalledWith(mockCreateEmpresaDto);
    });
  });

  describe('findAllEmpresa', () => {
    it('deve retornar um array com todas as empresas', async () => {

      const findAllEmpresaSpy = jest.spyOn(service, 'findAllEmpresa').mockResolvedValue(mockEmpresasArray);

      const result = await controller.findAllEmpresas();

      expect(result).toHaveLength(2);
      expect(result[0].nome_razao_social).toBe('Empresa de Teste SA')

      expect(findAllEmpresaSpy).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('findOneEmpresa', () => {
    it('deve retornar a empresa com o id fornecido', async () => {

      const findOneEmpresaSpy = jest.spyOn(service, 'findOneEmpresa').mockResolvedValue(mockEmpresa);

      const result = await controller.findOneEmpresa(mockEmpresa.id);

      expect(result.nome_razao_social).toBe('Empresa de Teste SA')
      expect(findOneEmpresaSpy).toHaveBeenCalledTimes(1);
      expect(findOneEmpresaSpy).toHaveBeenCalledWith(mockEmpresa.id);
    });
  });

  describe('updateEmpresa', () => {

    it('deve atualizar uma empresa com sucesso', async () => {

      const updateEmpresaSpy = jest.spyOn(service, 'updateEmpresa').mockResolvedValue(mockEmpresaAtualizada);

      const result = await controller.updateEmpresa({id: mockEmpresa.id, dto: mockUpdateEmpresaDto});

      expect(result).toEqual(mockEmpresaAtualizada);

      expect(updateEmpresaSpy).toHaveBeenCalledTimes(1);
      expect(updateEmpresaSpy).toHaveBeenCalledWith(mockEmpresa.id, mockUpdateEmpresaDto);
    });
  });

  describe('removeEmpresa', () => {
    it('deve chamar o serviço remove e, bem, remover a empresa', async () => {

      const removeSpy = jest.spyOn(service, 'removeEmpresa').mockResolvedValue(undefined);

      await expect(controller.removeEmpresa(mockEmpresa.id)).resolves.not.toThrow();

      expect(removeSpy).toHaveBeenCalledTimes(1);
      expect(removeSpy).toHaveBeenCalledWith(mockEmpresa.id);
    });
  });

});
