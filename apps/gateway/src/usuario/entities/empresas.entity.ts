import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  nome_razao_social: string;

  @Column({ type: 'varchar', length: 14 })
  cnpj: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'criado_em' })
  criado_em: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'atualizado_em' })
  atualizado_em: Date;
}
