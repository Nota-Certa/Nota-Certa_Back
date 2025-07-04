import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Empresa } from './empresas.entity';
import { RoleUsuarios } from './role.enum';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  empresa_id: string;

  @ManyToOne(() => Empresa)
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  @Column('varchar', { length: 255 })
  nome: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 255 })
  senha: string;

  @Column({
    type: 'enum',
    enum: RoleUsuarios,
    default: RoleUsuarios.FUNCIONARIO,
  })
  role: RoleUsuarios;

  @Column({
   type: 'boolean',
   default: true
  })
  ativo: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'criado_em' })
  criado_em: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'atualizado_em' })
  atualizado_em: Date;
}
