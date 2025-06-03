import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('Notificacoes')
export class Notificacoes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  tipo: string;

  @Column('text')
  destinatario: string;

  @Column('text')
  conteudo: string;

  @Column('text')
  status_emvio: string;

  @Column('text')
  evento: string;

  @Column('uuid')
  invoice_id: string;

  @Column('uuid')
  cliente_id: string;

  @Column('uuid')
  empresa_id: string;

  @Column({ type: 'integer' })
  tentativa: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'atualizado_em' })
  create_at: Date;
}
