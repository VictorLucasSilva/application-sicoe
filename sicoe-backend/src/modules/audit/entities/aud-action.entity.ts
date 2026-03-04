import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Audit } from './audit.entity';

@Entity('ssv_aud_action')
export class AudAction {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nm_action', type: 'varchar', length: 50, unique: true })
  nmAction: string; 

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;

  
  @OneToMany(() => Audit, (audit) => audit.action)
  audits: Audit[];
}
