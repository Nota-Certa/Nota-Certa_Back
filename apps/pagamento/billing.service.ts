import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingService {
  // CRUD de Assinaturas
  findAllAssinaturas() {
    return 'List of assinaturas';
  }
  findAssinaturaById(id: string) {
    return `Assinatura ${id}`;
  }
  createAssinatura(dto: any) {
    return 'Created assinatura';
  }
  updateAssinatura(id: string, dto: any) {
    return `Updated assinatura ${id}`;
  }
  deleteAssinatura(id: string) {
    return `Deleted assinatura ${id}`;
  }

  // CRUD de Planos
  findAllPlanos() {
    return 'List of planos';
  }
  findPlanoById(id: string) {
    return `Plano ${id}`;
  }
  createPlano(dto: any) {
    return 'Created plano';
  }
  updatePlano(id: string, dto: any) {
    return `Updated plano ${id}`;
  }
  deletePlano(id: string) {
    return `Deleted plano ${id}`;
  }
}
