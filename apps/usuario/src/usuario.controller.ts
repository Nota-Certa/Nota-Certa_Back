import { Controller, Get } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller()
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  getHello(): string {
    return this.usuarioService.getHello();
  }
}
