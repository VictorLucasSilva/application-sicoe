import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AudAction } from './aud-action.entity';
import { AudObject } from './aud-object.entity';

@Entity('ssv_audit')
export class Audit {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'fk_action', type: 'int' })
  fkAction: number;

  @Column({ name: 'fk_object', type: 'int' })
  fkObject: number;

  @Column({ name: 'fk_user', type: 'int', nullable: true })
  fkUser: number; // ID do usuário que realizou a ação

  @Column({ name: 'tx_login', type: 'varchar', length: 256, nullable: true })
  txLogin: string; // Username do usuário

  @Column({ name: 'tx_profile', type: 'varchar', length: 20, nullable: true })
  txProfile: string; // Grupo/role do usuário

  @Column({ name: 'tx_description', type: 'text', nullable: true })
  txDescription: string; // Descrição detalhada da ação

  @Column({ name: 'tx_ip_address', type: 'varchar', length: 45, nullable: true })
  txIpAddress: string; // IP do usuário

  @Column({ name: 'tx_user_agent', type: 'text', nullable: true })
  txUserAgent: string; // Browser/Client info

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date; // Timestamp da ação

  // Relacionamentos
  @ManyToOne(() => AudAction, (action) => action.audits)
  @JoinColumn({ name: 'fk_action' })
  action: AudAction;

  @ManyToOne(() => AudObject, (object) => object.audits)
  @JoinColumn({ name: 'fk_object' })
  object: AudObject;
}
