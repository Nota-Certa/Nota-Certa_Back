import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { NotaFiscal } from './nota_fiscal.entity';

@Entity('nota_fiscal_itens')
export class NotaFiscalItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  nota_fiscal_id: string;

  @ManyToOne(() => NotaFiscal)
  @JoinColumn({ name: 'nota_fiscal_id' })
  nota_fiscal: NotaFiscal;

  @Column('text')
  descricao: string;

  @Column('integer')
  quantidade: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  valor_unitario: number;

  @Column({ type: 'jsonb' })
  impostos: any;
}
