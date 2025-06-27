import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Plano } from './planos.entity';

@Entity('assinaturas')
export class Assinatura {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  empresa_id: string;

  @Column('uuid')
  plano_id: string;

  @ManyToOne(() => Plano)
  @JoinColumn({ name: 'plano_id' })
  plano: Plano;

  @Column({ type: 'date' })
  inicio: Date;

  @Column({ type: 'date' })
  fim: Date;

  @Column('boolean')
  ativo: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'criado_em' })
  criado_em: Date;

  @UpdateDateColumn ({ type: 'timestamptz', name: 'atualizado_em' })
  atualizado_em: Date;
}
