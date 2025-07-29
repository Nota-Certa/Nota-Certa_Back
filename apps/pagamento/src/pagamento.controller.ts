import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PagamentoService } from './pagamento.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';

@Controller()
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  // Assinaturas
  @MessagePattern('buscar_todas_assinaturas')
  buscarTodasAssinaturas() {
    return this.pagamentoService.buscarTodasAssinaturas();
  }

  @MessagePattern('buscar_assinatura_por_id')
  buscarAssinaturaPorId(id: string) {
    return this.pagamentoService.buscarAssinaturaPorId(id);
  }

  @MessagePattern('criar_assinatura')
  criarAssinatura(dto: CreateAssinaturaDto) {
    console.log('Received criar_assinatura message:', dto); // logs de debug
    try {
      return this.pagamentoService.criarAssinatura(dto);
    } catch (error) {
      console.error('Error in criarAssinatura:', error);
      throw error;
    }
  }

  @MessagePattern('atualizar_assinatura')
  atualizarAssinatura(data: { id: string; dto: UpdateAssinaturaDto }) {
    return this.pagamentoService.atualizarAssinatura(data.id, data.dto);
  }

  @MessagePattern('deletar_assinatura')
  deletarAssinatura(id: string) {
    return this.pagamentoService.deletarAssinatura(id);
  }

  // Planos
  @MessagePattern('buscar_todos_planos')
  buscarTodosPlanos() {
    return this.pagamentoService.buscarTodosPlanos();
  }

  @MessagePattern('buscar_plano_por_id')
  buscarPlanoPorId(id: string) {
    return this.pagamentoService.buscarPlanoPorId(id);
  }

  @MessagePattern('criar_plano')
  criarPlano(dto: CreatePlanoDto) {
    return this.pagamentoService.criarPlano(dto);
  }

  @MessagePattern('atualizar_plano')
  atualizarPlano(data: { id: string; dto: UpdatePlanoDto }) {
    return this.pagamentoService.atualizarPlano(data.id, data.dto);
  }

  @MessagePattern('deletar_plano')
  deletarPlano(id: string) {
    return this.pagamentoService.deletarPlano(id);
  }
}
