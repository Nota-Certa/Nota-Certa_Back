import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ClienteFinal } from './clientes_finais.entity';

@Entity('notas_fiscais')
export class NotaFiscal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  empresa_id: string;

  @Column('uuid')
  cliente_id: string;

  @ManyToOne(() => ClienteFinal)
  @JoinColumn({ name: 'cliente_id' })
  cliente: ClienteFinal;

  @Column('text')
  status: string;

  @Column({ type: 'timestamp without time zone' })
  data_emissao: Date;

  @Column({ type: 'timestamp without time zone' })
  data_vencimento: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  valor_total: number;

  @Column('text')
  xml_gerado: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'create_at' })
  create_at: Date;
}
