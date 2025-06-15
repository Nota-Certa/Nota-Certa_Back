import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Empresa } from './empresas.entity';
import { IsEnum } from 'class-validator';
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

  @Column('text')
  nome: string;

  @Column('text')
  email: string;

  @Column('text')
  senha_hash: string;

  @Column({
      type: 'enum',
      enum: RoleUsuarios,
      default: RoleUsuarios.FUNCIONARIO,
    })
  role: RoleUsuarios;

  @Column('boolean')
  ativo: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  created_at: Date;
}
