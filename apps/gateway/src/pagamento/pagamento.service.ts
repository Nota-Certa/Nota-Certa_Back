// gateway/src/payment/payment.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAGAMENTO_SERVICE') private readonly client: ClientProxy,
  ) {}

  // Assinaturas
  buscarTodasAssinaturas() {
    return firstValueFrom(this.client.send('buscar_todas_assinaturas', {}));
  }

  buscarAssinaturaPorId(id: string) {
    return firstValueFrom(this.client.send('buscar_assinatura_por_id', id));
  }

  criarAssinatura(dto: CreateAssinaturaDto) {
    console.log('Gateway: Sending criar_assinatura message with:', dto); // logs de debug
    return firstValueFrom(this.client.send('criar_assinatura', dto)).catch(error => {
      console.error('Gateway: Error from microservice:', error);
      throw error;
    });
  }

  atualizarAssinatura(id: string, dto: UpdateAssinaturaDto) {
    return firstValueFrom(
      this.client.send('atualizar_assinatura', { id, dto }),
    );
  }

  deletarAssinatura(id: string) {
    return firstValueFrom(this.client.send('deletar_assinatura', id));
  }

  // Planos
  buscarTodosPlanos() {
    return firstValueFrom(this.client.send('buscar_todos_planos', {}));
  }

  buscarPlanoPorId(id: string) {
    return firstValueFrom(this.client.send('buscar_plano_por_id', id));
  }

  criarPlano(dto: CreatePlanoDto) {
    return firstValueFrom(this.client.send('criar_plano', dto));
  }

  atualizarPlano(id: string, dto: UpdatePlanoDto) {
    return firstValueFrom(this.client.send('atualizar_plano', { id, dto }));
  }

  deletarPlano(id: string) {
    return firstValueFrom(this.client.send('deletar_plano', id));
  }
}
