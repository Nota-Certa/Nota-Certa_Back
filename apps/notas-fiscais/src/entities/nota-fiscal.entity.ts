import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { StatusNotaFiscal } from './status.enum';
import { TipoPessoa } from './tipo-pessoa.enum';

@Entity('notas_fiscais')
export class NotaFiscal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  empresa_id: string;

  // CPF (11) ou CNPJ (14) — no banco varchar(14)
  @Column({ type: 'character varying', length: 14 })
  documento: string;

  @Column('varchar', { length: 255 })
  nome_razao_social: string;

  // F (Física) ou J (Jurídica)
  @Column({
    type: 'enum',
    enum: TipoPessoa,
  })
  tipo_pessoa: TipoPessoa;

  @Column({
    type: 'enum',
    enum: StatusNotaFiscal,
    default: StatusNotaFiscal.PENDENTE,
  })
  status: StatusNotaFiscal;

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
