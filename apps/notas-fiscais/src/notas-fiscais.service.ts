import { Injectable } from '@nestjs/common';

@Injectable()
export class NotasFiscaisService {
  getHello(): string {
    return 'Hello World!';
  }
}
