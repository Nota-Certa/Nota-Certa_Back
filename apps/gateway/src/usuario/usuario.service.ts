import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_SERVICE') private client: ClientProxy) {}

  async createUsuario(dto: CreateUsuarioDto) {
    return firstValueFrom(this.client.send('usuario.create', dto));
  }

  async createEmpresa(dto: CreateEmpresaDto) {
    return firstValueFrom(this.client.send('empresa.create', dto));
  }

  async findAllEmpresas() {
    return firstValueFrom(this.client.send('empresa.find-all', {}));
  }

  async findOneEmpresa(id: string) {
    return firstValueFrom(this.client.send('empresa.find-one', id));
  }

  async updateEmpresa(id: string, dto: UpdateEmpresaDto) {
    return firstValueFrom(this.client.send('empresa.update', { id, dto }));
  }

  async removeEmpresa(id: string) {
    return firstValueFrom(this.client.send('empresa.remove', id));
  }

  async findAll() {
    return firstValueFrom(this.client.send('usuario.find-all', {}));
  }

  async findOne(id: string) {
    return firstValueFrom(this.client.send('usuario.find-one', id));
  }

  async update(id: string, dto: UpdateUsuarioDto) {
    return firstValueFrom(this.client.send('usuario.update', { id, dto }));
  }

  async remove(id: string) {
    return firstValueFrom(this.client.send('usuario.remove', id));
  }

}
