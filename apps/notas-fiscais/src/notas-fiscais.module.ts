import { Module } from '@nestjs/common';
import { NotasFiscaisController } from './notas-fiscais.controller';
import { NotasFiscaisService } from './notas-fiscais.service';

@Module({
  imports: [],
  controllers: [NotasFiscaisController],
  providers: [NotasFiscaisService],
})
export class NotasFiscaisModule {}
