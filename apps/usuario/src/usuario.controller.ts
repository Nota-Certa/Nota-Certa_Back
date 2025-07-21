import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import * as bcrypt from 'bcrypt';

@Controller()
export class UsuarioMessageController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @MessagePattern('usuario.create')
  createUsuario(@Payload() dto: CreateUsuarioDto) {
    return this.usuarioService.create(dto);
  }

  @MessagePattern('empresa.create')
  createEmpresa(@Payload() dto: CreateEmpresaDto) {
    return this.usuarioService.createEmpresa(dto);
  }

  @MessagePattern('empresa.find-all')
  findAllEmpresas() {
    return this.usuarioService.findAllEmpresa();
  }

  @MessagePattern('empresa.find-one')
  findOneEmpresa(@Payload() id: string) {
    return this.usuarioService.findOneEmpresa(id);
  }

  @MessagePattern('empresa.update')
  updateEmpresa(@Payload() data: {id: string; dto: UpdateEmpresaDto}) {
    return this.usuarioService.updateEmpresa(data.id, data.dto);
  }

  @MessagePattern('empresa.remove')
  removeEmpresa(@Payload() id: string) {
    return this.usuarioService.removeEmpresa(id);
  }

  @MessagePattern('usuario.find-all')
  findAll() {
    return this.usuarioService.findAll();
  }

  @MessagePattern('usuario.find-one')
  findOne(@Payload() id: string) {
    return this.usuarioService.findOne(id);
  }

  @MessagePattern("usuario.update")
  update(@Payload() data: {id: string; dto: UpdateUsuarioDto}) {
    return this.usuarioService.update(data.id, data.dto);
  }

  @MessagePattern('usuario.remove')
  remove(@Payload() id: string) {
    return this.usuarioService.remove(id);
  }

  @MessagePattern('user.validate')
  async validarUsuario(@Payload() data: { email: string; senha: string }) {
  const user = await this.usuarioService.findByEmail(data.email);
  const senhaCorreta = await bcrypt.compare(data.senha, user?.senha);

  if (!user || !senhaCorreta) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
  };
}


}
