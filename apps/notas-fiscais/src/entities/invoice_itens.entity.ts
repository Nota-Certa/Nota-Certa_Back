import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Invoice } from './invoices.entity';

@Entity('invoice_itens')
export class InvoiceItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  invoice_id: string;

  @ManyToOne(() => Invoice)
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;

  @Column('text')
  descricao: string;

  @Column('integer')
  quantidade: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  valor_unitario: number;

  @Column({ type: 'jsonb' })
  impostos: any;
}
