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
  fkUser: number; 

  @Column({ name: 'tx_login', type: 'varchar', length: 256, nullable: true })
  txLogin: string; 

  @Column({ name: 'tx_profile', type: 'varchar', length: 20, nullable: true })
  txProfile: string; 

  @Column({ name: 'tx_description', type: 'text', nullable: true })
  txDescription: string; 

  @Column({ name: 'tx_ip_address', type: 'varchar', length: 45, nullable: true })
  txIpAddress: string; 

  @Column({ name: 'tx_user_agent', type: 'text', nullable: true })
  txUserAgent: string; 

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date; 

  
  @ManyToOne(() => AudAction, (action) => action.audits)
  @JoinColumn({ name: 'fk_action' })
  action: AudAction;

  @ManyToOne(() => AudObject, (object) => object.audits)
  @JoinColumn({ name: 'fk_object' })
  object: AudObject;
}
