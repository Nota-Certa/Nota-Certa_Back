import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificacoesService {
  getHello(): string {
    return 'Hello World!';
  }
}
