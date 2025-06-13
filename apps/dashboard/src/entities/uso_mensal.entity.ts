import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('uso_mensal')
export class UsoMensal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  empresa_id: string;

  @Column({ type: 'character varying', length: 7 })
  mes_ano: string;

  @Column({ type: 'integer' })
  quantidade_notas: number;

  @Column({ type: 'integer' })
  quantidade_excedente: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'atualizado_em' })
  atualizado_em: Date;
}
