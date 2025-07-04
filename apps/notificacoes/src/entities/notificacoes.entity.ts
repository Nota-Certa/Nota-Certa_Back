import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusEnvio } from './status-envio.enum';

@Entity('notificacoes')
export class Notificacoes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  tipo: string;

  @Column('varchar', { length: 255 })
  destinatario: string;

  @Column('text')
  conteudo: string;

  @Column({
    type: 'enum',
    enum: StatusEnvio,
  })
  status_envio: StatusEnvio;

  @Column('text')
  evento: string;

  @Column('uuid')
  nota_fiscal_id: string;

  @Column('uuid')
  cliente_id: string;

  @Column('uuid')
  empresa_id: string;

  @Column({ type: 'integer' })
  tentativa: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'criado_em' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'atualizado_em' })
  updated_at: Date;
}
