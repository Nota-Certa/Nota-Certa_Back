import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('planos')
export class Plano {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  nome: string;

  @Column('numeric', { precision: 10, scale: 2 })
  valor_mensal: string;

  @Column('integer')
  limite_notas_mensal: number;

  @Column('numeric', { precision: 10, scale: 2 })
  valor_excedente: string;

  @Column('boolean')
  acesso_premium: boolean;
}
