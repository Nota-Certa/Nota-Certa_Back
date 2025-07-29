import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUsuarioDto } from './dto/response-usuario.dto';
import { ResponseEmpresaDto } from './dto/response-empresa.dto';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.', type: ResponseUsuarioDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 409, description: 'Usuário já existe.' })
  @ApiBody({ type: CreateUsuarioDto })
  createUsuario(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.createUsuario(dto);
  }

  @Post('empresa')
  @ApiTags('Empresas')
  @ApiOperation({ summary: 'Cria uma nova empresa' })
  @ApiResponse({ status: 201, description: 'Empresa criada com sucesso.', type: ResponseEmpresaDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 409, description: 'Empresa já existe.' })
  @ApiBody({ type: CreateEmpresaDto })
  createEmpresa(@Body() dto: CreateEmpresaDto) {
    return this.usuarioService.createEmpresa(dto);
  }

  @Get('empresa')
  @ApiTags('Empresas')
  @ApiOperation({ summary: 'Lista todas as empresas' })
  @ApiResponse({ status: 200, description: 'Lista de empresas retornada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Nenhuma empresa encontrada.' })
  findAllEmpresas() {
    return this.usuarioService.findAllEmpresas();
  }

  @Get('empresa/:id')
  @ApiTags('Empresas')
  @ApiOperation({ summary: 'Busca uma empresa pelo ID' })
  @ApiResponse({ status: 200, description: 'Empresa encontrada com sucesso.' })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada.' })
  findOneEmpresa(@Param('id') id: string) {
    return this.usuarioService.findOneEmpresa(id);
  }

  @Patch('empresa/:id')
  @ApiTags('Empresas')
  @ApiOperation({ summary: 'Atualiza uma empresa pelo ID' })
  @ApiResponse({ status: 200, description: 'Empresa atualizada com sucesso.', type: ResponseEmpresaDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada.' })
  @ApiBody({ type: UpdateEmpresaDto })
  updateEmpresa(@Param('id') id: string, @Body() dto: UpdateEmpresaDto) {
    return this.usuarioService.updateEmpresa(id, dto);
  }

  @Delete('empresa/:id')
  @ApiTags('Empresas')
  @ApiOperation({ summary: 'Remove uma empresa pelo ID' })
  @ApiResponse({ status: 200, description: 'Empresa removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada.' })
  removeEmpresa(@Param('id') id: string) {
    return this.usuarioService.removeEmpresa(id);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Nenhum usuário encontrado.' })
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso.' })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um usuário pelo ID' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.', type: ResponseUsuarioDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiBody({ type: UpdateUsuarioDto })
  update(@Param('id') id: string, @Body() dto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um usuário pelo ID' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }

}
