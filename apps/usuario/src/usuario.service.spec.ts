import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

// Importando as classes e enums reais do projeto
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuarios.entity';
import { Empresa } from './entities/empresas.entity';
import { RoleUsuarios } from './entities/role.enum';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { describe } from 'node:test';

// --- Mocks baseados nas suas entidades reais ---

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
  empresa: mockEmpresa,
  atualizado_em: new Date() 
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
  empresa: mockEmpresa,
  atualizado_em: new Date() 
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


describe('UsuarioService', () => {
  let service: UsuarioService;
  let usuarioRepository: Repository<Usuario>;
  let empresaRepository: Repository<Empresa>;
  let dataSource: DataSource;

  // Mock genérico para os métodos do repositório
  const mockRepositoryFactory = () => ({
    create: jest.fn(entity => entity),
    save: jest.fn(entity => Promise.resolve({ ...entity, id: 'uuid-gerado-no-teste' })),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  let mockUsuarioRepository;
  let mockEmpresaRepository;

  const mockDataSource = {
    transaction: jest.fn().mockImplementation(async (callback) => {
      // Simula a transação, passando os repositórios mockados para o manager
      const mockManager = {
        getRepository: jest.fn((entity): any => {
          if (entity === Usuario) return mockUsuarioRepository;
          if (entity === Empresa) return mockEmpresaRepository;
        }),
      };
      return callback(mockManager);
    }),
  };

  beforeEach(async () => {
    mockUsuarioRepository = mockRepositoryFactory();
    mockEmpresaRepository = mockRepositoryFactory();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        { provide: getRepositoryToken(Usuario), useValue: mockUsuarioRepository },
        { provide: getRepositoryToken(Empresa), useValue: mockEmpresaRepository },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    usuarioRepository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
    empresaRepository = module.get<Repository<Empresa>>(getRepositoryToken(Empresa));
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {

    it('deve criar e salvar um novo usuário com sucesso', async () => {
      
      jest.spyOn(usuarioRepository, 'create').mockReturnValue(mockCreateUsuarioDto as any);

      jest.spyOn(usuarioRepository, 'save').mockResolvedValue(mockUsuarioSalvo);

      const result = await service.create(mockCreateUsuarioDto);

      expect(result).toEqual(mockUsuarioSalvo);
      expect(result.id).toBeDefined(); 

      expect(usuarioRepository.create).toHaveBeenCalledWith(mockCreateUsuarioDto);
      expect(usuarioRepository.save).toHaveBeenCalledWith(mockCreateUsuarioDto);
      expect(usuarioRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('deve retornar um usuário se ele for encontrado', async () => {
      mockUsuarioRepository.findOne.mockResolvedValue(mockUsuario);
      const result = await service.findOne(mockUsuario.id);
      expect(result).toEqual(mockUsuario);
      expect(mockUsuarioRepository.findOne).toHaveBeenCalledWith({ where: { id: mockUsuario.id } });
    });

    it('deve lançar NotFoundException se o usuário não for encontrado', async () => {
      mockUsuarioRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('id-invalido')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {

    it('deve retornar um array com todos os usuarios', async () => {
      
      jest.spyOn(usuarioRepository, 'find').mockResolvedValue(mockUsuariosArray);

      const result = await service.findAll();

      expect(result).toEqual(mockUsuariosArray);


      expect(result).toHaveLength(2); // O array tem o tamanho esperado?
      expect(result[0].nome).toBe('Usuário de Teste'); // O primeiro item está correto?
      
      expect(usuarioRepository.find).toHaveBeenCalledTimes(1);
    });

    it('deve retornar um array vazio se não houver usuarios no repositório', async () => {

      jest.spyOn(usuarioRepository, 'find').mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]); // O resultado é um array vazio?
      expect(result).toHaveLength(0); // O tamanho é zero?
      expect(usuarioRepository.find).toHaveBeenCalledTimes(1);
    });

  });

  describe('remove', () => {
    it('deve remover um usuário com sucesso', async () => {
      mockUsuarioRepository.delete.mockResolvedValue({ affected: 1 });
      await expect(service.remove(mockUsuario.id)).resolves.not.toThrow();
      expect(mockUsuarioRepository.delete).toHaveBeenCalledWith(mockUsuario.id);
    });

    it('deve lançar NotFoundException se o usuário a ser removido não existir', async () => {
      mockUsuarioRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove('id-invalido')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {

    it('deve atualizar um usuario com sucesso', async () => {

      jest.spyOn(usuarioRepository, 'update').mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(mockUsuarioAtualizado);

      const result = await service.update(mockUsuario.id, mockUpdateUsuarioDto);

      expect(result).toEqual(mockUsuarioAtualizado);
      expect(usuarioRepository.update).toHaveBeenCalledWith(mockUsuario.id, mockUpdateUsuarioDto);
      expect(usuarioRepository.findOne).toHaveBeenCalledWith({ where: { id: mockUsuario.id } });
    });
  });









  describe('createEmpresa', () => {
    it('deve criar uma empresa e um usuário admin com sucesso', async () => {
      // Arrange
      mockEmpresaRepository.findOne.mockResolvedValue(null);
      mockUsuarioRepository.findOne.mockResolvedValue(null);

      // Este mock agora funciona, pois o serviço irá capturar e retornar este valor.
      mockEmpresaRepository.save.mockResolvedValue({
        id: mockEmpresa.id, // O ID que esperamos
        nome_razao_social: mockCreateEmpresaDto.nome_razao_social,
        cnpj: mockCreateEmpresaDto.cnpj,
        created_at: new Date(),
      });
      
      // Act
      const result = await service.createEmpresa(mockCreateEmpresaDto);

      // Assert
      // ESTA ASSERÇÃO AGORA PASSA!
      expect(result.id).toEqual(mockEmpresa.id);

      // E a outra asserção continua válida e importante
      expect(mockUsuarioRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          empresa_id: mockEmpresa.id,
        })
      );
    });

    it('deve lançar ConflictException se o CNPJ já existir', async () => {
      // Arrange: Usamos spyOn para configurar o mock APENAS para este teste.
      jest.spyOn(empresaRepository, 'findOne').mockResolvedValue(mockEmpresa);

      // Act & Assert
      await expect(service.createEmpresa(mockCreateEmpresaDto)).rejects.toThrow(
        new ConflictException('CNPJ já cadastrado'),
      );

      // Verificamos se a função foi chamada como esperado
      expect(empresaRepository.findOne).toHaveBeenCalledWith({
        where: { cnpj: mockCreateEmpresaDto.cnpj },
      });
    });

    it('deve lançar ConflictException se o E-mail já existir', async () => {
      // Arrange: Configuramos os mocks especificamente para o cenário deste teste.
      // 1. O CNPJ não é encontrado.
      jest.spyOn(empresaRepository, 'findOne').mockResolvedValue(null);
      // 2. O E-mail é encontrado.
      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(mockUsuario);
      
      // Act & Assert
      await expect(service.createEmpresa(mockCreateEmpresaDto)).rejects.toThrow(
        new ConflictException('E-mail já cadastrado'),
      );

      // Verificamos se ambas as chamadas ocorreram como esperado
      expect(empresaRepository.findOne).toHaveBeenCalledWith({
        where: { cnpj: mockCreateEmpresaDto.cnpj },
      });
      expect(usuarioRepository.findOne).toHaveBeenCalledWith({
        where: { email: mockCreateEmpresaDto.usuario.email },
      });
    });
  });

  describe('findOneEmpresa', () => {
    it('deve retornar uma empresa se ela for encontrada', async () => {
      mockEmpresaRepository.findOne.mockResolvedValue(mockEmpresa);
      const result = await service.findOneEmpresa(mockEmpresa.id);
      expect(result).toEqual(mockEmpresa);
      expect(mockEmpresaRepository.findOne).toHaveBeenCalledWith({ where: { id: mockEmpresa.id } });
    });

    it('deve lançar NotFoundException se a empresa não for encontrada', async () => {
      mockEmpresaRepository.findOne.mockResolvedValue(null);
      await expect(service.findOneEmpresa('id-invalido')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAllEmpresa', () => {

    it('deve retornar um array com todas as empresas', async () => {
      
      jest.spyOn(empresaRepository, 'find').mockResolvedValue(mockEmpresasArray);

      const result = await service.findAllEmpresa();

      expect(result).toEqual(mockEmpresasArray);


      expect(result).toHaveLength(2); // O array tem o tamanho esperado?
      expect(result[0].nome_razao_social).toBe('Empresa de Teste SA'); // O primeiro item está correto?
      
      expect(empresaRepository.find).toHaveBeenCalledTimes(1);
    });

    it('deve retornar um array vazio se não houver empresas no repositório', async () => {

      jest.spyOn(empresaRepository, 'find').mockResolvedValue([]);

      const result = await service.findAllEmpresa();

      expect(result).toEqual([]); // O resultado é um array vazio?
      expect(result).toHaveLength(0); // O tamanho é zero?
      expect(empresaRepository.find).toHaveBeenCalledTimes(1);
    });

  });


  describe('updateEmpresa', () => {

    it('deve atualizar uma empresa com sucesso', async () => {

      jest.spyOn(empresaRepository, 'update').mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(empresaRepository, 'findOne').mockResolvedValue(mockEmpresaAtualizada);

      const result = await service.updateEmpresa(mockEmpresa.id, mockUpdateEmpresaDto);

      expect(result).toEqual(mockEmpresaAtualizada);
      expect(empresaRepository.update).toHaveBeenCalledWith(mockEmpresa.id, mockUpdateEmpresaDto);
      expect(empresaRepository.findOne).toHaveBeenCalledWith({ where: { id: mockEmpresa.id } });
    });
  });

  describe('removeEmpresa', () => {

    it('deve remover uma empresa com sucesso', async () => {
      
      jest.spyOn(empresaRepository, 'delete').mockResolvedValue({ affected: 1 } as any);

      await expect(service.removeEmpresa(mockEmpresa.id)).resolves.not.toThrow();

      expect(empresaRepository.delete).toHaveBeenCalledWith(mockEmpresa.id);
      expect(empresaRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('deve retornar NotFoundException caso nao haja empresa com id fornecida', async () => {
      
      jest.spyOn(empresaRepository, 'delete').mockResolvedValue({ affected: 0 } as any);

      await expect(service.removeEmpresa('id nada a ver')).rejects.toThrow(NotFoundException);

      expect(empresaRepository.delete).toHaveBeenCalledWith('id nada a ver');
      expect(empresaRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});