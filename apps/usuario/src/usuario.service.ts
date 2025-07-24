import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Usuario } from './entities/usuarios.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Empresa } from './entities/empresas.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { RoleUsuarios } from './entities/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Empresa)
    private empresaRepo: Repository<Empresa>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}
async create(dto: CreateUsuarioDto) {
  const empresa = await this.empresaRepo.findOne({
    where: { id: dto.empresa_id },
  });

  if (!empresa) {
    throw new NotFoundException('Empresa não encontrada');
  }

  const senhaHash = await bcrypt.hash(dto.senha, 10);

  const novoUsuario = this.usuarioRepository.create({
    ...dto,
    senha: senhaHash,
  });

  console.log('Senha a ser salva:', novoUsuario.senha);

  return this.usuarioRepository.save(novoUsuario);
}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const result = await this.usuarioRepository.update(id, updateUsuarioDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }

    const usuarioAtualizado = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuarioAtualizado) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
    return usuarioAtualizado;
  }

  async remove(id: string): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }


  async createEmpresa(createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    const { usuario, ...dadosEmpresa } = createEmpresaDto;

    return await this.dataSource.transaction(async manager => {

      const empresaRepo = manager.getRepository(Empresa);
      const usuarioRepo = manager.getRepository(Usuario);


      const cnpjExistente = await empresaRepo.findOne({ where: { cnpj: dadosEmpresa.cnpj } });
      if (cnpjExistente) {
        throw new ConflictException('CNPJ já cadastrado');
      }

      const emailExistente = await usuarioRepo.findOne({ where: { email: usuario.email } });
      if (emailExistente) {
        throw new ConflictException('E-mail já cadastrado');
      }

      const empresa = manager.getRepository(Empresa).create(dadosEmpresa);

      const empresaSalva = await manager.getRepository(Empresa).save(empresa);

      const senhaHash = await bcrypt.hash(usuario.senha, 10);

      const novoUsuario = manager.getRepository(Usuario).create({
        ...usuario,

        senha: senhaHash,
        empresa_id: empresaSalva.id, 
        role: RoleUsuarios.ADMIN,
      });
      await manager.getRepository(Usuario).save(novoUsuario);

      return empresaSalva;
    });
  }

  findAllEmpresa(): Promise<Empresa[]> {
    return this.empresaRepo.find();
  }

  async findOneEmpresa(id: string): Promise<Empresa> {
    const empresa = await this.empresaRepo.findOne({ where: { id } });
    if (!empresa) {
      throw new NotFoundException(`Empresa com id ${id} não encontrado`);
    }
    return empresa;
  }

  async updateEmpresa(id: string, updateEmpresaDto: UpdateEmpresaDto): Promise<Empresa> {
    const result = await this.empresaRepo.update(id, updateEmpresaDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Empresa com id ${id} não encontrado`);
    }

    const empresaAtualizada = await this.empresaRepo.findOne({ where: { id } });
    if (!empresaAtualizada) {
      throw new NotFoundException(`Empresa com id ${id} não encontrada`);
    }
    return empresaAtualizada;
  }

  async removeEmpresa(id: string): Promise<void> {
    const result = await this.empresaRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Empresa com id ${id} não encontrado`);
    }
  }

}
