import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('clientes_finais')
export class ClienteFinal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  empresas_id: string;

  @Column({ type: 'character', length: 1 })
  tipo_pessoa: string;

  @Column({ type: 'character varying', length: 14 })
  documento: string;

  @Column('text')
  nome_razao_social: string;

  @Column('text')
  email: string;

  @Column('text')
  telefone: string;

  @Column({ type: 'json' })
  endereco: any;

  @CreateDateColumn({ type: 'timestamptz', name: 'create_at' })
  create_at: Date;
}
