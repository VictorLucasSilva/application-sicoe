import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Audit } from './audit.entity';

@Entity('ssv_aud_object')
export class AudObject {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nm_object', type: 'varchar', length: 50, unique: true })
  nmObject: string; 

  @CreateDateColumn({ name: 'ts_creation', type: 'timestamp' })
  tsCreation: Date;

  @UpdateDateColumn({ name: 'ts_updated', type: 'timestamp' })
  tsUpdated: Date;

  
  @OneToMany(() => Audit, (audit) => audit.object)
  audits: Audit[];
}
