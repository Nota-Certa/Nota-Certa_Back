import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('planos')
export class Plano {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
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
}
