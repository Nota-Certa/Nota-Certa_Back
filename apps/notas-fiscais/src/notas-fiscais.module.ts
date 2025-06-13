import { Module } from '@nestjs/common';
import { NotasFiscaisController } from './notas-fiscais.controller';
import { NotasFiscaisService } from './notas-fiscais.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteFinal } from './entities/clientes_finais.entity';
import { Invoice } from './entities/invoices.entity';
import { InvoiceItem } from './entities/invoice_itens.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'notas_fiscais',
      entities: [ClienteFinal, Invoice, InvoiceItem],
      synchronize: true, // ⚠️ Apenas para dev (não usar em produção)
    }),
    TypeOrmModule.forFeature([ClienteFinal, Invoice, InvoiceItem]),
  ],
  controllers: [NotasFiscaisController],
  providers: [NotasFiscaisService],
})
export class NotasFiscaisModule {}
