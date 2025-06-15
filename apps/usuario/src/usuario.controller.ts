import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
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
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }

  @Post('empresa')
  createEmpresa(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.usuarioService.createEmpresa(createEmpresaDto);
  }

  @Get('empresa')
  findAllEmpresas() {
    return this.usuarioService.findAllEmpresa();
  }

  @Get('empresa/:id')
  findOneEmpresa(@Param('id') id: string) {
    return this.usuarioService.findOneEmpresa(id);
  }

  @Patch('empresa/:id')
  updateEmpresa(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.usuarioService.updateEmpresa(id, updateEmpresaDto);
  }

  @Delete('empresa/:id')
  removeEmpresa(@Param('id') id: string) {
    return this.usuarioService.removeEmpresa(id);
  }

}
