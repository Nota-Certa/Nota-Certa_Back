import { Injectable } from '@nestjs/common';

@Injectable()
export class PagamentoService {
  processarPagamento(data: any): string {
    console.log('processando pagamento:', data);
    return 'Pagamento realizado com sucesso!!!';
  }
}
