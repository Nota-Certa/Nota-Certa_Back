import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  createUsuario(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.createUsuario(dto);
  }

  @Post('empresa')
  createEmpresa(@Body() dto: CreateEmpresaDto) {
    return this.usuarioService.createEmpresa(dto);
  }

  @Get('empresa')
  findAllEmpresas() {
    return this.usuarioService.findAllEmpresas();
  }

  @Get('empresa/:id')
  findOneEmpresa(@Param('id') id: string) {
    return this.usuarioService.findOneEmpresa(id);
  }

  @Patch('empresa/:id')
  updateEmpresa(@Param('id') id: string, @Body() dto: UpdateEmpresaDto) {
    return this.usuarioService.updateEmpresa(id, dto);
  }

  @Delete('empresa/:id')
  removeEmpresa(@Param('id') id: string) {
    return this.usuarioService.removeEmpresa(id);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }

}
