import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('assinaturas')
export class Assinatura {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  empresa_id: string;

  @Column('uuid')
  plano_id: string;

  @Column('date')
  inicio: string;

  @Column('date', { nullable: true })
  fim: string;

  @Column('boolean')
  ativo: boolean;

  @Column('timestamptz')
  criado_em: Date;
}
