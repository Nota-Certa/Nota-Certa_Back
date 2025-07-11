import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('planos')
export class Plano {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  nome: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  valor_mensal: number;

  @Column('integer')
  limite_notas_mensal: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  valor_excedente: number;

  @Column('boolean')
  acesso_premium: boolean;

  @Column('integer')
  limite_usuarios: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'criado_em' })
  criado_em: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'atualizado_em' })
  atualizado_em: Date;
}
